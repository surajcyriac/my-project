import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addCartAPI, addcommentAPI, addwishlistAPI, SingleproductAPI } from '../services/allapi';
import SERVER_URL from '../services/serverUrl';

const Singleproduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");


  useEffect(() => {
    fetchProduct();
  }, [comment]);

  const fetchProduct = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const response = await SingleproductAPI(id, reqHeader);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddToWishlist = async (productId) => {
    const reqBody = { productId };
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await addwishlistAPI(reqBody, reqHeader);
        if (result.status === 200) {
          alert("Successfully added to wishlist!");
        } else if (result.status === 406) {
          alert("Product already exists in wishlist!");
        }
      } catch (err) {
        alert("Error adding to wishlist.");
        console.log(err);
      }
    }
  };

  const handleAddToCart = async (productId) => {
    const reqBody = { productId, quantity: 1 };
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await addCartAPI(reqBody, reqHeader);
        if (result.status === 200) {
          alert("Successfully added to cart!");
        } else if (result.status === 406) {
          alert("Product already exists in cart!");
        }
      } catch (err) {
        alert("Error adding to cart.");
        console.log(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading product details...</p>
      </div>
    );
  }



  const handleAddComment = async () => {
    const bookId = product._id; // Get product ID from state
    const username = JSON.parse(sessionStorage.getItem("user")).username; // Get username from session storage
    const token = sessionStorage.getItem("token");
  const comments=comment
    // if (!commentText.trim()) {
    //   alert("Comment cannot be empty!");
    //   return;
    // }
  
    if (token) {
      const reqBody = { username, comments }; // Prepare request body
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
  
      try {
        const result = await addcommentAPI(bookId,reqBody,reqHeader);
  
        if (result.status === 200) {
          alert("Comment added successfully!");
setComment("")   
     } else {
          const response = await result.json();
          alert(`Failed to add comment: ${response.message || "Unknown error"}`);
        }
      } catch (err) {
        console.log("Error adding comment:", err);
        alert("Error adding comment. Please try again later.");
      }
    }
  };
  






  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Product Content */}
      <div className="container mx-auto p-6 flex flex-col md:flex-row items-center gap-8">
        {/* Product Image */}
        <div className="w-full md:w-2/5 shadow-2xl rounded-md overflow-hidden" style={{height:"800px"}}>
          <img
            src={`${SERVER_URL}/uploads/${product.productimg}`}
            alt={product.title}
            className="w-full object-cover"
            style={{height:"800px"}}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-3/5 bg-white shadow-lg rounded-lg p-8">
          {/* Title and Genre */}
          <h1 className="text-5xl font-bold text-teal-700 mb-4">{product.title}</h1>
          <p className="text-md text-gray-500 mb-6">Genre: {product.genre}</p>

          {/* Price */}
          {/* <p className="text-4xl font-bold text-teal-800 mb-8">Price: ₹{product.price}</p> */}

          {/* Buttons */}
          <div className="flex justify-start gap-6 mb-12">
            <button
              onClick={() => handleAddToWishlist(product._id)}
              className="bg-blue-500 text-white px-10 py-3 rounded hover:bg-blue-600 text-lg shadow-md transition-transform transform hover:scale-105"
            >
              Add to Wishlist
            </button>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-green-500 text-white px-10 py-3 rounded hover:bg-green-600 text-lg shadow-md transition-transform transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>

          {/* Description Section */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Additional Information */}
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                <strong>Author:</strong> {product.author}
              </p>
              <p>
                <strong>Genre:</strong> {product.genre}
              </p>
              <p>
                <strong>Language:</strong> {product.language}
              </p>
              <p>
                <strong>Publisher:</strong> {product.publisher}
              </p>
            </div>
          </div>
          <div className="mt-6">
            Comments 
            {
              product.comments.length ==0?(
                <p className="text-gray-600">No comments yet.</p>

              ):(
                product.comments.map((item) => (
                <div key={item._id}
>
           <div className="flex flex-col flex-wrap  items-start   m-3 shadow-md bg-gray-50" >
                 <h6 className=" font-light text-gray-800 font-mono p-2">
                        {item.username} :
                      </h6>
                      <h6 className='text-lg ps-4'> {item.comments}</h6>
                    
                  </div>
                </div>
              
                ))

              )
            }
            
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleAddComment}
        className="mt-2 bg-teal-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-teal-600"
      >
        Add Comment
      </button>
    </div>
        </div>
        
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Your E-Commerce Site. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Singleproduct;