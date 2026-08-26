export interface Habitacion {
  id: number;
  nombre: string;
  tipo: "individual" | "doble" | "suite";
  precioPorNoche: number;
  capacidad: number;
  imagenUrl: string;
  descripcion: string;
}