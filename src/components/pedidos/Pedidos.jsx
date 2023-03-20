import { useState, useEffect } from "react"

import axiosInstance from "../../../config/Axios"

import Pedido from "./Pedido"

// Context
import useAuth from "../../hooks/useAuth";


const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])

    // Context Data
    const { auth, setAuth, token, setToken } = useAuth()

    
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

    }, [])




    // --- APARTADO FUNCIONES

    // FUNCION: consultar API DB para obtener los pedidos
    const consultarAPI = async () => {
        const resultado = await axiosInstance.get('/pedidos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        setPedidos(resultado.data)
    }


    return (
        <>
            <h2>Pedidos</h2>
            
            <ul className="listado-pedidos">
                {pedidos.map(pedidoIndividual => (
                    <Pedido 
                        key={pedidoIndividual._id}
                        pedidoIndividual={pedidoIndividual}
                    />
                ))}
            </ul>
        </>
    )
}
  
export default Pedidos