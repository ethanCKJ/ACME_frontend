import React, { createContext, ReactNode, useState, SetStateAction, useEffect, useContext } from "react";

// 1. Content provided by the context
export interface CheckoutData {
    name: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    postcode: string,
}

interface CheckoutContextInterface {
    name: string,
    setName: React.Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: React.Dispatch<SetStateAction<string>>,
    addressLine1: string,
    setAddressLine1: React.Dispatch<SetStateAction<string>>,
    addressLine2: string,
    setAddressLine2: React.Dispatch<SetStateAction<string>>,
    addressLine3: string,
    setAddressLine3: React.Dispatch<SetStateAction<string>>,
    postcode: string,
    setPostcode: React.Dispatch<SetStateAction<string>>,
}

// 2. create context
export const CheckoutContext = createContext<CheckoutContextInterface | undefined>(undefined)

function useLocalStorageState<T>(key: string, defaultValue: T){
    const [state, setState] = useState<T>(() => {
        const value = localStorage.getItem(key)
        if (value){
            return JSON.parse(value);
        }
        return defaultValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])
    return [state, setState] as const
}

// 3. export Provider component
export const CheckoutProvider = ({children} : {children : ReactNode}) => {
    const [name, setName] = useLocalStorageState("name", "")
    const [email, setEmail] = useLocalStorageState("email", "")
    const [addressLine1, setAddressLine1] = useLocalStorageState("addressLine1", "")
    const [addressLine2, setAddressLine2] = useLocalStorageState("addressLine2", "")
    const [addressLine3, setAddressLine3] = useLocalStorageState("addressLine3", "")
    const [postcode, setPostcode] = useLocalStorageState("postcode", "")
    return <CheckoutContext.Provider value={{
        name,
        setName,
        email,
        setEmail,
        addressLine1,
        setAddressLine1,
        addressLine2,
        setAddressLine2,
        addressLine3,
        setAddressLine3,
        postcode,
        setPostcode
    }}>{children}</CheckoutContext.Provider>
}

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (context === undefined){
        throw Error("You must be under <CheckoutContext></CheckoutContext>")
    }
    return context;
}
