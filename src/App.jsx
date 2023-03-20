import { BrowserRouter, Routes, Route } from "react-router-dom"

// Context
import { AuthProvider } from "./context/AuthProvider"

// Layout 
import IndexLayout from "./components/layout/IndexLayout"

// Components
import Clientes from './components/clientes/Clientes'
import NuevoCliente from "./components/clientes/NuevoCliente"
import EditarCliente from "./components/clientes/EditarCliente"

import Productos from './components/productos/Productos'
import NuevoProducto from "./components/productos/NuevoProducto"
import EditarProducto from "./components/productos/EditarProducto"

import Pedidos from './components/pedidos/Pedidos'
import NuevoPedido from "./components/pedidos/NuevoPedido"

import Login from './components/auth/Login'


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rutas NO protegidas: publicas */}
                    <Route path="/" element={<IndexLayout />}>

                        <Route index element={<Clientes />} />

                        {/* /clientes */}
                        <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                        <Route path="/clientes/editar/:id" element={<EditarCliente />} />

                        {/* /productos */}
                        <Route path="productos" element={<Productos />} />
                        <Route path="productos/nuevo" element={<NuevoProducto />} />
                        <Route path="productos/editar/:id" element={<EditarProducto />} />

                        {/* /pedidos */}
                        <Route path="pedidos" element={<Pedidos />} />
                        <Route path="pedidos/nuevo/:id" element={<NuevoPedido />} />

                        {/* /usuarios */}
                        <Route path="usuarios/iniciar-sesion" element={<Login />} />
                    </Route>  
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
