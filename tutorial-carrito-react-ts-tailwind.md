# Tutorial: Interfaz de un carrito de compras con React, TypeScript y Tailwind CSS

## Índice

1. [Requisitos](#1-requisitos)
2. [Crear el proyecto con TypeScript](#2-crear-el-proyecto-con-typescript)
3. [Instalar y configurar Tailwind](#3-instalar-y-configurar-tailwind)
4. [Estructura de carpetas](#4-estructura-de-carpetas)
5. [Tipos](#5-tipos)
6. [Datos de ejemplo](#6-datos-de-ejemplo)
7. [Estado del carrito (Context + useReducer)](#7-estado-del-carrito-context--usereducer)
8. [Componente ProductCard](#8-componente-productcard)
9. [Componente ProductList](#9-componente-productlist)
10. [Componente CartItemRow](#10-componente-cartitemrow)
11. [Componente Cart (panel lateral)](#11-componente-cart-panel-lateral)
12. [Header con contador](#12-header-con-contador)
13. [Armar la App](#13-armar-la-app)

---

## 1. Requisitos

- Node.js 18 o superior (`node -v` para verificar).
- Un editor de código (VS Code, por ejemplo).
- Conocimientos básicos de React y TypeScript.

## 2. Crear el proyecto con TypeScript

Usamos Vite con la plantilla `react-ts`:

```bash
npm create vite@latest carrito-react -- --template react-ts
cd carrito-react
npm install
```

## 3. Instalar y configurar Tailwind

Esta guía usa **Tailwind CSS v4**, que se integra con Vite mediante un plugin y no necesita archivo `tailwind.config.js`.

**1)** Instala Tailwind y el plugin de Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

**2)** Agrega el plugin en `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**3)** Reemplaza **todo** el contenido de `src/index.css` por una sola línea:

```css
@import "tailwindcss";
```

**4)** Borra `src/App.css` (no lo usaremos) y verifica que `src/main.tsx` importe `index.css`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**5)** Levanta el servidor de desarrollo:

```bash
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

## 4. Estructura de carpetas

Dentro de `src/` crea esta estructura:

```
src/
├── components/
│   ├── Cart.tsx
│   ├── CartItemRow.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProductList.tsx
├── context/
│   └── CartContext.tsx
├── data/
│   └── products.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 5. Tipos

Definimos los tipos en un solo lugar. Crea `src/types/index.ts`:

```ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Un ítem del carrito es un producto + una cantidad
export interface CartItem extends Product {
  quantity: number;
}
```

## 6. Datos de ejemplo

Crea `src/data/products.ts`:

```ts
import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Auriculares inalámbricos",
    price: 59.9,
    image: "https://picsum.photos/seed/headphones/400/300",
  },
  {
    id: 2,
    name: "Teclado mecánico",
    price: 89.5,
    image: "https://picsum.photos/seed/keyboard/400/300",
  },
  {
    id: 3,
    name: "Mouse ergonómico",
    price: 34.0,
    image: "https://picsum.photos/seed/mouse/400/300",
  },
  {
    id: 4,
    name: "Monitor 24 pulgadas",
    price: 159.99,
    image: "https://picsum.photos/seed/monitor/400/300",
  },
  {
    id: 5,
    name: "Webcam HD",
    price: 45.0,
    image: "https://picsum.photos/seed/webcam/400/300",
  },
  {
    id: 6,
    name: "Soporte para laptop",
    price: 27.5,
    image: "https://picsum.photos/seed/stand/400/300",
  },
];
```

> **Nota:** la plantilla de Vite activa `verbatimModuleSyntax`, por eso importamos los tipos con `import type { ... }`.

## 7. Estado del carrito (Context + useReducer)

El carrito se necesita en varios lugares (header, lista de productos, panel lateral). Usamos **Context** para compartirlo y **useReducer** para manejar las acciones. Con TypeScript, las acciones se describen como una **unión discriminada**, así el compilador te avisa si olvidas un caso o escribes mal un campo.

Crea `src/context/CartContext.tsx`:

```tsx
import { createContext, useContext, useReducer, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "../types";

// ---------- Acciones ----------
type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "INCREASE"; id: number }
  | { type: "DECREASE"; id: number }
  | { type: "CLEAR" };

// ---------- Reducer ----------
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.some((item) => item.id === action.product.id);
      if (exists) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }

    case "INCREASE":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case "DECREASE":
      return state
        .map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        // si la cantidad llega a 0, se elimina el producto
        .filter((item) => item.quantity > 0);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id);

    case "CLEAR":
      return [];
  }
}

// ---------- Tipo del contexto ----------
interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ---------- Provider ----------
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);

  // Valores derivados
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value: CartContextValue = {
    items,
    isOpen,
    totalItems,
    subtotal,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    increase: (id) => dispatch({ type: "INCREASE", id }),
    decrease: (id) => dispatch({ type: "DECREASE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ---------- Hook personalizado ----------
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return context;
}
```

**¿Qué hace cada parte?**

- `CartAction`: lista cerrada de acciones válidas. Si en el `switch` falta un caso, TypeScript marca error porque la función no devolvería siempre un `CartItem[]`.
- `cartReducer`: recibe el estado actual y una acción, y devuelve el nuevo estado.
- `CartContextValue`: describe todo lo que expone el carrito. El valor inicial es `null`, y `useCart` lo valida para que el resto de la app trabaje sin `null`.

> Si ESLint avisa con `react-refresh/only-export-components` por exportar el Provider y el hook en el mismo archivo, es una advertencia de Fast Refresh y no afecta el funcionamiento. Si te molesta, mueve `useCart` a `src/hooks/useCart.ts` y exporta `CartContext` desde el archivo del Provider.

## 8. Componente ProductCard

Crea `src/components/ProductCard.tsx`:

```tsx
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="block h-44 w-full object-cover"
      />

      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-semibold text-slate-900">{product.name}</h3>
        <p className="font-bold text-indigo-600">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addItem(product)}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
```

## 9. Componente ProductList

Crea `src/components/ProductList.tsx`:

```tsx
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
```

La grilla es responsive: 1 columna en móvil, 2 en pantallas `sm` y 3 en `lg`.

## 10. Componente CartItemRow

Cada fila del carrito: imagen, nombre, controles de cantidad y botón para eliminar.

Crea `src/components/CartItemRow.tsx`:

```tsx
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { increase, decrease, removeItem } = useCart();

  return (
    <li className="flex gap-3 border-b border-slate-200 pb-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-[72px] w-[72px] rounded-lg object-cover"
      />

      <div className="flex flex-1 flex-col gap-1.5">
        <h4 className="text-sm font-medium text-slate-900">{item.name}</h4>
        <p className="font-bold text-indigo-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => decrease(item.id)}
            aria-label={`Quitar una unidad de ${item.name}`}
            className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-base leading-none hover:bg-slate-100"
          >
            −
          </button>
          <span className="w-4 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => increase(item.id)}
            aria-label={`Agregar una unidad de ${item.name}`}
            className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-base leading-none hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        aria-label={`Eliminar ${item.name}`}
        className="self-start text-slate-400 transition hover:text-red-500"
      >
        ✕
      </button>
    </li>
  );
}
```

## 11. Componente Cart (panel lateral)

Un panel que se desliza desde la derecha, con un fondo oscuro (overlay) detrás. La animación se logra alternando las clases `translate-x-full` y `translate-x-0` junto con `transition-transform`.

Crea `src/components/Cart.tsx`:

```tsx
import { useCart } from "../context/CartContext";
import CartItemRow from "./CartItemRow";

const TAX_RATE = 0.13; // 13% de impuesto de ejemplo

export default function Cart() {
  const { items, isOpen, closeCart, subtotal, clearCart } = useCart();

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <>
      {/* Fondo oscuro: al hacer clic cierra el carrito */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-20 bg-slate-900/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel lateral */}
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
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="mb-2 mt-1 flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700">
                Finalizar compra
              </button>
              <button
                onClick={clearCart}
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
```

## 12. Header con contador

El contador (badge) usa posicionamiento absoluto sobre el botón.

Crea `src/components/Header.tsx`:

```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <h1 className="text-xl font-bold text-slate-900">Mi Tienda</h1>

      <button
        onClick={openCart}
        aria-label="Abrir carrito"
        className="relative text-2xl"
      >
        <FontAwesomeIcon icon={faCartShopping}/>
        {totalItems > 0 && (
          <span className="absolute -right-2.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}
```

instalar el fontawesome:
```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
```

```bash
pnpm add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
```

## 13. Armar la App

Reemplaza `src/App.tsx`:

```tsx
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="mb-6 text-2xl font-bold">Productos</h2>
          <ProductList />
        </main>
        <Cart />
      </div>
    </CartProvider>
  );
}
```

Con esto ya puedes probar: agrega productos, abre el carrito, cambia cantidades y elimina elementos.
