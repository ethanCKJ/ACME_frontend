import {NavigateFunction} from "react-router-dom";
import api from "../../../utils/api";
import {Roles} from "../../../types/types";
import {IFormInput} from "../../../pages/account/CustomerSignupPage";
import {CheckoutData} from "../../../contexts/CheckoutContext";
import {CustomJwtPayload} from "../../../contexts/AuthContext";
import {jwtDecode} from "jwt-decode";
import {AxiosError} from "axios";


export interface CreateCustomerProps {
  data: IFormInput;
  navigate: NavigateFunction;
  redirectOnSuccessRoute: string;
  setCheckoutData: (checkoutData: CheckoutData) => void;
  login: (token: string) => void;
}

/**
 * Creates a new customer account, logs in the user, fetches customer profile info and populates checkout context,
 * @param data
 * @param navigate
 * @param location
 * @param setCheckoutData
 * @param login
 */
export const createCustomer = async ({
                                       data,
                                       navigate,
                                       redirectOnSuccessRoute,
                                       setCheckoutData,
                                       login
                                     }: CreateCustomerProps) => {
  try {
    // Create customer account
    const res = await api.post("/signup/customer", {
      customerName: data.customerName,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      addressLine3: data.addressLine3,
      postcode: data.postcode,
      city: data.city,
      username: data.username,
      password: data.password,
    });

    // Auto-login user after account creation and set role
    try {
      const res = await api.post("/token", {
        username: data.username,
        password: data.password,
      });
      const token = res.data;
      login(token);
      const jwt: CustomJwtPayload = jwtDecode(token);
      const currentRole = Roles[jwt.roles ?? "ROLE_CUSTOMER"];

      //If customer, fetch customer profile info and populate checkout context
      if (currentRole === Roles.ROLE_CUSTOMER) {
        try {
          const userRes = await api.get("me/customer_profile_info");
          setCheckoutData({
            customerId: jwt.id,
            email: jwt.sub,
            ...userRes.data,
          });
        } catch (e) {
          alert(e);
        }
      }
    } catch (err) {
      console.error(err);
    }
    alert("Success!");

    // Redirect user back to home page or page they came from
    navigate(redirectOnSuccessRoute);
  } catch (e: AxiosError) {
    if (e.response.data.status && e.response.data.status !== "success") {
      alert("Signup failed. " + e.response.data.debug);
    }
    console.error(e);
  }
}