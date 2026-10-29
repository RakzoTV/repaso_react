import { createContext, useContext, useReducer, useState, type ReactNode } from "react";
import type { CarritoItem, Producto } from "../types";

type CartAction =
    | { type: "añadir_item"; producto: Producto }
    | { type: "remover_item"; id: number }
    | { type: "incrementar"; id: number }
    | { type: "decrementar"; id: number }
    | { type: "limpiar" }

function cartReducer(state: CarritoItem[], action: CartAction): CarritoItem[] {
    switch (action.type) {
        case "añadir_item": {
            const exists = state.some((item) => item.id === action.producto.id)
            if (exists) {
                return state.map((item) =>
                    item.id === action.producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                )
            }

            return [...state, { ...action.producto, cantidad: 1 }]
        }
        case "remover_item": {
            return state.filter((item) => item.id !== action.id);
        }

        case "limpiar":
            return [];

        case "incrementar": {
            return state.map((item) =>
                item.id === action.id ? { ...item, cantidad: item.cantidad + 1 } : item)
        }
        case "decrementar": {
            return state.map((item) =>
                item.id === action.id ? { ...item, cantidad: item.cantidad - 1 } : item)
                .filter((item) => item.cantidad > 0)
        }
    }
}

interface CartContextType {
    items: CarritoItem[]
    isOpen: boolean
    totalItems: number
    subtotal: number
    openCart: () => void
    closeCart: () => void
    añadirItem: (producto: Producto) => void
    removerItem: (id: number) => void
    incrementar: (id: number) => void
    decrementar: (id: number) => void
    limpiarCarrito: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, dispatch] = useReducer(cartReducer, [])
    const [isOpen, SetIsOpen] = useState(false);

    const totalItems = items.reduce((total, item) => total + item.cantidad, 0)
    const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0)

    const valor: CartContextType = {
        items,
        isOpen,
        totalItems,
        subtotal,
        openCart: () => SetIsOpen(true),
        closeCart: () => SetIsOpen(false),
        añadirItem: (producto: Producto) => dispatch({ type: "añadir_item", producto }),
        removerItem: (id: number) => dispatch({ type: "remover_item", id }),
        incrementar: (id: number) => dispatch({ type: "incrementar", id }),
        decrementar: (id: number) => dispatch({ type: "decrementar", id }),
        limpiarCarrito: () => dispatch({ type: "limpiar" })
    }

    return <CartContext.Provider value={valor}>{children}</CartContext.Provider>
}

export function useCart(): CartContextType {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider")
    }
    return context
}