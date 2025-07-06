import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css";
import { loadRazorpayScript } from "../utils/loadRazorpayScript";

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCart = location.state?.cart || [];
  const [cart, setCart] = useState(initialCart);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const handleDelete = (id) => setCart((prev) => prev.filter((item) => item.product.id !== id));
  const handleClearCart = () => setCart([]);

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay.");
      return;
    }

    // 1. Get Razorpay Key
    const keyRes = await fetch("http://localhost:8080/get-key", { method: "POST" });
    const key = await keyRes.text();

    // 2. Create Order
    const orderRes = await fetch("http://localhost:8080/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `amount=${total}`,
    });

    const orderData = await orderRes.json();

    // 3. Open Razorpay
    const options = {
      key,
      amount: orderData.amount,
      currency: "INR",
      name: "Sales Savvy",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: function (response) {
        // Redirect to receipt page
        navigate("/receipt", {
          state: {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            cart,
            total,
          },
        });
        setCart([]);
      },
      prefill: {
        name: "Customer Name",
        email: "email@example.com",
        contact: "9999999999",
      },
      theme: { color: "#528FF0" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ product, qty }) => (
                <tr key={product.id}>
                  <td><img src={product.photo} alt={product.name} width="60" /></td>
                  <td>{product.name}</td>
                  <td>{qty}</td>
                  <td>₹{product.price}</td>
                  <td>₹{product.price * qty}</td>
                  <td>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Total: ₹{total}</h2>
          <button onClick={handleClearCart}>Clear Cart</button>
          <button onClick={() => navigate("/Customer")}>Back to Products</button>
          <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
        </>
      )}
    </div>
  );
}
