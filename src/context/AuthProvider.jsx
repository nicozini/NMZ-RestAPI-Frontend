import { useState, useEffect, createContext } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState('')

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                token,
                setToken
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}

// EXPORTS
export {
    AuthProvider
}

export default AuthContext