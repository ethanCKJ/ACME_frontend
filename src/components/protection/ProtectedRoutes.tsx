import React, {ReactNode} from 'react'
import {TOKEN_KEY} from "../../utils/constants.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Navigate, useLocation} from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode
  allowsRoles: string[]
}

/**
 * Reads token from localStorage. If token is valid allow user to proceed
 * If token is expired or does not exist redirect user to the /login page.
 * @param children
 * @constructor
 */
function ProtectedRoutes({children, allowsRoles} : ProtectedRoutesProps) {
  const token = localStorage.getItem(TOKEN_KEY)
  let authenticated = false;
  const location = useLocation();
  if (token){
    try {
      const decoded= jwtDecode<JwtPayload>(token);
      // decoded.exp is seconds from epoch
      const expMillisecondsFromEpoch = decoded.exp * 1000;
      const roles = decoded.roles;
      if (expMillisecondsFromEpoch && expMillisecondsFromEpoch > Date.now() && allowsRoles.includes(roles)){
        authenticated = true;
      }
    } catch { /* empty */ }
  }
  // replace prevents back arrow bringing use back to previously visited state
  return (
      authenticated ? children : <Navigate to={"/login"} replace state={{from: location}}/>
  )
}

export default ProtectedRoutes
