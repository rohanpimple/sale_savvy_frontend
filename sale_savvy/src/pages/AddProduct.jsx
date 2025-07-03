import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
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
    <div>
      <form onSubmit={handleSubmit}>

        <h2>Add Product</h2>

        <label>Product Name</label><br />
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        <br /><br />

        <label>Product Description</label><br />
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br /><br />

        <label>Product Rate</label><br />
        <input type='text' value={rate} onChange={(e) => setRate(e.target.value)} required />
        <br /><br />

        <label>Product Category</label><br />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">-- Select Category --</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Books">Books</option>
        <option value="Home Appliances">Home Appliances</option>
        <option value="Sports">Sports</option>
       </select>
       <br /><br />


        <label>Product Image URL</label><br />
        <input type='text' value={image} onChange={(e) => setImage(e.target.value)} required />


        <button type='submit'>Add Product</button>

      </form>
    </div>
  );
}
