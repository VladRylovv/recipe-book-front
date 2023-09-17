import React, { useMemo } from "react"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { useLogoutMutation } from "../../store/auth/auth.api"
import { useAppDispatch } from "../../helpers/hooks/useAppDispatch"
import { NavLink, useNavigate } from "react-router-dom"
import { Text } from "../UI"
import { logout } from "../../store/auth/auth.slice"
import styles from "./Header.module.scss"

const Header: React.FC = () => {
  const navigate = useNavigate()

  const { user, isAuth, isLoaded } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [logoutUser] = useLogoutMutation()

  const handleLogout = () => {
    logoutUser().then(() => {
      dispatch(logout())
      navigate("/login")
    })
  }

  const routes = useMemo(() => {
    const authRoutes = [
      {
        id: 1,
        label: "Create recipe",
        url: "/create",
      },
      {
        id: 2,
        label: "Profile",
        url: `/profile/${user?.id}`,
      },
    ]
    const notAuthRoutes = [
      {
        id: 4,
        label: "Sign up",
        url: "/signup",
      },
      {
        id: 5,
        label: "Login",
        url: "/login",
      },
    ]

    const staticRoutes = [
      {
        id: 3,
        label: "Settings",
        url: "/settings",
      },
    ]

    return isAuth
      ? [...authRoutes, ...staticRoutes]
      : [...staticRoutes, ...notAuthRoutes]
  }, [user, isAuth])

  if (isLoaded) return null

  return (
    <div className={styles.header_wrap}>
      <Text
        className={styles.header_title}
        size={24}
        type={"bold"}
        onClick={() => navigate("/")}
      >
        RecipesBook
      </Text>
      <div className={styles.header_links}>
        {routes.map((item) => {
          return (
            <NavLink
              key={item.id}
              className={({ isActive }) => {
                return isActive
                  ? `${styles.header_nav_link} ${styles.header_nav_link_active}`
                  : styles.header_nav_link
              }}
              to={item.url}
            >
              <Text className={styles.header_link}>{item.label}</Text>
            </NavLink>
          )
        })}
        {isAuth && (
          <Text className={styles.header_link} onClick={handleLogout}>
            Logout
          </Text>
        )}
      </div>
    </div>
  )
}

export default Header
