import { Link } from "react-router-dom"

function Navbar() {
    return(
        <nav className="flex items-center gap-6 bg-sky-700 px-6 py-4 shadow-md">
            <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-white hover:text-sky-200">
                Catálogo
            </Link>
            <Link to="/mis-reservas" className="text-sm font-semibold uppercase tracking-wide text-white hover:text-sky-200">
                Mis Reservas
            </Link>
        </nav>
    )
}

export default Navbar