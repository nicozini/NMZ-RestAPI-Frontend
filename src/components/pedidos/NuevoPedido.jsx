import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import axiosInstance from "../../../config/Axios";
import Swal from 'sweetalert2'

import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";

// Context
import useAuth from "../../hooks/useAuth";


const NuevoPedido = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [telefono, setTelefono] = useState('')
    const [busqueda, setBusqueda] = useState('')
    const [productos, setProductos] = useState('')
    const [total, setTotal] = useState(0)

    const navigate = useNavigate()
    
    // ID del cliente para consultar en la DB (mi referencia)
    const { id } = useParams();

    // Context Data
    const { auth, setAuth, token, setToken } = useAuth()


    useEffect(() => {

        // Valido 1 - Que exista autenticación
        if (!auth) {
            navigate('/usuarios/iniciar-sesion')        
        }

        // Valido 2 - Que exista autenticación
        if (token !== '') {
            return () => { 
                consultarAPI()
                actualizarTotal()
            }
        } else {
            navigate('/usuarios/iniciar-sesion')
        }
    }, [productos])


    // --- APARTADO FUNCIONES ---

    // FUNCION: Consultar API Backend para obetener clientes
    const consultarAPI = async () => {
        const resultado = await axiosInstance.get(`/clientes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // Destructuring
        const {nombre, apellido, email, empresa, telefono } = resultado.data

        // Colocar en State
        setNombre(nombre)
        setApellido(apellido)
        setEmail(email)
        setEmpresa(empresa)
        setTelefono(telefono)
    }


    // FUNCION: buscar en la DB (es el handleSubmit del form buscar producto en la vista)
    const buscarProducto = async e => {
        e.preventDefault();

        // Consultar DB para obtener productos de la Busqueda del usuario
        const resultadoBusqueda = await axiosInstance.post(`/productos/busqueda/${busqueda}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // Si no hay resultados lanzar alerta
        if (resultadoBusqueda.data[0]) {
            // Creo un objeto con la misma estructura que mi modelo de pedidos
            const productoResultado = resultadoBusqueda.data[0]
            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0

            // const existe = productos.some( producto => producto.id === productoResultado._id)
            // console.log(existe)

            // Coloco la información en el state
            setProductos([...productos, productoResultado])
            
        } else {
            // No hay resultados
            Swal.fire({
                icon: 'error',
                title: 'Sin Resultados',
                text: 'No existen productos para tu búsqueda',
                confirmButtonText: 'Cerrar'
            })
        }
    }


    // FUNCION: leer lo que busca el usuario y colocar eso en el state
    const leerDatosBusqueda = e => {
        setBusqueda(e.target.value)
    }


    // FUNCION: actualizar la cantidad de productos en menos
    const restarCantidad = i => {
        // Copiar arreglo original
        const todosProductos = [...productos]
        // Validar si esta en 0 no se puede restar mas
        if (todosProductos[i].cantidad === 0) return;
        // Paso validacion, resto
        todosProductos[i].cantidad--;
        // Alamacenar en State
        setProductos(todosProductos)
    }

    // FUNCION: actualizar la cantidad de productos en mas
    const sumarCantidad = i => {
        // Copiar arreglo original
        const todosProductos = [...productos]
        // Incremento
        todosProductos[i].cantidad++
        // Almacenar en State
        setProductos(todosProductos)
    }

    
    // FUNCION: Calcular y actualizar el total a pagar
    const actualizarTotal = () => {
        if (productos.length === 0) {
            setTotal(0)
            return
        }

        // Calcular total
        let nuevoTotal = 0;
        // Recorrer cantidades y precios de cada producto
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
        // Guardo el total en el state
        setTotal(nuevoTotal)
    }


    // FUNCION: eliminar un producto del state
    const eliminarProducto = id => {
        const productosFiltrados = productos.filter(producto => producto._id !== id)
        setProductos(productosFiltrados)
    }


    // FUNCION: manejar o administrar el envío del formulario del pedido
    const handleSubmit = async e => {
        e.preventDefault()

        // Construir el objeto similar al de mi DB
        const pedido = {
            cliente: id,
            pedido: productos,
            total
        }

        // Almacenar pedido en DB
        const resultado = await axiosInstance.post(`/pedidos/nuevo/${id}`, pedido, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // Leer resultado
        if(resultado.status === 200) {
            // Alerta todo bien
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: resultado.data.msg,
                confirmButtonText: 'Cerrar'
            })
        } else {
            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Vuelva a intentarlo en unos minutos',
                confirmButtonText: 'Cerrar'
            })
        }

        // Redireccionar
        navigate('/pedidos')
    }



    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{nombre} {apellido}</p>
                <p>CORREO: {email}</p>
                <p>TELEFONO: {telefono}</p>
                <p>EMPRESA: {empresa}</p>
            </div>


            <FormBuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                {productos.length &&
                    productos.map((producto, index) => (
                        <FormCantidadProducto 
                            key={producto._id}
                            producto={producto}
                            index={index}
                            restarCantidad={restarCantidad}
                            sumarCantidad={sumarCantidad}
                            eliminarProducto={eliminarProducto}
                        />
                    ))}
            </ul>

            <p className="total">Total a Pagar: <span>$ {total}</span></p>

            {total > 0 ? (
                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        type="submit"
                        className="btn btn-verde btn-block"
                        value="Confirmar Pedido"
                    />
                </form>
            ) : null}

        </>
    )
}

export default NuevoPedido