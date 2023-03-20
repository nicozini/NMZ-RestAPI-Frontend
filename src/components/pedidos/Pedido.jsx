


const Pedido = ({pedidoIndividual}) => {

    const { cliente, pedido, total, _id } = pedidoIndividual

    return (
        <>  
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID pedido: {_id}</p>

                    <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul>
                            {pedidoIndividual.pedido.map(item => (
                                <li
                                    key={_id+'-'+item._id}
                                >
                                    <p>ID ARTICULO: {item._id}</p>
                                    <p>NOMBRE: {item.producto.nombre}</p>
                                    <p>PRECIO: $ {item.producto.precio}</p>
                                    <p>CANTIDAD: {item.cantidad}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="total">Total: $ {total} </p>
                </div>
                <div className="acciones">
                    <a href="#" className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Pedido (funcionalidad no desarrollada)
                    </a>

                    <button type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"></i>
                        Eliminar Pedido
                    </button>
                </div>
            </li>      
        </>        
    )
}

export default Pedido