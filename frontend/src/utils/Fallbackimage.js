// Imagen de respaldo (placeholder) para cuando un producto no tiene
// imagen, o la que tiene ya no carga (path viejo, url rota, etc).
// Se usa en cualquier lugar donde se muestre product.image / item.image directamente.
export const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="100%" height="100%" fill="#e5e0d8"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="14"
        fill="#9a8f7e" text-anchor="middle" dominant-baseline="middle">
        Sin imagen
      </text>
    </svg>`
  );

// Handler listo para pegar en el onError de cualquier <img>:
// onError={handleImageError}
export function handleImageError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMAGE;
}


// Convierte una ruta como "/cafe1.jpg" (guardada así en products.js)
// en la ruta real donde vive el archivo servido, tomando en cuenta el
// "base" de Vite (necesario en GitHub Pages, donde el sitio no vive en
// la raíz del dominio sino en /Kopi-coffee/).
// Deja intactas las URLs completas (http/https) o los data:URI.
export function resolveImage(path) {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}