import {
  createContext,
  useContext,
} from "react";

import { useProducts } from "./ProductsContext";
import { useInventory } from "./InventoryContext";
import { useOrders } from "./OrdersContext";
import { useUsers } from "./UsersContext";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export function AdminProvider({ children }) {

  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const {
    inventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    adjustStock,
  } = useInventory();

  const {
    orders,
    addOrder,
    updateOrderStatus,
    updatePaymentStatus,
  } = useOrders();

  const {
    users,
    registerUser,
    updateUser,
    deleteUser,
  } = useUsers();

  return (
    <AdminContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,

        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        adjustStock,

        orders,
        addOrder,
        updateOrderStatus,
        updatePaymentStatus,

        users,
        registerUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}