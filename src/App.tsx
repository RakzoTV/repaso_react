import Cart from "./components/Cart"
import Header from "./components/Header"
import ProductList from "./components/ProductList"
import { CartProvider } from "./context/CartContext"


function App() {

  return (
    <>
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header/>
        <main className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="mb-6 text-2xl font-bold">Productos</h2>
          <ProductList />
        </main>
        <Cart/>
      </div>
    </CartProvider>
      
    </>
  )
}

export default App
