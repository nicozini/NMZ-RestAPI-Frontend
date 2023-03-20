import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../../../config/Axios"

import Producto from "./Producto"
import Spinner from "../layout/Spinner"

// Context
import useAuth from "../../hooks/useAuth";


const Productos = () => {

  const [productos, setProductos] = useState([])

  // Context Data
  const { auth, setAuth, token, setToken } = useAuth()

  const navigate = useNavigate()


  // useEffect para consultar API cuando cargue el componente Productos.jsx
  useEffect(() => {
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
  }, [productos])


  // --- APARTADO FUNCIONES ---
  const consultarAPI = async () => {

    try {
      const productosConsulta = await axiosInstance.get('/productos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Colocar resultado en state
      setProductos(productosConsulta.data);
      
    } catch (error) {
      // Error con autorización
      if (error.response.status == 500) {
        navigate('/usuarios/iniciar-sesion')
      }       
    }
  }

  // Spinner
  if (!productos.length) return <Spinner />
  

  return (
    <>
      <h2>Productos</h2>

      <Link 
        to="/productos/nuevo" 
        className="btn btn-verde nvo-cliente"> 
          <i className="fas fa-plus-circle"></i>
          Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map( producto => (
          <Producto 
            key={producto._id}
            producto={producto}
          />
        ))}

      </ul>
    </>
  )
}
  
export default Productos