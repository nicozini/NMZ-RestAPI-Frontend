import { useState } from "react"
import { Link } from "react-router-dom";
import axiosInstance from "../../../config/Axios";
import Swal from 'sweetalert2'


const Cliente = ({cliente}) => {

    const { nombre, apellido, email, empresa, telefono, createdAt, updatedAt, _id } = cliente;
    // const [nombre, setNombre] = useState()
    

    // Eliminar Cliente
    const eliminarCliente = idCliente => {
        // console.log('Eliminando...', id);

        Swal.fire({
            title: '¿Eliminar Cliente?',
            text: "Estos cambios no se podrán revertir.",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar registro
                axiosInstance.delete(`/clientes/${idCliente}`, cliente)
                    .then( res => { 
                        // Confirmar eliminar
                        Swal.fire(
                            '¡Cliente Eliminado!',
                            res.data.msg,
                            'success'
                        )
                    })
            }
        })
    }



    return (
        <>
            <li className="cliente">

                <div className="info-cliente">
                    <p className="nombre">{nombre} {apellido}</p>
                    <p className="empresa">{empresa}</p>
                    <p>{email}</p>
                    <p>{telefono}10</p>
                    <p>Creado: {createdAt}</p>
                    <p>Actualizado: {updatedAt}</p>
                </div>

                <div className="acciones">
                    <Link 
                        to={`/clientes/editar/${_id}`} 
                        className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                    </Link>    

                    <Link 
                        to={`/pedidos/nuevo/${_id}`} 
                        className="btn btn-amarillo">
                            <i className="fas fa-plus"></i>
                            Nuevo Pedido
                    </Link>    

                    <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarCliente(_id)}
                    >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </>
    )
}

export default Cliente