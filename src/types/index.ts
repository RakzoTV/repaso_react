export interface Producto{
    id: number
    nombre: string
    precio: number
    imagen: string
}

export interface CarritoItem extends Producto {
    cantidad: number
}