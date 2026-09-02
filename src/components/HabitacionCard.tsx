import type { Habitacion } from "../types/types"


interface HabitacionCardProps {
    habitacion: Habitacion
    onSeleccionar: (habitacion: Habitacion) => void
}

function HabitacionCard({ habitacion, onSeleccionar }: HabitacionCardProps) {
    return (
        <div className="w-80 overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl">
            <img
                src={habitacion.imagenUrl}
                alt={habitacion.nombre}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg font-bold text-gray-900">{habitacion.nombre}</h2>
                    <span className="whitespace-nowrap rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
                        {habitacion.tipo}
                    </span>
                </div>

                <p className="mt-2 text-sm text-gray-600">{habitacion.descripcion}</p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-sm text-gray-500">Capacidad: {habitacion.capacidad}</span>
                    <span className="text-lg font-bold text-gray-900">
                        ${habitacion.precioPorNoche}
                        <span className="text-sm font-normal text-gray-500"> / noche</span>
                    </span>
                </div>
            </div>
            <button
                onClick={() => onSeleccionar(habitacion)}
                className="w-full bg-sky-600 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
                Reservar
            </button>
        </div>
    )
}

export default HabitacionCard