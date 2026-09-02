export interface Habitacion {
  id: number;
  nombre: string;
  tipo: "individual" | "doble" | "suite";
  precioPorNoche: number;
  capacidad: number;
  imagenUrl: string;
  descripcion: string;
}

export interface Reserva {
  id: number
  habitacionId: number
  nombreHuesped: string
  fechaCheckIn: string
  fechaCheckOut: string
  cantidadHuespedes: number
  precioTotal: number
}