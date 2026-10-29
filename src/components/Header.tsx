import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCart } from "../context/CartContext";

export default function Header() {
    const { totalItems, openCart } = useCart()

    return (
        <>
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
                <h1 className="text-xl font-bold text-slate-900">Mi Tienda</h1>
                <button onClick={openCart}
                    aria-label="Abrir carrito"
                    className="relative text-2xl">
                    <FontAwesomeIcon icon={faCartShopping} />{totalItems > 0 && (
                        <span className="absolute -right-2.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                            {totalItems}
                        </span>
                    )}</button>
            </header>
        </>
    )
}