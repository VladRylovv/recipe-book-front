import React, { PropsWithChildren } from "react"
import { useAppSelector } from "../../../helpers/hooks/useAppSelector"
import { Navigate } from "react-router-dom"
import { Text } from "../../UI"
import { IPrivateRoute } from "./IPrivateRoute"

const PrivateRoute: React.FC<PropsWithChildren<IPrivateRoute>> = ({
  children,
  loginPage = true,
}) => {
  const { isLoaded, isAuth } = useAppSelector((state) => state.auth)
  const accessToken = localStorage.getItem("accessToken")

  // if (isLoaded)
  //   return (
  //     <div>
  //       <Text>Loading...</Text>
  //     </div>
  //   )

  switch (true) {
    case !loginPage && isAuth:
    case loginPage && !isAuth:
      return children
    case !loginPage && !isAuth && !accessToken:
      return <Navigate to={"/login"} />
    case loginPage && isAuth:
      return <Navigate to={"/"} />
  }
}

export default PrivateRoute
