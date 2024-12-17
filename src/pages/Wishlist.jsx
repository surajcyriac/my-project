import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { deleteWishlistAPI, getWishlistAPI } from '../services/allapi';
import SERVER_URL from '../services/serverUrl';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [check,setcheck]=useState(true)

  useEffect(() => {
    fetchFavorites();
  }, [check]);

  const fetchFavorites = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
setcheck(true)
      try {
        const response = await getWishlistAPI(reqHeader);
        setWishlist(response.data);
      } catch (error) {
        console.log("Error fetching favorites:", error);
      }
    }
  };

  // Remove an item from the wishlist
  const handleRemove = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
  
      const reqBody = { productId }; // Send productId in the body
  
      try {
        // Call the delete API
        const response = await deleteWishlistAPI(reqBody, reqHeader);
        if(response.status==200){
          setcheck(false)
        }
        // Update the local wishlist state to remove the deleted item
      } catch (error) {
        console.error("Error deleting wishlist item:", error);
      }
    }
  };
  
  console.log("items got",wishlist);
  
  return (
    <div>
      <Header />
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Your Wishlist</h2>
        <div className="space-y-6">
          {wishlist.length === 0 ? (
            <p className="text-gray-600">Your wishlist is empty.</p>
          ) : (
            wishlist.map((item) => (
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
                  </div>
                </div>
                <div className='mt-2'>
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

export default Wishlist;
