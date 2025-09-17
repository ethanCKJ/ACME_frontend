import {useCart} from "../../../contexts/CartContext";
import {useCheckout} from "../../../contexts/CheckoutContext";
import {STANDARD_DELIVERY_FEE, PREMIUM_DELIVERY_FEE} from "../../../utils/constants";
import {cartObj} from "../../../contexts/CartContext";
import api from "../../../utils/api";
import {OrderStatus} from "../../../pages/CheckoutPage";
export interface CreateOrderOptions {
  onSuccess: (response: OrderStatus) => void;
}
/**
 * Custom hook to create an order, clear the cart and clear the checkout form
 */
export const useCreateOrder = ({onSuccess}: CreateOrderOptions) => {
  const {
    cartContent,
    deliveryFee,
    setCartContent,
    setDeliveryFee,
    setCartCount,
  } = useCart();

  const {checkoutData, setCheckoutData} = useCheckout();

  const resetData = () => {
    // Reset data on success
    setCartContent([]);
    setDeliveryFee(STANDARD_DELIVERY_FEE);
    setCartCount(0);
  };
  /**
   * Makes API call to create an order with the current cart and checkout data.
   */
  const createOrder = async () => {
    // Convert delivery free to string
    let deliveryFreeStr = "STANDARD";
    if (deliveryFee == PREMIUM_DELIVERY_FEE) {
      deliveryFreeStr = "PREMIUM";
    }
    // Prepare payload with delivery fee and checkout data (customer data)
    const payload = {
      orderDetails: [] as object[],
      shipping: deliveryFreeStr,
      ...checkoutData,
    };
    // Add each product in cart to payload
    cartContent.forEach((cartObj: cartObj) => {
      const {productId, quantity} = cartObj;
      payload.orderDetails.push({productId, quantity});
    });
    // Send order to backend
    try {
      const res = await api.post("/order", payload);
      alert("Successful Purchase!");
      onSuccess({...res.data, isSuccess: true});
      // Reset cart content, delivery fee.
      resetData();
      // Reset checkout data if customer is checking out as guest.
      if (!checkoutData.customerId) {
        setCheckoutData({
          customerId: null,
          customerName: "",
          email: "",
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          postcode: "",
          city: "",
          phone: "",
        });
      }

    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
  return {createOrder};
}