import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {STANDARD_DELIVERY_FEE} from "../utils/constants";
import {ProductCategory} from "../components/global/types";

export type cartObj = {
  productId: number
  productName: string
  imageName: string
  quantity: number
  price: number
  productCategory: ProductCategory
}

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
}

// 2. createContext call
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Implementing the const items provided by the context in ContextProvider
export const CartProvider = ({children}: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(() => {
    const storedCount = localStorage.getItem("cartCount")
    if (storedCount) {
      return JSON.parse(storedCount)
    }
    return 0
  })

  const [cartContent, setCartContent] = useState<cartObj[]>(() => {
    const storedContent = localStorage.getItem("cartContent")
    if (storedContent) {
      return JSON.parse(storedContent)
    }
    return []
  })

  const [deliveryFee, setDeliveryFee] = useState<number>(() => {
    const storedContent = localStorage.getItem("deliveryFee")
    if (storedContent) {
      return JSON.parse(storedContent)
    }
    return STANDARD_DELIVERY_FEE;
  })

  const addToCart = (product: cartObj) => {
    let updatedExisting = false
    let indexToDelete = -1
    const newCartContent = cartContent.map((item, index) => {
      if (item.productId === product.productId) {
        // shallow copy only one item. shallow copying is sufficient given cartObj is made of primitives.
        let newItem = {...item}
        newItem.quantity += product.quantity;
        if (newItem.quantity <= 0) {
          console.log("This should not be possible")
          indexToDelete = index;
        }
        updatedExisting = true;
        return newItem;
      }
      return item;
    })
    if (updatedExisting) {
      if (indexToDelete !== -1) {
        newCartContent.splice(indexToDelete, 1)
        setCartCount(cartCount => cartCount -= 1);
      }
    } else {
      if (product.quantity > 0) {
        newCartContent.push({
          productId: product.productId,
          productName: product.productName,
          quantity: product.quantity,
          price: product.price,
          imageName: product.imageName,
          productCategory: product.productCategory
        })
        setCartCount(cartCount => cartCount += 1);
      }
    }
    setCartContent(newCartContent)
  }

  /**
   * Given id of a product in the shopping cart, adjust the quantity of the product and remove if necessary
   * @param targetProductId
   * @param newQuantity
   */
  const adjustQuantityById = (targetProductId: number, newQuantity: number) => {
    const newCartContent: cartObj[] = []
    for (let i = 0; i < cartContent.length; i++) {
      const currentItem = cartContent[i];
      if (currentItem.productId === targetProductId) {
        // Product with updated quantity. If quantity set to 0 then product is deleted.
        if (newQuantity > 0) {
          newCartContent.push({...currentItem, quantity: newQuantity});
        }

      } else {
        newCartContent.push(currentItem)
      }
    }
    setCartContent(newCartContent);
    setCartCount(newCartContent.length);
  }

  // write back in application state to localStorage
  useEffect(() => {
    localStorage.setItem("cartContent", JSON.stringify(cartContent))
  }, [cartContent])

  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount))
  }, [cartCount])

  useEffect(() => {
    localStorage.setItem("deliveryFee", JSON.stringify(deliveryFee))
  }, [deliveryFee])
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
  )
}

// 5. The useContext function and wrapper
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be called within a CartProvider')
  }
  return context;
}
// Only export the Provider and useContext wrapper.