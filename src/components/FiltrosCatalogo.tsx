import { useState } from "react"

interface FiltrosCatalogoProps {
    onFiltrar: (filtros: {
        tipo: "todos" | "individual" | "doble" | "suite"
        precioMax: number
        capacidadMin: number
    }) => void
}

function FiltrosCatalogo({ onFiltrar }: FiltrosCatalogoProps) {
    const [tipo, setTipo] = useState<"todos" | "individual" | "doble" | "suite">("todos")
    const [precioMax, setPrecioMax] = useState<number>(1000)
    const [capacidadMin, setCapacidadMin] = useState<number>(1)
    
    function handleFiltrar() {
        onFiltrar({
            tipo,
            precioMax,
            capacidadMin
        })
    }

    function handleBorrarFiltros() {
        setTipo("todos")
        setPrecioMax(1000)
        setCapacidadMin(1)
        onFiltrar({
            tipo: "todos",
            precioMax: 1000,
            capacidadMin: 1
        })
    }

    return(
        <div className="mx-auto flex max-w-4xl flex-wrap items-end justify-center gap-4 p-6">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
                Tipo
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as "todos" | "individual" | "doble" | "suite")}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                >
                    <option value="todos">Todos</option>
                    <option value="individual">Individual</option>
                    <option value="doble">Doble</option>
                    <option value="suite">Suite</option>
                </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
                Precio máximo
                <input
                    type="number"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(Number(e.target.value))}
                    placeholder="precio max"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                />
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
                Capacidad mínima
                <input
                    type="number"
                    value={capacidadMin}
                    onChange={(e) => setCapacidadMin(Number(e.target.value))}
                    placeholder="capacidad min"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                />
            </label>

            <button
                onClick={handleFiltrar}
                className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
                Filtrar
            </button>
            <button
                onClick={handleBorrarFiltros}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
            >
                Borrar Filtros
            </button>
        </div>
    )
}

export default FiltrosCatalogo