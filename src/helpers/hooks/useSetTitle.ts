import { useEffect, useLayoutEffect } from "react"

export function useSetTitle(title: string, deps = []) {
    useEffect(() => {
        document.title = title
    }, deps)
}
