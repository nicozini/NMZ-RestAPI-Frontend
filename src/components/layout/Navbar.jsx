import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";




const Navbar = () => {

    const { auth, setAuth, token, setToken } = useAuth()

    // Para que no muestre <aside> con mi navbar
    if (!auth) return null

    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link 
                    to="/"
                    className="clientes"
                >Clientes</Link>

                <Link 
                    to="/productos"
                    className="productos"
                >Productos</Link>

                <Link 
                    to="/pedidos"
                    className="pedidos"
                >Pedidos</Link>
            </nav>
        
            {/* <nav className="navegacion">
                <a href="index.html" className="clientes">Clientes</a>
                <a href="productos.html" className="productos">Productos</a>
                <a href="pedidos.html" className="pedidos">Pedidos</a>
            </nav> */}
        </aside>
    );
}

export default Navbar