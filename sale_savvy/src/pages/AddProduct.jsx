import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AddProduct.css'; // ✅ Link CSS file

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const product = {
      name,
      description,
      rate,
      category,
      image
    };

    try {
      const response = await fetch("http://localhost:8080/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");
      navigate("/admin/productmanagement");

    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  return (
    <div className="product-form-page">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <label>Product Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Product Description</label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Product Rate</label>
        <input
          type='text'
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />

        <label>Product Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Sports">Sports</option>
        </select>

        <label>Product Image URL</label>
        <input
          type='text'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
}
