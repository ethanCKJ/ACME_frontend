import React, { createContext, ReactNode, useState, SetStateAction, useEffect, useContext } from "react";

// 1. Content provided by the context
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
    const [email, setEmail] = useLocalStorageState("name", "")
    const [addressLine1, setAddressLine1] = useLocalStorageState("name", "")
    const [addressLine2, setAddressLine2] = useLocalStorageState("name", "")
    const [addressLine3, setAddressLine3] = useLocalStorageState("name", "")
    const [postcode, setPostcode] = useLocalStorageState("name", "")
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
