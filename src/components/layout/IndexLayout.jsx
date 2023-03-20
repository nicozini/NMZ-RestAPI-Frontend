import { Outlet } from "react-router-dom"

// Layouts
import Header from './Header'
import Navbar from './Navbar'

const IndexLayout = () => {
  return (
    <>
      <Header />

      <div className="grid contenedor contenido-principal">
        <Navbar />

        <main className="caja-contenido col-9">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default IndexLayout