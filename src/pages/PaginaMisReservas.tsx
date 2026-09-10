import { useNavigate } from "react-router-dom";
import type { Reserva } from "../types/types";

interface PaginaMisReservasProps {
    reservas: Reserva[]
    eliminarReserva: (id: number) => void
}

function PaginaMisReservas({ reservas, eliminarReserva }: PaginaMisReservasProps) {

    const navigate = useNavigate();

    if (reservas.length === 0) {
        return (
            <div className="mx-auto max-w-4xl p-6">
                <button
                    onClick={() => navigate("/")}
                    className="mb-4 text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                    ← Volver
                </button>
                <p className="py-12 text-center text-gray-500">No tienes reservas</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
            <button
                onClick={() => navigate("/")}
                className="mb-4 text-sm font-semibold text-sky-700 hover:text-sky-900"
            >
                ← Volver
            </button>
            <h1 className="mb-4 text-2xl font-bold text-gray-900">Mis Reservas</h1>

            <div className="overflow-x-auto rounded-xl bg-white shadow-md">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                            <th className="px-4 py-3">ID Reserva</th>
                            <th className="px-4 py-3">ID Habitacion</th>
                            <th className="px-4 py-3">Nombre huesped</th>
                            <th className="px-4 py-3">Check In</th>
                            <th className="px-4 py-3">Check Out</th>
                            <th className="px-4 py-3">Cantidad</th>
                            <th className="px-4 py-3">Precio Total</th>
                            <th className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservas.map((r) => (
                            <tr key={r.id} className="border-b border-gray-100 last:border-0">
                                <td className="px-4 py-3 text-gray-500">{r.id}</td>
                                <td className="px-4 py-3 text-gray-500">{r.habitacionId}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{r.nombreHuesped}</td>
                                <td className="px-4 py-3 text-gray-600">{r.fechaCheckIn}</td>
                                <td className="px-4 py-3 text-gray-600">{r.fechaCheckOut}</td>
                                <td className="px-4 py-3 text-gray-600">{r.cantidadHuespedes}</td>
                                <td className="px-4 py-3 font-semibold text-gray-900">${r.precioTotal}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => eliminarReserva(r.id)}
                                        className="rounded-md bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaginaMisReservas;