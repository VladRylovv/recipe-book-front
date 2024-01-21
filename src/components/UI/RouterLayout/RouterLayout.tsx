import React from "react"
import { useAppSelector } from "../../../helpers/hooks/useAppSelector"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Layout } from "../index"
import Header from "../../Header"
import Footer from "../../Footer"

const RouterLayout: React.FC = () => {
  return (
    <>
      <Layout>
        <Header />
        <Outlet />
        <ScrollRestoration />
      </Layout>
      <Footer />
    </>
  )
}

export default RouterLayout
