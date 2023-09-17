import { useLazyRefreshTokenQuery } from "../../store/auth/auth.api"
import { useEffect } from "react"
import { useAppSelector } from "./useAppSelector"

export function useCheckAuth() {
  const [fetchRefreshToken] = useLazyRefreshTokenQuery()
  const { isAuth } = useAppSelector((state) => state.auth)

  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    if (accessToken && !isAuth) fetchRefreshToken()
  }, [])

  return null
}
