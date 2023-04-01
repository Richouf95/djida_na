import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [err, setErr] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, pwd) => {

        setIsLoading(true)
        setErr(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pwd })
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setErr(json.error)
        }
        if(response.ok) {
            // save the user to the local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, err }
}