import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import Alerta from "../layout/Alerta"
import axiosInstance from '../../../config/Axios'

// Context
import useAuth from "../../hooks/useAuth";


const NuevoProducto = () => {

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [archivo, setArchivo] = useState('')

  const [alerta, setAlerta] = useState({})

  const navigate = useNavigate()

  // Context Data
  const { auth, setAuth, token, setToken } = useAuth()


  useEffect( () => {

    // Valido 1 - Que exista autenticación
    if (!auth) {
      navigate('/usuarios/iniciar-sesion')        
    }

    // Valido 2 - Que exista autenticación
    if (token === '') {
      navigate('/usuarios/iniciar-sesion')
    }
  }, [])



  // --- APARTADO FUNCIONES ---
  const handleSubmit = async e => {
    e.preventDefault()

    // Validar Form
    // Validar campos no vacíos
    if ([nombre, precio].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }
  
    // Luego de la validación, si todo esta bien elimino la alerta y creo el producto en la API (escribo en DB)
    setAlerta({})

    // Crear form-data para subir archivos en React
    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('precio', precio)
    formData.append('imagen', archivo)

    // Almacenar en DB
    try {
      const res = await axiosInstance.post('/productos', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      // Lanzar alerta
      if (res.status === 200) {
        Swal.fire(
          'Producto creado correctamente',
          res.data.msg,
          'success'
        )
      }

      // Finalmente redireccionar
      navigate('/productos')
      
    } catch (error) {
        console.log(error);
        // Lanzar alerta
        Swal.fire({
          type: 'error',
          title: 'Hubo un error',
          text: 'Vuelva a intentarlo en unos minutos'
        })
    }
  }


  const leerArchivo = e => {
    // console.log(e.target.files)
    setArchivo(e.target.files[0])
  }



  const { msg } = alerta


  return (
    <>      
      <h2>Nuevo Producto</h2>

      <form
        onSubmit={handleSubmit}
      >
        <legend>Llena todos los campos</legend>

        { msg && <Alerta 
          alerta={alerta}
        /> } 

        <div className="campo">
            <label>Nombre:</label>
            <input 
              type="text" 
              placeholder="Nombre Producto" 
              name="nombre" 
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="campo">
            <label>Precio:</label>
            <input 
              type="number" 
              name="precio" 
              min="0.00" 
              step="1" 
              placeholder="Precio"
              value={precio}
              onChange={e => setPrecio(e.target.value)} 
            />
        </div>

        <div className="campo">
            <label>Imagen:</label>
            <input 
              type="file"  
              // multiple -> con este atributo puedo agregar mas de un archivo
              name="imagen" 
              onChange={leerArchivo}
            />
        </div>

        <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </>
  )
}
    
export default NuevoProducto