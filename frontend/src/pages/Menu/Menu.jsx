import "./Menu.css";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import Card from "../../components/Card/Card";

const CATEGORY_MAP = {
  calientes: "Calientes",
  frias: "Frías",
  frappes: "Frappés",
  temporada: "Temporada",
  postres: "Postres",
};

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const activeCat = searchParams.get("cat") || "calientes";
  const search = searchParams.get("search") || "";

  const setCategory = (cat) => {
    setSearchParams({ cat }); // limpia el search al elegir una categoría a mano
  };

  const clearSearch = () => setSearchParams({ cat: "calientes" });

  const filteredProducts = search
    ? products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : products.filter((product) => product.menuCategory === CATEGORY_MAP[activeCat]);

  return (
    <div className="menu">
      <h2>Nuestro Menú</h2>

      {search ? (
        <div className="menu__search-header">
          <p>Resultados para "<strong>{search}</strong>"</p>
          <button onClick={clearSearch}>Limpiar búsqueda ×</button>
        </div>
      ) : (
        <div className="menu__tabs">
          {Object.keys(CATEGORY_MAP).map((cat) => (
            <button
              key={cat}
              className={activeCat === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {CATEGORY_MAP[cat]}
            </button>
          ))}
        </div>
      )}

      <div className="menu__grid">
        {filteredProducts.length === 0 ? (
          <p className="menu__empty">
            {search ? "No encontramos nada con ese nombre." : "No hay productos en esta categoría."}
          </p>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              basePrice={product.basePrice}
              image={product.image}
              stock={product.stock}
            />
          ))
        )}
      </div>
    </div>
  );
}