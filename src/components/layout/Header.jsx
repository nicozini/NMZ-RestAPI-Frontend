import { Link } from "react-router-dom";

// Context
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



const Header = () => {

    const { auth, setAuth, token, setToken } = useAuth()

    const navigate = useNavigate()


    // --- APARTADO FUNCIONES ---

    // FUNCIÓN: cerrar sesión de usuario al hacer click en el botón
    const cerrarSesion = () => {
        // Setear auth a false y setear token a '' (ambos a valores iniciales)
        setAuth(false)
        setToken('')

        // Eliminar token de storage
        localStorage.setItem('token', '')

        // Redireccionar
        navigate('/usuarios/iniciar-sesion')
    }



    return (
        <header className="barra">
          <div className="contenedor">
            <div className="contenido-barra">
                <h1>
                <Link 
                    to="/"
                    className="clientes"
                >CRM - Administrador de Clientes</Link>
                </h1>

                { auth &&
                    <button 
                        type="button"
                        className="btn btn-rojo"
                        onClick={cerrarSesion}
                    >
                        <i className="far fa-times-circle"></i>
                        Cerrar Sesión
                    </button>                
                }
            </div>
          </div>
        </header>
    );
}

export default Header