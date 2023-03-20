// NOTA IMPORTANTE:
// - Otra forma de trabajar con formularios para colocar valores en el state es la siguiente
// - Para este caso mi tradicional onChange={e => setApellido(e.target.value)} pasa a ser
//   onChange={actualizarState}
/*
const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',
})
*/
// - Luego en lugar de mi handleSubmit tradicional, escribo en ese objeto
/*
const actualizarState = e => {
    setCliente({
        ...cliente,
        [e.target.name] : e.target.value
    })

    console.log(cliente)
}
*/

// INICIO DEL CÓDIGO
import { useState } from "react"
import { useNavigate, Navigate  } from "react-router-dom";
import Swal from 'sweetalert2'

import Alerta from '../layout/Alerta'
import axiosInstance from '../../../config/Axios'

// Context
import useAuth from "../../hooks/useAuth";


const NuevoCliente = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')

    const [alerta, setAlerta] = useState({})

    // Context Data
    const { auth, setAuth, token, setToken } = useAuth()

    const navigate = useNavigate()





    // --- APARTADO FUNCIONES ---

    // Función para manejar el envío del formulario de Alta de Cliente
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

        guardarCliente({
            nombre,
            apellido,
            empresa,
            email,
            telefono
        })

        // Reseto valores del form
        setNombre('')
        setApellido('')
        setEmpresa('')
        setEmail('')
        setTelefono('')
    }


    // Función para crear un documento en MongoDB (API): crear cliente
    const guardarCliente = async cliente => {
        // console.log('GUARDAR CLIENTE');
        // console.log(cliente);

        // Enviar petición a Axios
        try {
            await axiosInstance.post('/clientes', cliente)
                .then(res => {
                    // - Validar si hay errores de MongoDB (unique, required, etc)
                    // - Esta validación es del front pero lo mismo debería validar en el backend
                    if (res.data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error...',
                            text: res.data.msg
                        });

                    } else {
                        Swal.fire(
                            'Cliente agregado!',
                            res.data.msg,
                            'success'
                        );
                    }

                    // Redireccionar
                    // window.location.href()
                    navigate('/')
                })
                .catch(error => {
                    console.log(error);
                });

            // - Si utilizo un componente propio de REACT en lugar de una librería como Sweet Alert 2
            // setAlerta({ msg: 'Cliente guardado correctamente', error: false })
            // setTimeout(() => {
            //     setAlerta({})
            // }, 3000)

        } catch (error) {
            console.log(error);
        }
    }

    const { msg } = alerta


    // Verificar si el usuario esta autenticado 
    // (Forma de asegurar endpoints que no hacen consulta a mi API de Node.js)
    // Opción 1
    // if (!auth) return null
    // Opción 2
    // if (!auth) return navigate('/usuarios/iniciar-sesion')
    // Opción 3: verificar además que el token que tengo en storage sea el mismo de la db
    // - Para realizarlo como en el primer IF me da error
    // if (!auth && (localStorage.getItem('token') === token)) return navigate('/usuarios/iniciar-sesion')
    if (!auth && (localStorage.getItem('token') === token)) return <Navigate to="/usuarios/iniciar-sesion" replace={true} />
    
    return (
        <>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={handleSubmit}
            >
                <legend>Alta de Nuevo Cliente:</legend>

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
                        value="Agregar Cliente"
                    />
                </div>
            </form>
        </>
    )
}

export default NuevoCliente