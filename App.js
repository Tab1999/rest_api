import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://crudcrud.com/api/5a36e4bf62f541d4a18503e0403932a6/products';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    try {
      if (productId) {
        // If productId is provided, update the existing product
         await axios.put(`${apiUrl}/${productId}`, { name: productName, price: productPrice });
       } 
      else {
        // If productId is not provided, add a new product
        await axios.post(apiUrl, { name: productName, price: productPrice });
      }

      setProductName('');
      setProductPrice('');
      setProductId('');
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = products.reduce((total, product) => total + parseFloat(product.price), 0);

  return (
    <div>
      

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProduct();
        }}
      >
        {/* <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        /> */}
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        
        <button type="submit">Add Product</button>
      </form>
         
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>Total Price: <span>{totalPrice}</span></p>
    </div>
  );
};

// export default App;
