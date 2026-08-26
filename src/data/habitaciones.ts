import type { Habitacion } from "../types/types";
import hab4 from "../assets/habitaciones/hab4.jpg";
import hab2 from "../assets/habitaciones/hab2.jpg";
import hab3 from "../assets/habitaciones/hab3.jpg";

export const habitaciones: Habitacion[] = [
  {
    id: 1,
    nombre: "Habitación Individual Confort",
    tipo: "individual",
    precioPorNoche: 250,
    capacidad: 1,
    imagenUrl: hab4,
    descripcion: "Ideal para viajeros solos, con escritorio y wifi de alta velocidad.",
  },
  {
    id: 2,
    nombre: "Habitación Doble Estándar",
    tipo: "doble",
    precioPorNoche: 400,
    capacidad: 2,
    imagenUrl: hab2,
    descripcion: "Cama matrimonial o dos camas individuales, vista a la ciudad.",
  },
  {
    id: 3,
    nombre: "Suite Presidencial",
    tipo: "suite",
    precioPorNoche: 900,
    capacidad: 4,
    imagenUrl: hab3,
    descripcion: "Sala de estar separada, jacuzzi y vista panorámica.",
  },
];