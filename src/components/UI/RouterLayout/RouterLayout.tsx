import React from "react"
import { useAppSelector } from "../../../helpers/hooks/useAppSelector"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Layout } from "../index"
import Header from "../../Header"
import Footer from "../../Footer"

const RouterLayout: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.user)

    return (
        <>
            <Layout>
                <Header />
                <Outlet />
                <ScrollRestoration />
            </Layout>
            {isLogin ? <Footer /> : null}
        </>
    )
}

export default RouterLayout
