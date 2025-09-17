import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { STANDARD_DELIVERY_FEE } from "../utils/constants";
import { ProductCategory } from "../types/types";

// Structure of each unique product in the cart
export type cartObj = {
  productId: number;
  productName: string;
  imageName: string;
  quantity: number;
  price: number;
  productCategory: ProductCategory;
  stock: number; // Added stock property
};

// 1. Define the types of the const items provided by the context
type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartContent: cartObj[];
  setCartContent: React.Dispatch<React.SetStateAction<cartObj[]>>;
  addToCart: (product: cartObj) => void;
  adjustQuantityById: (productId: number, newQuantity: number) => void;
  deliveryFee: number;
  setDeliveryFee: React.Dispatch<React.SetStateAction<number>>;
};

// 2. createContext call
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Implementing the const items provided by the context in ContextProvider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Track number of unique items in cart
  const [cartCount, setCartCount] = useState<number>(() => {
    const storedCount = localStorage.getItem("cartCount");
    if (storedCount) {
      return JSON.parse(storedCount);
    }
    return 0;
  });

  // Track the actual content of the cart.
  const [cartContent, setCartContent] = useState<cartObj[]>(() => {
    const storedContent = localStorage.getItem("cartContent");
    if (storedContent) {
      return JSON.parse(storedContent);
    }
    return [];
  });

  // Track selected delivery fee
  const [deliveryFee, setDeliveryFee] = useState<number>(() => {
    const storedContent = localStorage.getItem("deliveryFee");
    if (storedContent) {
      return JSON.parse(storedContent);
    }
    return STANDARD_DELIVERY_FEE;
  });

  /**
   * Add a product to the cart. If product already exists, increase the quantity.
   * @param product
   */
  const addToCart = (product: cartObj) => {
    let updatedExisting = false;
    const newCartContent = cartContent.map((item) => {
      if (item.productId === product.productId) {
        // shallow copy only one item. shallow copying is sufficient given cartObj is made of primitives.
        const newItem = { ...item };
        newItem.quantity = Math.min(product.quantity + item.quantity, item.stock);
        updatedExisting = true;
        return newItem;
      }
      return item;
    });
    // If product does not exist in the cart, add it as a new cart item.
    // Products that exist in the cart only have their quantity incremented.
    if (!updatedExisting && product.quantity > 0) {
      newCartContent.push({
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        imageName: product.imageName,
        productCategory: product.productCategory,
        stock: product.stock, // Include stock when adding new product
      });
      setCartCount((cartCount) => (cartCount += 1));
    }

    setCartContent(newCartContent);
  };

  /**
   * Given id of a product in the shopping cart, adjust the quantity of the product and remove if necessary
   * @param targetProductId
   * @param newQuantity
   */
  const adjustQuantityById = (targetProductId: number, newQuantity: number) => {
    const newCartContent: cartObj[] = [];
    for (let i = 0; i < cartContent.length; i++) {
      const currentItem = cartContent[i];
      // Do not update quantity if attempting to exceed available stock.
      if (currentItem.productId === targetProductId && newQuantity <= currentItem.stock) {
        // Product with updated quantity. If quantity is 0 or less, product is deleted by not including it in the new quantity.
        if (newQuantity > 0) {
          newCartContent.push({ ...currentItem, quantity: newQuantity });
        }
      } else {
        newCartContent.push(currentItem);
      }
    }
    setCartContent(newCartContent);
    setCartCount(newCartContent.length);
  };

  // write back in application state to localStorage
  useEffect(() => {
    localStorage.setItem("cartContent", JSON.stringify(cartContent));
  }, [cartContent]);

  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cartCount]);

  useEffect(() => {
    localStorage.setItem("deliveryFee", JSON.stringify(deliveryFee));
  }, [deliveryFee]);
  // 4. Putting the Implemented consts in value then wrapping the child.
  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartContent,
        setCartContent,
        addToCart,
        adjustQuantityById,
        deliveryFee,
        setDeliveryFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 5. The useContext function and wrapper
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be called within a CartProvider");
  }
  return context;
};
// Only export the Provider and useContext wrapper.
