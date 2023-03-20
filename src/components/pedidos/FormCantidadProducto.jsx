
const FormCantidadProducto = ({producto, restarCantidad, sumarCantidad, index, eliminarProducto}) => {

    const { nombre, precio, cantidad, _id } = producto

    return (
        <li>
        <div className="texto-producto">
            <p className="nombre">{nombre}</p>
            <p className="precio">$ {precio}</p>
        </div>

        <div className="acciones">
            <div className="contenedor-cantidad">
                <i 
                    className="fas fa-minus"
                    onClick={() => restarCantidad(index)}
                ></i>
                    {cantidad}
                <i 
                    className="fas fa-plus"
                    onClick={() => sumarCantidad(index)}
                ></i>
            </div>

            <button 
                type="button"
                className="btn btn-rojo"
                onClick={() => eliminarProducto(_id)}
            >
                <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
            </button>
        </div>
        </li>
    );
}

export default FormCantidadProducto