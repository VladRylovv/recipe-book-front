import { useLazyRefreshTokenQuery } from "../../store/auth/auth.api"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { initUser } from "../../store/auth/auth.slice"

export function useCheckAuth() {
    const [fetchRefreshToken] = useLazyRefreshTokenQuery()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchRefreshToken()
            .unwrap()
            .then((res) => {
                if (res.user) {
                    dispatch(initUser(res.user))
                    navigate("/")
                }
            })
    }, [])

    return null
}
