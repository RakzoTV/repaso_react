import { useCart } from "../context/CartContext";
import CartItemRow from "./CartItemRow";

const tasa_impuesto = 0.13

export default function Cart() {
    const { items, isOpen, closeCart, subtotal, limpiarCarrito } = useCart()

    const impuesto = subtotal * tasa_impuesto
    const total = subtotal + impuesto

    return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-20 bg-slate-900/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-30 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-lg font-bold">Tu carrito</h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 hover:bg-slate-100"
          >
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <p className="m-auto text-slate-500">Tu carrito está vacío</p>
        ) : (
          <>
            <ul className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>

            <footer className="flex flex-col gap-2.5 border-t border-slate-200 p-5">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Impuestos (13%)</span>
                <span>${impuesto.toFixed(2)}</span>
              </div>
              <div className="mb-2 mt-1 flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700">
                Finalizar compra
              </button>
              <button
                onClick={limpiarCarrito}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 font-semibold text-slate-500 transition hover:bg-slate-100"
              >
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );

}