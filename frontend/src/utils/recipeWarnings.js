// Etiquetas legibles para cada grupo "variable" de una receta.
export const GROUP_LABELS = {
    milks: "Leche",
    coffeeOptions: "Tipo de café",
    infusionOptions: "Infusión",
    flavors: "Sabor",
};


function getGroupValues(catalog, group) {

    if (group === "flavors") {
        return Object.values(catalog.flavorGroups).flat();
    }

    return catalog[group] || [];

}

export function getRecipeWarnings(product, catalog, inventory) {

    const warnings = [];

    if (!product?.recipe?.length) return warnings;

    product.recipe.forEach(line => {

        if (line.type === "variable") {

            const values = getGroupValues(catalog, line.group);
            const links = catalog.inventoryLinks?.[line.group] || {};
            const unlinked = values.filter(v => !links[v]);

            if (unlinked.length > 0) {
                warnings.push(
                    `${GROUP_LABELS[line.group] || line.group} sin vincular: ${unlinked.join(", ")}`
                );
            }

        } else {

            const exists = inventory.some(i => i.id === line.inventoryItemId);

            if (!exists) {
                warnings.push("Un insumo fijo de la receta ya no existe en Inventario.");
            }

        }

    });

    return warnings;

}

export function hasRecipeWarnings(product, catalog, inventory) {
    return getRecipeWarnings(product, catalog, inventory).length > 0;
}