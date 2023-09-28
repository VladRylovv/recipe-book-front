import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../helpers/hooks/useAppDispatch"
import { useFormik } from "formik"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { useCreateUserMutation } from "../../store/auth/auth.api"
import * as Yup from "yup"
import { Button, Input, Text } from "../../components/UI"
import { initUser } from "../../store/auth/auth.slice"
import styles from "./SignUpPage.module.scss"

const SignUpPage: React.FC = () => {
  const [errorExists, setErrorExists] = useState(false)
  const [submitBtnClicked, setSubmitBtnClicked] = useState(false)

  useSetTitle("Sign up")

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required("Required field"),
      password: Yup.string().required("Required field"),
      repeatPassword: Yup.string()
        .required("Required field")
        .oneOf([Yup.ref("password")], "Passwords don`t match"),
    }),
    validateOnChange: submitBtnClicked,
    validateOnBlur: false,
    onSubmit: () => {
      handleCreateUser()
    },
  })

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [createUser] = useCreateUserMutation()

  const errors = useMemo(() => {
    return {
      login: errorExists
        ? "Login already exists"
        : formik.errors.login
        ? formik.errors.login
        : null,
      password: formik.errors.password ? formik.errors.password : null,
      repeatPassword: formik.errors.repeatPassword
        ? formik.errors.repeatPassword
        : null,
    }
  }, [errorExists, formik.errors])

  const handleCreateUser = () => {
    createUser({
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

        if (err.status === 409) setErrorExists(true)
      })
  }

  return (
    <div className={styles.sign_page_wrap}>
      <div className={styles.sign_image}></div>
      <div className={styles.sign_form_wrap}>
        <div className={styles.sign_form}>
          <Text className={styles.sign_form_title} size={24}>
            Sign Up
          </Text>
          <form>
            <Input
              name={"login"}
              className={styles.sign_form_input}
              placeholder={"Your login"}
              value={formik.values.login}
              error={errors.login}
              onChange={(value, e) => {
                setErrorExists(false)
                formik.handleChange(e)
              }}
            />
            <Input
              name={"password"}
              className={styles.sign_form_input}
              type={"password"}
              placeholder={"Your password"}
              value={formik.values.password}
              error={errors.password}
              onChange={(_, e) => formik.handleChange(e)}
            />
            <Input
              name={"repeatPassword"}
              className={styles.sign_form_input}
              type={"password"}
              placeholder={"Repeat password"}
              value={formik.values.repeatPassword}
              error={errors.repeatPassword}
              onChange={(_, e) => formik.handleChange(e)}
            />
            <Button
              label={"Sign Up"}
              onClick={() => {
                formik.handleSubmit()
                setSubmitBtnClicked(true)
              }}
            />
            <Text className={styles.sign_text_login}>
              Already have an account?{" "}
              <Text
                component={"span"}
                className={styles.sign_link_login}
                onClick={() => navigate("/login")}
              >
                Login
              </Text>
            </Text>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
