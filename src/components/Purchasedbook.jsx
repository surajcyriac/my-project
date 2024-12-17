import React, { useEffect, useState } from 'react'
import { getPurchasedAPI } from '../services/allapi';
import SERVER_URL from '../services/serverUrl';

const Purchasedbook = () => {

useEffect(()=>{
    fetchPurchasedBooks()
},[])


    const [purchasedBooks, setPurchasedBooks] = useState([
        // Add more books as needed
       ]);
     
       const fetchPurchasedBooks = async () => {
         const token = sessionStorage.getItem("token");
         if (token) {
           const reqHeader = {
             Authorization: `Bearer ${token}`,
           };
           try {
             const response = await getPurchasedAPI(reqHeader); // Using the previously created API function
             if (response.status === 200) {
               setPurchasedBooks(response.data); // Assuming `setPurchasedBooks` is a state setter
             } else if (response.status === 404) {
               setPurchasedBooks(""); // No purchased books found
             }
           } catch (error) {
             console.error("Error fetching purchased books:", error);
           }
         } else {
           alert("Please log in to view your purchased books.");
         }
       };
       
    return (
        <div className="p-4 bg-white rounded-lg shadow-lg ">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <h2 className="text-2xl font-bold text-teal-600">Inside your Bag</h2>
          </div>
    
         <div className='max-h-64 overflow-y-auto'>
            {/* Purchased Books Section */}
            <div className="space-y-4  ">
              {purchasedBooks?.length > 0 ? (
                purchasedBooks.map((book) => (
                  <div
                    key={book?._id}
                    className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded shadow-md"
                  >
                      <img
                      src={`${SERVER_URL}/uploads/${book?.productId.productimg}`}
                      alt={book.productId.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{book?.productId.title}</h3>
                    <p className="text-sm text-gray-600">{book?.productId.author}</p>
                    {/* <p className="text-sm text-gray-600">{book?.productId.price} INR</p> */}
                    <a className="mt-0 text-wrap px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md"
                        href={book?.productId.link}> Read</a>
                  </div>
                ))
              ) : (
                <div className="text-gray-600 text-center">No purchased books available.</div>
              )}
            </div>
         </div>
        </div>
      );
    };


export default Purchasedbook