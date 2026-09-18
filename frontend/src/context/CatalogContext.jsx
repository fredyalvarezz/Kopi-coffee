import { createContext, useContext, useState, useEffect } from "react";
import {
    milks as seedMilks,
    coffeeOptions as seedCoffeeOptions,
    infusionOptions as seedInfusionOptions,
    extras as seedExtras,
    flavorGroups as seedFlavorGroups,
} from "../data/productOptions";

const STORAGE_KEY = "cafeteria_catalog";

const CatalogContext = createContext(null);


const emptyInventoryLinks = {
    milks: {},
    coffeeOptions: {},
    infusionOptions: {},
    flavors: {},
};

function loadInitialCatalog() {

    const defaults = {
        milks: seedMilks,
        coffeeOptions: seedCoffeeOptions,
        infusionOptions: seedInfusionOptions,
        extras: seedExtras,
        flavorGroups: seedFlavorGroups,
        inventoryLinks: emptyInventoryLinks,
    };

    try {

        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {

            const parsed = JSON.parse(stored);

            
            return {
                ...defaults,
                ...parsed,
                inventoryLinks: {
                    ...emptyInventoryLinks,
                    ...(parsed.inventoryLinks || {}),
                },
            };

        }

    } catch (err) {
        console.error("No se pudo leer el catálogo guardado:", err);
    }

    return defaults;

}

export function CatalogProvider({ children }) {

    const [catalog, setCatalog] = useState(loadInitialCatalog);

    useEffect(() => {

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
        } catch (err) {
            console.error("No se pudo guardar el catálogo:", err);
        }

    }, [catalog]);


    const addListItem = (listName, value) => {

        const trimmed = value.trim();

        if (!trimmed) return;

        setCatalog(prev => {

            if (prev[listName].includes(trimmed)) return prev; 

            return { ...prev, [listName]: [...prev[listName], trimmed] };

        });

    };

    const removeListItem = (listName, value) => {

        setCatalog(prev => ({
            ...prev,
            [listName]: prev[listName].filter(item => item !== value),
        }));

    };


    const addExtra = (extra) => {

        const name = extra.name.trim();

        if (!name) return;

        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        setCatalog(prev => {

            if (prev.extras.some(e => e.id === id)) return prev; // ya existe

            return {
                ...prev,
                extras: [...prev.extras, {
                    id,
                    name,
                    price: Number(extra.price) || 0,
                      inventoryItemId: extra.inventoryItemId ? Number(extra.inventoryItemId) : null,
                    amount: extra.amount ? Number(extra.amount) : 0,
                }],
            };

        });

    };

    const updateExtra = (id, updates) => {

        setCatalog(prev => ({
            ...prev,
            extras: prev.extras.map(e => (e.id === id ? { ...e, ...updates } : e)),
        }));

    };

    const removeExtra = (id) => {

        setCatalog(prev => ({
            ...prev,
            extras: prev.extras.filter(e => e.id !== id),
        }));

    };


    const addFlavor = (group, value) => {

        const trimmed = value.trim();

        if (!trimmed) return;

        setCatalog(prev => {

            const current = prev.flavorGroups[group] || [];

            if (current.includes(trimmed)) return prev; // ya existe

            return {
                ...prev,
                flavorGroups: { ...prev.flavorGroups, [group]: [...current, trimmed] },
            };

        });

    };

    const removeFlavor = (group, value) => {

        setCatalog(prev => ({
            ...prev,
            flavorGroups: {
                ...prev.flavorGroups,
                [group]: (prev.flavorGroups[group] || []).filter(item => item !== value),
            },
        }));

    };


    const addFlavorGroup = (groupName) => {

        const key = groupName.trim().toLowerCase().replace(/\s+/g, "-");

        if (!key) return;

        setCatalog(prev => {

            if (prev.flavorGroups[key]) return prev; // ya existe

            return { ...prev, flavorGroups: { ...prev.flavorGroups, [key]: [] } };

        });

    };


    const setInventoryLink = (category, value, inventoryItemId) => {

        setCatalog(prev => ({
            ...prev,
            inventoryLinks: {
                ...prev.inventoryLinks,
                [category]: {
                    ...prev.inventoryLinks[category],
                    [value]: inventoryItemId ? Number(inventoryItemId) : null,
                },
            },
        }));

    };

    return (
        <CatalogContext.Provider
            value={{
                catalog,
                addListItem,
                removeListItem,
                addExtra,
                updateExtra,
                removeExtra,
                addFlavor,
                removeFlavor,
                addFlavorGroup,
                setInventoryLink,
            }}
        >
            {children}
        </CatalogContext.Provider>
    );

}

export function useCatalog() {

    const context = useContext(CatalogContext);

    if (!context) {
        throw new Error("useCatalog debe usarse dentro de un <CatalogProvider>");
    }

    return context;

}