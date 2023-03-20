import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

import Alerta from '../layout/Alerta'
import axiosInstance from '../../../config/Axios'

// Context
import useAuth from "../../hooks/useAuth";


const EditarCliente = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')

    const [alerta, setAlerta] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    // Context Data
    const { auth, setAuth, token, setToken } = useAuth()


    // Hook para consultar la API cuando se carga el componente EditarCliente.jsx
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
    }, [])



    // --- APARTADO FUNCIONES ---

    // Función para obtener un cliente de la API por su ID
    const consultarAPI = async () => {
        const clienteConsulta = await axiosInstance.get(`/clientes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // - De acá mismo pueda sacar el ID por destructuring { ._id } (se llama tal como en el objeto)
        // - A los fines prácticos utilizo el hook useParams como id (se llama tal como en el parametro)
        const { nombre, apellido, empresa, email, telefono } = clienteConsulta.data

        console.log(clienteConsulta.data);

        // Coloco en State mis variables
        setNombre(nombre)
        setApellido(apellido)
        setEmpresa(empresa)
        setEmail(email)
        setTelefono(telefono)
    }


    // Función para manejar el envío del formulario de actualizacion de Cliente
    const handleSubmit = e => {
        e.preventDefault();

        // Validar Form
        // Validar campos no vacíos
        if ([nombre, apellido, empresa, email, telefono].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return
        }
    
        // Luego de la validación, si todo esta bien elimino la alerta y creo el usuario en la API
        setAlerta({})

        // Actualizo en la DB
        axiosInstance.put(`/clientes/${id}`, {
            nombre,
            apellido,
            empresa,
            email,
            telefono
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then( res => { console.log(res) })
        .catch( err => { console.log(err) });

        // Mensaje de confirmación
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Cliente Actualizado!',
            showConfirmButton: false,
            timer: 2000
        })

        // Redireccionamiento
        setTimeout(() => {
            navigate('/')
        }, 1600);
    }


    const { msg } = alerta



    return (
        <>
            <h2>Editar Cliente</h2>

            <form
                onSubmit={handleSubmit}
            >
                <legend>Modificar datos del Cliente</legend>

                { msg && <Alerta 
                    alerta={alerta}
                /> }

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text"
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        value={empresa}
                        onChange={e => setEmpresa(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)} 
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Guardar"
                    />
                </div>
            </form>
        </>
    )
}

export default EditarCliente