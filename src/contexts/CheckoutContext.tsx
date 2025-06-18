import React, {createContext, ReactNode, useContext, useEffect, useReducer, useState} from "react";

// 1. Content provided by the context
export interface CheckoutData {
  customerId: number | null;
  customerName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postcode: string;
  city: string;
  phone: string;
}

export const defaultCheckoutData = {
  customerId: null,
  customerName: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  postcode: "",
  city: "",
  phone:""
}

export type Action = { type: "set"; key: string; value: string; } | { type: "reset" }
function reducer(state: CheckoutData, action: Action): CheckoutData {
  switch (action.type) {
    case "set": {
      return { ...state, [action.key]: action.value }
    }
    case "reset": {
      return defaultCheckoutData
    }
  }
}

interface CheckoutContextInterface {
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<any>
}

// 2. create context
export const CheckoutContext = createContext<CheckoutContextInterface | undefined>(undefined)

// 3. export Provider component
export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  // const [checkoutData, dispatchCheckout] = useReducer(reducer, defaultCheckoutData, (defaultData: CheckoutData) => {
  //   let storedData = localStorage.getItem("checkoutData")
  //   if (storedData) {
  //     return JSON.parse(storedData);
  //   }
  //   return defaultData
  // })
  const [checkoutData, setCheckoutData] = useState(() => {
    const storedData = localStorage.getItem("checkoutData")
    if (storedData) {
      return JSON.parse(storedData);
    }
    return defaultCheckoutData;
  });
  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData))
  }, [checkoutData])

  return <CheckoutContext.Provider value={{
    checkoutData,
    setCheckoutData,
  }}>{children}</CheckoutContext.Provider>
}
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw Error("You must be under <CheckoutContext></CheckoutContext>")
  }
  return context;
}
