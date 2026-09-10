import React, { useState } from "react"
import type { Habitacion, Reserva } from "../types/types"

interface FormularioReservaProps {
    habitacion: Habitacion
    onCerrar: () => void
    onReservaConfirmada: (reserva: Reserva) => void
}

function FormularioReserva({ habitacion, onCerrar, onReservaConfirmada }: FormularioReservaProps) {
    const [nombreHuesped, setNombreHuesped] = useState<string>("")
    const [fechaCheckIn, setFechaCheckIn] = useState<string>("")
    const [fechaCheckOut, setFechaCheckOut] = useState<string>("")
    const [cantidadHuespedes, setCantidadHuespedes] = useState<number>(1)
    const [error, setError] = useState<string | null>(null)
    const [reservaExitosa, setReservaExitosa] = useState<boolean>(false)

    const noches = fechaCheckIn && fechaCheckOut
        ? Math.ceil((new Date(fechaCheckOut).getTime() - new Date(fechaCheckIn).getTime()) / (1000 * 60 * 60 * 24))
        : 0

    const precioTotal = noches > 0 ? noches * habitacion.precioPorNoche : 0

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!nombreHuesped || !fechaCheckIn || !fechaCheckOut || !cantidadHuespedes) {
            setError("Por favor, complete todos los campos.")
            return
        }

        if (new Date(fechaCheckOut) <= new Date(fechaCheckIn)) {
            setError("La fecha del check out debe ser posterior al de check in")
            return
        }

        if (cantidadHuespedes > habitacion.capacidad) {
            setError("La cantidad de huespedes no puede superar la capacidad de la habitacion")
            return
        }

        if (cantidadHuespedes < 1) {
            setError("La cantidad de huespedes debe ser al menos 1")
            return
        }

        setError(null)
        setReservaExitosa(true)
        const nuevaReserva: Reserva = {
            id: Date.now(),
            habitacionId: habitacion.id,
            nombreHuesped,
            fechaCheckIn,
            fechaCheckOut,
            cantidadHuespedes,
            precioTotal
        }
        onReservaConfirmada(nuevaReserva)
    }

    if (reservaExitosa) {
        return (
            <div className="relative w-80 rounded-xl bg-emerald-50 p-6 text-center shadow-md">
                <button
                    onClick={onCerrar}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
                    aria-label="Cerrar"
                >
                    ✕
                </button>
                <p className="text-lg font-semibold text-emerald-700">
                    ¡Reserva confirmada para {nombreHuesped}!
                </p>
            </div>
        )
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex w-80 flex-col gap-3 rounded-xl bg-white p-6 shadow-md"
        >
            <button
                type="button"
                onClick={onCerrar}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
                aria-label="Cerrar"
            >
                ✕
            </button>
            <h2 className="text-lg font-bold text-gray-900">Reservar {habitacion.nombre}</h2>

            <input
                type="text"
                value={nombreHuesped}
                onChange={(e) => setNombreHuesped(e.target.value)}
                placeholder="Nombre del huesped"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
            <input
                type="date"
                value={fechaCheckIn}
                onChange={(e) => setFechaCheckIn(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
            <input
                type="date"
                value={fechaCheckOut}
                onChange={(e) => setFechaCheckOut(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />
            <input
                type="number"
                value={cantidadHuespedes}
                onChange={(e) => setCantidadHuespedes(Number(e.target.value))}
                placeholder="Cantidad de huespedes"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            />

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <p className="border-t border-gray-100 pt-3 text-sm text-gray-600">
                Noches: <span className="font-semibold text-gray-900">{noches}</span>
            </p>
            <p className="text-sm text-gray-600">
                Precio total: <span className="text-lg font-bold text-gray-900">${precioTotal}</span>
            </p>

            <button
                type="submit"
                className="mt-2 w-full bg-sky-600 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
                Confirmar reserva
            </button>
        </form>
    )
}
export default FormularioReserva