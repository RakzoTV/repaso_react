import { useCart } from "../context/CartContext";
import type { CarritoItem } from "../types";

interface CartItemRowProps {
    item: CarritoItem
}

export default function CartItemRow({item}: CartItemRowProps) {
    const { incrementar, decrementar, removerItem } = useCart()
    return (
    <li className="flex gap-3 border-b border-slate-200 pb-4">
      <img
        src={item.imagen}
        alt={item.nombre}
        className="h-[72px] w-[72px] rounded-lg object-cover"
      />

      <div className="flex flex-1 flex-col gap-1.5">
        <h4 className="text-sm font-medium text-slate-900">{item.nombre}</h4>
        <p className="font-bold text-indigo-600">
          ${(item.precio * item.cantidad).toFixed(2)}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => decrementar(item.id)}
            aria-label={`Quitar una unidad de ${item.nombre}`}
            className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-base leading-none hover:bg-slate-100"
          >
            −
          </button>
          <span className="w-4 text-center text-sm">{item.cantidad}</span>
          <button
            onClick={() => incrementar(item.id)}
            aria-label={`Agregar una unidad de ${item.nombre}`}
            className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-base leading-none hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removerItem(item.id)}
        aria-label={`Eliminar ${item.nombre}`}
        className="self-start text-slate-400 transition hover:text-red-500"
      >
        ✕
      </button>
    </li>
  );
}