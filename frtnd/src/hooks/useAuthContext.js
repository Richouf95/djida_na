import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const contextAuth = useContext(AuthContext)

    if (!contextAuth) {
        throw Error('useAuthContext must be used in an AuthContextProvider')
    }

    return contextAuth
}