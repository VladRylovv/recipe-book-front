import React, { useMemo, useState } from "react"
import { useLoginUserMutation } from "../../store/auth/auth.api"
import { useAppDispatch } from "../../helpers/hooks/useAppDispatch"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import * as Yup from "yup"
import { Button, Input, Text } from "../../components/UI"
import { initUser } from "../../store/auth/auth.slice"
import { addNotification } from "../../helpers/addNotification"
import styles from "./LoginPage.module.scss"

const LoginPage: React.FC = () => {
  const [submitBtnClicked, setSubmitBtnClicked] = useState(false)
  const [errorNotFound, setErrorNotFound] = useState(false)
  const [errorIncorrectPass, setErrorIncorrectPass] = useState(false)

  useSetTitle("Login")

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required("Required field"),
      password: Yup.string().required("Required field"),
    }),
    validateOnChange: submitBtnClicked,
    validateOnBlur: false,
    onSubmit: () => {
      handleLogin()
    },
  })

  const navigate = useNavigate()

  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useAppDispatch()

  const errors = useMemo(() => {
    return {
      login: errorNotFound ? "User not found" : formik.errors.login,
      password: errorIncorrectPass
        ? "Incorrect password"
        : formik.errors.password,
    }
  }, [formik.errors, errorNotFound, errorIncorrectPass])

  const handleLogin = () => {
    loginUser({
      login: formik.values.login,
      password: formik.values.password,
    })
      .unwrap()
      .then((res) => {
        dispatch(initUser(res.user))
        navigate("/")
      })
      .catch((err) => {
        console.error(err)

        if (err.status === 404) {
          setErrorIncorrectPass(false)
          setErrorNotFound(true)
          return
        }
        if (err.status === 400) {
          setErrorNotFound(false)
          setErrorIncorrectPass(true)
          return
        }

        addNotification("error", "Error login, please try later")
      })
  }

  return (
    <div className={styles.login_page_wrap}>
      <div className={styles.login_image}></div>
      <div className={styles.login_form_wrap}>
        <div className={styles.login_form}>
          <Text className={styles.login_form_title} size={24}>
            Login
          </Text>
          <form>
            <Input
              name={"login"}
              className={styles.login_form_input}
              placeholder={"Your login"}
              value={formik.values.login}
              error={errors.login}
              onChange={(_, e) => {
                formik.handleChange(e)
                setErrorNotFound(false)
              }}
            />
            <Input
              name={"password"}
              type={"password"}
              className={styles.login_form_input}
              placeholder={"Your password"}
              value={formik.values.password}
              error={errors.password}
              onChange={(_, e) => {
                formik.handleChange(e)
                setErrorIncorrectPass(false)
              }}
            />
            <Button
              label={"Login"}
              loading={isLoading}
              onClick={() => {
                setSubmitBtnClicked(true)
                formik.handleSubmit()
              }}
            />
            <Text className={styles.login_text_sign_up}>
              Already have an account?{" "}
              <Text
                component={"span"}
                className={styles.login_link_sign_up}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Text>
            </Text>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
