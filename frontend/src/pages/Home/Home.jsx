import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { useInventory } from "../../context/InventoryContext";
import { useWallet } from "../../context/WalletContext";
import Card from "../../components/Card/Card";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products } = useProducts();
  const { inventory } = useInventory();
  const { getBalance } = useWallet();

  // Recomendados: productos disponibles y personalizables, los primeros 4
  const recommended = products
    .filter((p) => p.stock && p.customizable)
    .slice(0, 4);

  const lowStockItems = inventory.filter((i) => i.stock <= i.minimum);

  return (
    <div className="home">
      {/* Header */}
      <header className="home__header">
        <div>
          <h2>{getGreeting()}{user ? `, ${user.name}` : ""}!</h2>
          <p>¿Qué te gustaría tomar hoy?</p>
        </div>

        {user && (
          <button className="home__wallet-pill" onClick={() => navigate("/cartera")}>
            💳 ${getBalance(user.id)}
          </button>
        )}
      </header>

      {/* Panel rápido de Admin */}
      {user?.role === "admin" && (
        <section className="home__admin-panel">
          <div className="home__admin-panel-header">
            <h3>Panel de administración</h3>
            {lowStockItems.length > 0 && (
              <span className="home__admin-alert">
                ⚠️ {lowStockItems.length} insumo(s) con stock bajo
              </span>
            )}
          </div>

          <div className="home__admin-panel-links">
            <button onClick={() => navigate("/admin")}>Dashboard</button>
            <button onClick={() => navigate("/admin")}>Productos</button>
            <button onClick={() => navigate("/admin")}>Inventario</button>
            <button onClick={() => navigate("/admin")}>Pedidos</button>
            <button onClick={() => navigate("/admin")}>Usuarios</button>
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="home__banner">
        <div className="home__banner-card">
          <h2 className="home__banner-card-text">Caramel Cloud</h2>
          <button className="home__banner-card-button" onClick={() => navigate("/menu")}>
            Pedir ahora
          </button>
        </div>
      </section>

      {/* Categorías */}
      <section className="home__section">
        <h3>Categorías</h3>
        <div className="home__section-categorias">
          <button className="home__section-categorias-button" onClick={() => navigate("/menu?cat=calientes")}>Calientes</button>
          <button className="home__section-categorias-button" onClick={() => navigate("/menu?cat=frias")}>Frias</button>
          <button className="home__section-categorias-button" onClick={() => navigate("/menu?cat=frappes")}>Frappes</button>
          <button className="home__section-categorias-button" onClick={() => navigate("/menu?cat=temporada")}>Temporada</button>
          <button className="home__section-categorias-button" onClick={() => navigate("/menu?cat=postres")}>Postres</button>
        </div>
      </section>

      {/* Recomendados */}
      {recommended.length > 0 && (
        <section className="home__section">
          <div className="home__section-header">
            <h3>Recomendados para ti</h3>
            <button className="home__see-all" onClick={() => navigate("/menu")}>Ver todo →</button>
          </div>

          <div className="home__recommended-grid">
            {recommended.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                basePrice={product.basePrice}
                image={product.image}
                stock={product.stock}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}