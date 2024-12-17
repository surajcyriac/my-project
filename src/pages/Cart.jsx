import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SERVER_URL from '../services/serverUrl';
import { addPurchaseAPI, deleteCartAPI, getCartAPI, updateCartQuantityAPI } from '../services/allapi';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await getCartAPI(reqHeader);
        if (response.status === 200) {
          setCart(response.data);
        }else if(response.status==404){
          setCart("");

        }
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    }
  };

  // Remove an item from the cart
  const handleRemove = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const reqBody = { productId }; // Send productId in the body

      try {
        const response = await deleteCartAPI(reqBody, reqHeader);
        if (response.status === 200) {
          setRefresh(!refresh);
        }
      } catch (error) {
        console.error("Error deleting cart item:", error);
      }
    }
  };

  // Update quantity of a cart item
  // const handleUpdateQuantity = async (productId, newQuantity) => {
  //   if (newQuantity <= 0) return; // Prevent negative or zero quantity

  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     const reqHeader = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const reqBody = { productId, quantity: newQuantity };

  //     try {
  //       const response = await updateCartQuantityAPI(reqBody, reqHeader);
  //       if (response.status === 200) {
  //         setRefresh(!refresh);
  //       }
  //     } catch (error) {
  //       console.error("Error updating cart quantity:", error);
  //     }
  //   }
  // };

// purchase item
const handleAddToPurchases = async (product_Id) => {
  console.log(product_Id);
  const productId = product_Id;
  const reqBody = { "productId": productId, "quantity": 1 }; // Default quantity is set to 1
  console.log(reqBody);
  const token = sessionStorage.getItem("token");

  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
    try {
      // Call the Add to Purchases API
      const result = await addPurchaseAPI(reqBody, reqHeader);
      if (result.status === 200) {
        alert("Successfully added to purchases!");
      } else if (result.status === 406) {
        alert("Product already exists in purchases!");
      }
    } catch (err) {
      alert("Error adding to purchases.");
      console.log(err);
    }
  } 
};


console.log("items got",cart);




  return (
    <div>
      <Header />
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Your Cart</h2>
        <div className="space-y-6">
          {cart.length == 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-wrap items-center justify-between border rounded-lg p-4 shadow-md bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${SERVER_URL}/uploads/${item.productId.productimg}`}
                    alt={item.productId.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.productId.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.productId.description}
                    </p>
                    {/* <h4 className="text-red-600 font-bold text-lg mt-2">
                      ₹{item.productId.price}
                    </h4> */}
                    {/* <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className='border-solid d-flex justify-evenly mt-2'>
                <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
      onClick={() => handleAddToPurchases(item.productId._id)}
    >
      Get now
    </button>
                  <button
                    onClick={() => handleRemove(item.productId._id)}
                    className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
