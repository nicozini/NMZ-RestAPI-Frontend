import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"

import axiosInstance from "../../../config/Axios"

// Context
import useAuth from "../../hooks/useAuth";


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // Context Data
    const { auth, setAuth, token, setToken } = useAuth()




    // --- APARTADO FUNCIONES ---

    // FUNCION: manejar envio del formulario
    const handleSubmit = async e => {
        e.preventDefault()

        // Autenticar usuario
        try {
            const respuesta = await axiosInstance.post('/usuarios/iniciar-sesion', {
                email, 
                password
            })

            // Extraer Token y colocarlo en localStorage
            const { token } = respuesta.data
            localStorage.setItem('token', token)

            // Colocar token y auth en el state en Context
            setAuth(true)
            setToken(token)

            // Alerta login correcto
            Swal.fire({
                icon: 'success',
                title: 'Login correcto'
            })

            // Redireccionar
            setTimeout(() => {
                navigate('/')
            }, 800);

        } catch (error) {
            // console.log(error);

            // Si el error es de una respuesta de Express (autenticación)
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg
                })
            } else {
                // Manejo el error para CORS
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Ocurrió un error'
                })
            }
        }
    }


    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={handleSubmit}                
                >
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Ingresá tu Email"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingresá tu Password"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Iniciar Sesión"
                        className="btn btn-verde btn-block"
                    />
                </form>
            </div>
        </div>
    )
}

export default Login