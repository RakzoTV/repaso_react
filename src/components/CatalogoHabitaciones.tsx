import type { Habitacion } from "../types/types";
import HabitacionCard from "./HabitacionCard";

interface CatalogoHabitacionesProps {
    habitaciones: Habitacion[]
}

function CatalogoHabitaciones({ habitaciones }: CatalogoHabitacionesProps){
    return(
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {habitaciones.map((habitacion) => (
                <HabitacionCard habitacion={habitacion} key={habitacion.id} />
            ))}
        </div>
    )
}

export default CatalogoHabitaciones