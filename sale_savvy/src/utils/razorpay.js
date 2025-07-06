export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOptions = ({ total, orderId, onSuccess }) => ({
  key: "rzp_test_WisL1JpTTsUJS4", // your test key
  amount: total * 100,
  currency: "INR",
  name: "Sale Savvy",
  description: "Order Payment",
  order_id: orderId,
  handler: function (response) {
    onSuccess(response); // send payment details back
  },
  prefill: {
    name: "Test User",
    email: "test@example.com",
    contact: "9999999999",
  },
  theme: {
    color: "#528FF0",
  },
});
