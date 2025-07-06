import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Receipt.css";

export default function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No payment data available.</p>;

  const { payment_id, order_id, signature, cart, total } = state;

  return (
    <div className="receipt-container">
      <h1>🧾 Payment Receipt</h1>

      <h3>🧾 Payment Details</h3>
      <p><strong>Payment ID:</strong> {payment_id}</p>
      <p><strong>Order ID:</strong> {order_id}</p>
      <p><strong>Signature:</strong> {signature}</p>

      <h3>🛒 Purchased Products</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ product, qty }) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{qty}</td>
              <td>₹{product.price}</td>
              <td>₹{qty * product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total Paid: ₹{total}</h2>
      <button onClick={() => navigate("/Customer")}>Back to Products</button>
    </div>
  );
}
