import axios from "axios";
import config from "../../config";

export const initialPayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `https://mra-six.vercel.app/payment?transactionId=${paymentData.transactionId}&status=success&userId=${paymentData.userId}`,
      fail_url: `https://mra-six.vercel.app/`,
      cancel_url: "https://mra-six.vercel.app/",
      amount: paymentData.amount,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "Mohakhali DOHS",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_country: "Bangladesh",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during payment initialization:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Payment initialization failed"
    );
  }
};
export const varifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.payment_verification_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: transactionId,
    },
  });
  return response.data;
};
