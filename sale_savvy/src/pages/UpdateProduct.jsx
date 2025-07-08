import React, { useState, useEffect } from 'react';
import '../style/UpdateProduct.css'; 
export default function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/getAllProducts")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error loading products", err));
  }, []);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setId(product.id);
    setName(product.name);
    setDescription(product.description);
    setRate(product.rate);
    setCategory(product.category);
    setImage(product.image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id,
      name,
      description,
      rate,
      category,
      image
    };

    try {
      const response = await fetch("http://localhost:8080/updateProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) throw new Error("Failed to update");

      alert("Product updated!");

      const updated = await fetch("http://localhost:8080/getAllProducts").then(res => res.json());
      setProducts(updated);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Product</h2>

      <div className="product-list">
        <h3>All Products</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.category} - ₹{product.rate}
              <button onClick={() => handleSelect(product)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedProduct && (
        <form className="update-form" onSubmit={handleSubmit}>
          <h3>Editing: {selectedProduct.name}</h3>

          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Rate</label>
          <input type="text" value={rate} onChange={(e) => setRate(e.target.value)} />

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Sports">Sports</option>
          </select>

          <label>Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
}
