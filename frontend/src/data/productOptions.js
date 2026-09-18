export const coffeeOptions = [
  "Expresso",
  "Descafeinado",
];


export const infusionOptions = [
  "Chai",
  "Té Negro",
];

export const productTypes = [
  "Café",
  "Frappé",
  "Postre",
  "Infusiones",
  "Especialidad", 
];


export const menuCategories = [
  "Calientes",
  "Frías",
  "Frappés",
  "Temporada",
  "Postres",
];


export const menuCategoriesByProductType = {
  "Café": ["Calientes", "Frías", "Temporada"],
  "Frappé": ["Frappés"],
  "Postre": ["Postres"],
  "Infusiones": ["Calientes", "Frías", "Temporada"],
  "Especialidad": ["Calientes", "Frías", "Frappés", "Temporada"],
};

export const sizes = [
  "Chico",
  "Mediano",
  "Grande",
];


export const flavorGroups = {
  coffee: [
    "Regular",
    "Vainilla",
    "Caramelo",
    "Avellana",
    "Chocolate",
    "Mocha",
  ],
  infusiones: [
    "Regular",
    "Vainilla",
    "Canela",
    "Miel",
  ],
  
};

export const milks = [
  "Entera",
  "Deslactosada",
  "Light",
  "Almendra",
  "Avena",
  "Coco",
  "Sin leche",
];


export const preparationOptions = [
  "Caliente",
  "Frío",
  "Frappé",
];

export const extras = [
  { id: "shot", name: "Extra Shot", price: 15 },
  { id: "whippedCream", name: "Crema Batida", price: 10 },
  { id: "foam", name: "Espuma Extra", price: 0 },
  { id: "splenda", name: "Splenda", price: 0 },
  { id: "stevia", name: "Stevia", price: 0 },
  { id: "mascabado", name: "Mascabado", price: 0 },
  { id: "canela", name: "Canela", price: 0 },
];

export const productTypeConfig = {
  "Café": {
    coffee: true,
    sizes: true,
    milks: true,
    flavors: "coffee",
    extras: true,
  },
  "Frappé": {
    coffee: false,
    sizes: true,
    milks: true,
    flavors: "coffee",
    extras: true,
  },
  "Postre": {
    coffee: false,
    sizes: false,
    milks: false,
    flavors: false,
    extras: true,
  },
  "Infusiones": {
    coffee: false,
    infusionType: true,  
    coffeeToggle: true,  
    sizes: true,
    milks: true,
    flavors: "infusiones",
    extras: true,
  },
  "Especialidad": {
    coffee: false,
    sizes: true,
    milks: true,
    flavors: false,
    extras: true,
  },
};


export const defaultProductTypeConfig = {
  coffee: false,
  infusionType: false,
  coffeeToggle: false,
  sizes: false,
  milks: false,
  flavors: false,
  extras: false,
};
