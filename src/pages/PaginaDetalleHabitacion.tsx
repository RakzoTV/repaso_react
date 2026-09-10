import { useNavigate, useParams } from "react-router-dom";
import { habitaciones } from "../data/habitaciones";
import FormularioReserva from "../components/FormularioReserva";
import { useState } from "react";
import type { Reserva } from "../types/types";

interface PaginaDetalleHabitacionProps {
    agregarReserva: (nuevaReserva: Reserva) => void
}

function PaginaDetalleHabitacion({ agregarReserva }: PaginaDetalleHabitacionProps) {

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();

    const habitacion = habitaciones.find((h) => h.id === Number(id))

    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

    function handleReservaConfirmada(nuevaReserva: Reserva) {
        agregarReserva(nuevaReserva)
        navigate("/mis-reservas")
    }

    if (!habitacion) {
        return (
            <>
                <p className="py-12 text-center text-gray-500">Habitación no encontrada</p>
            </>
        )
    }

    return (
        <>
            <div className="mx-auto max-w-2xl p-6">
                <button
                    onClick={() => navigate("/")}
                    className="mb-4 text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                    ← Volver
                </button>

                <img
                    src={habitacion.imagenUrl}
                    alt={habitacion.nombre}
                    className="h-64 w-full rounded-xl object-cover"
                />

                <div className="mt-4 flex items-start justify-between gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{habitacion.nombre}</h1>
                    <span className="whitespace-nowrap rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
                        {habitacion.tipo}
                    </span>
                </div>

                <p className="mt-2 text-gray-600">{habitacion.descripcion}</p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-sm text-gray-500">Capacidad: {habitacion.capacidad}</span>
                    <span className="text-lg font-bold text-gray-900">
                        ${habitacion.precioPorNoche}
                        <span className="text-sm font-normal text-gray-500"> / noche</span>
                    </span>
                </div>

                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="mt-6 w-full rounded-md bg-sky-600 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                    Reservar
                </button>
            </div>

            {mostrarFormulario && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <FormularioReserva
                        habitacion={habitacion}
                        onReservaConfirmada={handleReservaConfirmada}
                        onCerrar={() => setMostrarFormulario(false)}
                    />
                </div>
            )}
        </>
    )
}
export default PaginaDetalleHabitacion;