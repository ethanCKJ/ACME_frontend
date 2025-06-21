import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {Roles} from "../components/global/types";
import {TOKEN_KEY} from "../utils/constants";
import {jwtDecode, JwtPayload} from "jwt-decode";

type AuthContextInterface = {
  authenticated: boolean,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  role: Roles,
  setRole: React.Dispatch<React.SetStateAction<Roles>>,
  logout: () => void,
  login: (token: string) => void,
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export interface CustomJwtPayload extends JwtPayload {
  roles?: "ROLE_CUSTOMER" | "ROLE_ADMIN" | "ROLE_STAFF";
  id?: number;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<Roles>(Roles.UNAUTHENTICATED);
  // Rehydrate authenticated and role
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const jwt: CustomJwtPayload = jwtDecode(token);
      setRole(jwt.roles);
      setAuthenticated(true);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthenticated(false);
    setRole(Roles.UNAUTHENTICATED);
  }
  const login = (token: string) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      const jwt: CustomJwtPayload = jwtDecode(token);
      if (jwt.roles !== undefined){
        setRole(jwt.roles);
      }
      setAuthenticated(true);
    }
  }
  return (<AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        role,
        setRole,
        logout,
        login,
      }}
  >
    {children}
  </AuthContext.Provider>)
}

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be called within a AuthProvider');
  }
  return context;
}