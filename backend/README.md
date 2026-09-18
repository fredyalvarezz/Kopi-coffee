# Kopi Coffee — Backend

API REST con Node.js, Express, MongoDB (Mongoose), JWT y bcryptjs.
Modelo de datos alineado 1:1 al frontend (products, inventory, orders, users).

**Estado actual: standalone, no conectado al frontend todavía.** El frontend
corre completo con localStorage; este backend queda listo para cuando decidas
migrar la persistencia a una base de datos real.

## Instalación

\`\`\`bash
npm install
cp .env.example .env
\`\`\`

Llena en `.env`: `MONGO_URI` (MongoDB Atlas o local), `JWT_SECRET`,
`CLIENT_URL` (la URL de tu frontend publicado), `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Cargar catálogo inicial

\`\`\`bash
npm run seed
\`\`\`

Crea tu admin inicial y siembra los 23 productos + inventario de insumos,
igual que tu `data/products.js` e `data/inventory.js` actuales.

## Correr el servidor

\`\`\`bash
npm run dev
\`\`\`

Por defecto en `http://localhost:5000`.

## Modelo de datos

- **Product**: `title, description, basePrice, productType, menuCategory,
  image, stock (boolean), customizable, options (objeto libre)`
- **InventoryItem**: `name, unit, stock, minimum`
- **Order**: `customer, user (opcional), items: [{productId, quantity}],
  total, status, paymentStatus`
- **User**: `name, email, password, role (user/barista/admin)`

## Endpoints principales

| Recurso | Rutas |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Usuarios (admin) | `GET/POST /api/users`, `PATCH/DELETE /api/users/:id` |
| Productos | `GET /api/products`, `POST/PUT/DELETE /api/products/:id` (admin) |
| Inventario (admin) | `GET/POST /api/inventory`, `PUT/DELETE /api/inventory/:id` |
| Pedidos | `POST /api/orders`, `GET /api/orders/mine`, `GET /api/orders` (admin/barista), `PATCH /api/orders/:id/status`, `GET /api/orders/dashboard` (admin) |

👨‍💻 Autor

Fredy Alvarez

Ingeniero en Sistemas | Desarrollador Web Full Stack Bootcamp TripleTen

Portfolio: 
https://fredyalvarezz.github.io/Portafolio/

GitHub: 
https://github.com/fredyalvarezz

Live: 
https://fredyalvarezz.github.io/Kopi-caffee/