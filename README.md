# Kopi Coffee ☕

Punto de venta para cafetería — proyecto de TripleTen. Los clientes exploran
el menú, personalizan sus bebidas, pagan con cartera interna o tarjeta; los
administradores gestionan productos, inventario de insumos (con recetas por
bebida), pedidos y usuarios desde un panel completo.


## Stack

**Frontend**
- React + Vite
- React Router
- Recharts (gráficas del dashboard admin)
- Persistencia actual: `localStorage` (ver sección Backend)

**Backend** (construido, aún no conectado)
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs para autenticación


## Funcionalidades

### Cliente
- Registro e inicio de sesión
- Menú filtrable por categoría, con buscador en vivo
- Personalización de producto: tamaño, leche, sabor y extras, adaptados
  según el tipo de bebida (config-driven, sin tocar código para agregar
  opciones nuevas)
- Carrito → checkout con pago en efectivo o saldo de Cartera
- Cartera: recarga de saldo, pago simulado con tarjeta, historial de movimientos
- Perfil: editar datos, cambiar contraseña, ver historial de pedidos

### Administrador (`/admin`, protegido por rol)
- Dashboard con estadísticas de ventas y top productos
- CRUD de productos, incluyendo receta de insumos por bebida (renglones
  fijos o variables — ej. "0.2 L de leche, según cuál elija el cliente")
- Inventario de insumos con alertas de stock bajo
- Catálogo: vincula cada opción del menú (leche, sabor, café) a un insumo
  del inventario, para que el consumo se descuente automático al vender
- Gestión de pedidos y de usuarios (crear/desactivar admins y baristas)
- Reportes

La app funciona completa sin backend — todo
se persiste en `localStorage` del navegador.

### Cuentas de prueba

| Rol   | Email             | Password |
|-------|-------------------|----------|
| Admin | fredy@kopi.com    | 1234     |
| User  | carlos@gmail.com  | 1234     |


## 👨‍💻 Autor

Fredy Alvarez

Ingeniero en Sistemas | Desarrollador Web Full Stack Bootcamp TripleTen

Portfolio: 
https://fredyalvarezz.github.io/Portafolio/

GitHub: 
https://github.com/fredyalvarezz

Live: 
https://fredyalvarezz.github.io/Kopi-caffee/