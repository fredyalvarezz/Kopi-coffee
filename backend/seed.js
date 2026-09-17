// Corre esto UNA VEZ con: npm run seed
// Crea el admin inicial + carga tu catálogo real (tomado de tu
// data/products.js y data/productOptions.js) + tu inventario de insumos
// (tomado de tu data/inventory.js).
require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const InventoryItem = require("./models/InventoryItem");

// --- Igual que tu data/productOptions.js ---
const coffeeOptions = ["Expresso", "Descafeinado"];
const sizes = ["Chico", "Mediano", "Grande"];
const flavorGroups = {
  coffee: ["Regular", "Vainilla", "Caramelo", "Avellana", "Chocolate", "Mocha"],
  infusiones: ["Regular", "Vainilla", "Canela", "Miel"],
};
const preparationOptions = ["Caliente", "Frío", "Frappé"];
const milks = ["Entera", "Deslactosada", "Light", "Almendra", "Avena", "Coco", "Sin leche"];
const extras = [
  { id: "shot", name: "Extra Shot", price: 15 },
  { id: "whippedCream", name: "Crema Batida", price: 10 },
  { id: "foam", name: "Espuma Extra", price: 0 },
  { id: "splenda", name: "Splenda", price: 0 },
  { id: "stevia", name: "Stevia", price: 0 },
  { id: "mascabado", name: "Mascabado", price: 0 },
  { id: "canela", name: "Canela", price: 0 },
];

// --- Igual que tu data/products.js (sin el "id" numérico: Mongo pone su _id) ---
const products = [
  { title: "Latte", description: "Espresso con leche vaporizada.", basePrice: 45, productType: "Café", menuCategory: "Calientes", image: "/cafe1.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, flavors: flavorGroups.coffee, milks, extras } },
  { title: "Capuccino", description: "Espresso con leche vaporizada y espuma cremosa.", basePrice: 55, productType: "Café", menuCategory: "Calientes", image: "/cafe2.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, flavors: flavorGroups.coffee, milks, extras } },
  { title: "Iced Latte", description: "Latte frío servido con hielo.", basePrice: 55, menuCategory: "Frías", productType: "Café", image: "/cafe3.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, flavors: flavorGroups.coffee, milks, extras } },
  { title: "Frappé Mocha", description: "Bebida frappé de café con chocolate.", basePrice: 55, productType: "Frappé", menuCategory: "Frappés", image: "/cafe4.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Pumpkin Latte", description: "Latte con especias y sabor a calabaza.", basePrice: 55, productType: "Café", menuCategory: "Temporada", image: "/cafe5.jpg", stock: false, customizable: true, options: { coffee: coffeeOptions, preparationOptions, sizes, milks, extras } },
  { title: "Espresso", description: "Café espresso intenso y aromático.", basePrice: 25, productType: "Café", menuCategory: "Calientes", image: "/espresso.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes: ["solo", "doble"], extras } },
  { title: "Americano", description: "Espresso diluido con agua caliente.", basePrice: 30, productType: "Café", menuCategory: "Calientes", image: "/americano.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, extras } },
  { title: "Mocha", description: "Espresso con chocolate y leche vaporizada.", basePrice: 55, productType: "Café", menuCategory: "Calientes", image: "/mocha.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Chai Latte", description: "Bebida de té chai con leche vaporizada.", basePrice: 55, productType: "Infusiones", menuCategory: "Calientes", image: "/chai.jpg", stock: true, customizable: true, options: { infusionType: "Chai", containsCoffee: false, sizes, milks, extras } },
  { title: "Dirty Chai Latte", description: "Chai latte con un shot de espresso.", basePrice: 62, productType: "Infusiones", menuCategory: "Calientes", image: "/chai.jpg", stock: true, customizable: true, options: { infusionType: "Chai", containsCoffee: true, coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Taro Latte", description: "Latte preparado con taro de sabor dulce.", basePrice: 55, productType: "Especialidad", menuCategory: "Calientes", image: "/taro.jpg", stock: true, customizable: true, options: { sizes, milks, extras } },
  { title: "Iced Americano", description: "Americano frío servido con hielo.", basePrice: 55, productType: "Café", menuCategory: "Frías", image: "/icedamericano.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, extras } },
  { title: "Cold Brew", description: "Café extraído en frío durante varias horas.", basePrice: 55, productType: "Café", menuCategory: "Frías", image: "/coldbrew.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, extras } },
  { title: "Iced Mocha", description: "Mocha frío con hielo y chocolate.", basePrice: 55, productType: "Café", menuCategory: "Frías", image: "/icedmocha.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Frappé Caramelo", description: "Frappé de café con salsa de caramelo.", basePrice: 55, productType: "Frappé", menuCategory: "Frappés", image: "/frappecaramelo.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Frappé Vainilla", description: "Frappé de café con vainilla.", basePrice: 55, productType: "Frappé", menuCategory: "Frappés", image: "/frappevainilla.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Frappé Oreo", description: "Frappé cremoso con galleta Oreo.", basePrice: 55, productType: "Frappé", menuCategory: "Frappés", image: "/frappeoreo.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Frappé Mazapan", description: "Frappé con el tradicional sabor a mazapán.", basePrice: 55, productType: "Frappé", menuCategory: "Frappés", image: "/frappemazapan.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, sizes, milks, extras } },
  { title: "Peppermint Mocha", description: "Mocha con un refrescante toque de menta.", basePrice: 55, productType: "Café", menuCategory: "Temporada", image: "/Peppermintmocha.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, preparationOptions, sizes, milks, extras } },
  { title: "Cherry Mocha", description: "Mocha con un delicado sabor a cereza.", basePrice: 55, productType: "Café", menuCategory: "Temporada", image: "/Cherrymocha.jpg", stock: true, customizable: true, options: { coffee: coffeeOptions, preparationOptions, sizes, milks, extras } },
  { title: "Cheesecake", description: "Cheesecake estilo Nueva York.", basePrice: 75, productType: "Postre", menuCategory: "Postres", image: "/cheesecake.jpg", stock: true, customizable: false, options: {} },
  { title: "Brownie", description: "Brownie de chocolate con nuez.", basePrice: 45, productType: "Postre", menuCategory: "Postres", image: "/brownie.jpg", stock: true, customizable: false, options: {} },
  { title: "Pay de Limón", description: "Pay de limón casero.", basePrice: 60, productType: "Postre", menuCategory: "Postres", image: "/paylimon.jpg", stock: false, customizable: false, options: {} },
];

// --- Igual que tu data/inventory.js ---
const inventoryItems = [
  { name: "Café Espresso", unit: "kg", stock: 8, minimum: 3 },
  { name: "Leche Entera", unit: "L", stock: 12, minimum: 5 },
  { name: "Jarabe Vainilla", unit: "botellas", stock: 2, minimum: 4 },
];

async function seed() {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`Admin creado: ${adminEmail}`);
  } else {
    console.log("El admin ya existía, no se creó de nuevo.");
  }

  if ((await Product.countDocuments()) === 0) {
    await Product.insertMany(products);
    console.log(`${products.length} productos insertados.`);
  } else {
    console.log("Ya había productos, no se volvió a sembrar el catálogo.");
  }

  if ((await InventoryItem.countDocuments()) === 0) {
    await InventoryItem.insertMany(inventoryItems);
    console.log(`${inventoryItems.length} insumos insertados.`);
  } else {
    console.log("Ya había inventario, no se volvió a sembrar.");
  }

  console.log("Seed completado.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error en el seed:", err);
  process.exit(1);
});
