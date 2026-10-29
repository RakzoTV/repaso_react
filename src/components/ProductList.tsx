import { productos } from "../data/productos.data";
import ProductCard from "./ProductCard";

export default function ProductList(){
    return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </section>
  );
}