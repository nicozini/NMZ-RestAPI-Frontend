


const FormBuscarProducto = ({buscarProducto, leerDatosBusqueda}) => {


    return (
        <form
            onSubmit={buscarProducto} // Ejecuto la funcion cuando le doy en buscar
        >
            <legend>Buscá un Producto y Agregá una Cantidad</legend>

            <div className="campo">
                <label>Productos:</label>
                <input 
                    type="text"
                    placeholder="Nombre Productos" 
                    name="productos"
                    onChange={leerDatosBusqueda}
                />
            </div>

            <input
                type="submit"
                className="btn btn-azul btn-block"
                value="Buscar Producto"
            />
        </form>
    )
}

export default FormBuscarProducto