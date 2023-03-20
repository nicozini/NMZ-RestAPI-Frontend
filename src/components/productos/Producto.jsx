import { Link } from "react-router-dom"
import axiosInstance from "../../../config/Axios";
import Swal from 'sweetalert2'


const Producto = ({producto}) => {

    const { nombre, precio, imagen, createdAt, updatedAt, _id } = producto

    // Eliminar Producto
    const eliminarProducto = idProducto => {
        // console.log('Eliminando...', id);

        Swal.fire({
            title: '¿Eliminar Producto?',
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
                axiosInstance.delete(`/productos/${idProducto}`)
                    .then(res => { 
                        if (res.status === 200) {
                            // Confirmar eliminar
                            Swal.fire(
                                '¡Producto Eliminado!',
                                res.data.msg,
                                'success'
                            )
                        }
                    })
            }
        })
    }

     
    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                <p className="precio">Creado: {createdAt}</p>
                <p className="precio">Actualizado: {updatedAt}</p>
                { imagen ? (
                    <img src={`http://localhost:4000/productos/${imagen}`} alt="Imagen producto" />
                ) : null }                
            </div>

            <div className="acciones">
                <Link 
                    to={`/productos/editar/${_id}`}
                    className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Producto
                </Link>

                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}
    
export default Producto