import { useCart } from "../context/CartContext";
import type { Producto } from "../types";

interface ProductCardProps {
    producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
    const { añadirItem } = useCart()

    return (
        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="block h-44 w-full object-cover"
            />

            <div className="flex flex-col gap-2 p-4">
                <h3 className="font-semibold text-slate-900">{producto.nombre}</h3>
                <p className="font-bold text-indigo-600">${producto.precio.toFixed(2)}</p>
                <button
                    onClick={() => añadirItem(producto)}
                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                >
                    Agregar al carrito
                </button>
            </div>
        </article>
    );
}