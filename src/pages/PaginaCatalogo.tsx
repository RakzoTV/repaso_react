import { useState } from "react";
import CatalogoHabitaciones from "../components/CatalogoHabitaciones";
import { habitaciones } from "../data/habitaciones";
import FiltrosCatalogo from "../components/FiltrosCatalogo";

function PaginaCatalogo(){
    const [filtro, setFiltro] = useState<{
        tipo: "todos" | "individual" | "doble" | "suite"
        precioMax: number
        capacidadMin: number
    }>({
        tipo: "todos",
        precioMax: 1000,
        capacidadMin: 1
    })

    const habitacionesFiltradas = habitaciones.filter((h) =>
        (filtro.tipo === "todos" || h.tipo === filtro.tipo) &&
        (h.precioPorNoche <= filtro.precioMax) &&
        (h.capacidad >= filtro.capacidadMin)
    )

    return(
        <>
        <h1 className="pt-8 text-center text-2xl font-bold text-gray-900">Catálogo de Habitaciones</h1>
        <FiltrosCatalogo onFiltrar={setFiltro}/>
        {habitacionesFiltradas.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No hay habitaciones que coincidan con los filtros.</p>
        ) : (
            <CatalogoHabitaciones habitaciones={habitacionesFiltradas} />
        )}
        </>
    )
}

export default PaginaCatalogo;