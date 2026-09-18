# Kopi Coffee ☕

Punto de venta para cafetería, hecho como proyecto de TripleTen. Permite a los
clientes explorar el menú, personalizar sus bebidas, pagar con cartera interna
o tarjeta, y a los administradores gestionar todo el negocio: productos,
inventario de insumos (con recetas por bebida), pedidos y usuarios.

## Stack

- **React** 
- **Vite**
- **React Router**
- **Recharts** (gráficas del dashboard admin)
- **React Icons**
- Persistencia actual: `localStorage`

## Funcionalidades

**Cliente**
- Registro / inicio de sesión
- Menú por categorías + buscador en vivo
- Personalización de producto (tamaño, leche, sabor, extras — configurable
  según el tipo de bebida)
- Carrito y checkout (`/pedidos`) con pago en efectivo o con saldo de Cartera
- Cartera: recarga de saldo, pago simulado con tarjeta, historial de movimientos
- Perfil: editar datos, cambiar contraseña, ver mis pedidos

**Administrador** (ruta protegida `/admin`, solo rol `admin`)
- Dashboard con estadísticas y gráfica de ventas
- CRUD de productos, con receta de insumos por bebida (renglones fijos o
  variables, ej. "0.2L de leche según la leche elegida")
- Inventario de insumos (stock, mínimos, alertas de stock bajo)
- Catálogo: vincula cada opción del menú (tipo de leche, sabor, café) a un
  insumo del inventario, para que el descuento de stock sea automático
- Gestión de pedidos y de usuarios
- Reportes


## Backend

Existe un backend (Node + Express + MongoDB) completo y alineado a este
modelo de datos, pero **todavía no está conectado** — el frontend funciona
100% con `localStorage` por ahora.

👨‍💻 Autor

Fredy Alvarez

Ingeniero en Sistemas | Desarrollador Web Full Stack Bootcamp TripleTen

Portfolio: 
https://fredyalvarezz.github.io/Portafolio/

GitHub: 
https://github.com/fredyalvarezz

Live: 
https://fredyalvarezz.github.io/Kopi-coffee/