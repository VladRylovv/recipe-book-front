import React from "react"
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom"
import Main from "../../pages/Main"
import DetailRecipe from "../../pages/DetailRecipe"
import CreateRecipe from "../../pages/CreateRecipe"
import Profile from "../../pages/Profile"
import Settings from "../../pages/Settings"
import RouterLayout from "../UI/RouterLayout/RouterLayout"
import LoginPage from "../../pages/LoginPage"
import SignUpPage from "../../pages/SignUpPage"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import NotFoundPage from "../../pages/NotFoundPage"

const Router: React.FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={"/"}
                    element={<RouterLayout />}
                    errorElement={<NotFoundPage />}
                >
                    <Route
                        index
                        element={
                            <PrivateRoute loginPage={false}>
                                <Main />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={"profile/:profileId"}
                        element={
                            <PrivateRoute loginPage={false}>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route path={":recipeId"} element={<DetailRecipe />} />
                    <Route
                        path={"create"}
                        element={
                            <PrivateRoute loginPage={false}>
                                <CreateRecipe />
                            </PrivateRoute>
                        }
                    />
                    <Route path={"settings"} element={<Settings />} />
                </Route>
                <Route
                    path={"/login"}
                    element={
                        <PrivateRoute>
                            <LoginPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={"/signup"}
                    element={
                        <PrivateRoute>
                            <SignUpPage />
                        </PrivateRoute>
                    }
                />
            </>
        )
    )

    return <RouterProvider router={router} />
}

export default Router
