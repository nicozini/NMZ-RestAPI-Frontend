import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../../../config/Axios"

import Cliente from '../clientes/Cliente'
import Spinner from "../layout/Spinner";

// Context
import useAuth from "../../hooks/useAuth";


const Clientes = () => {

    // State  
    const [clientes, setClientes] = useState([])

    // Context Data
    const { auth, setAuth, token, setToken } = useAuth()

    const navigate = useNavigate();

    
    useEffect( () => {

        // Valido 1 - Que exista autenticación
        if (!auth) {
            navigate('/usuarios/iniciar-sesion')        
        }

        // Valido 2 - Que exista autenticación
        if (token !== '') {
            return () => consultarAPI();
        } else {
            navigate('/usuarios/iniciar-sesion')
        }

    }, [clientes])


  // Función para Consultar API listado de clientes
    const consultarAPI = async () => {
        try {            
            const clientesConsulta = await axiosInstance.get('/clientes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Colocar resultado en state
            setClientes(clientesConsulta.data);

        } catch (error) {
            // Error con autorización
            if (error.response.status == 500) {
                navigate('/usuarios/iniciar-sesion')
            }            
        }
    }  


    // Spinner
    if (!clientes.length) return <Spinner />


    return (
        <>
            <h2>Clientes</h2>
        
            <Link 
                to="/clientes/nuevo" 
                className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
        
            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </>
    )
}

export default Clientes