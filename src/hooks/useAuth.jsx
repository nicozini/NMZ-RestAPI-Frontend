import { useContext } from 'react'                  // Lo uso para leer los datos
import AuthContext from '../context/AuthProvider'   // Lo uso para identificar de que context extraer datos

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth