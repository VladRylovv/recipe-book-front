import React, { PropsWithChildren } from "react"
import { useAppSelector } from "../../../helpers/hooks/useAppSelector"
import { Navigate, useLocation } from "react-router-dom"
import { IPrivateRoute } from "./IPrivateRoute"

const PrivateRoute: React.FC<PropsWithChildren<IPrivateRoute>> = ({
    children,
    loginPage = true,
}) => {
    const isAuth = useAppSelector((state) => state.auth.user)
    const location = useLocation()

    if (!loginPage) {
        if (isAuth) return children

        return <Navigate to={"/login"} state={{ from: location }} replace />
    }

    if (isAuth) return <Navigate to={"/"} />

    return children
}

export default PrivateRoute
