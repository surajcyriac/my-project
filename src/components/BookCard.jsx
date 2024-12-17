import React, { useState } from 'react';
import Header from '../components/Header';
import BookModal from './BookModal';
import SERVER_URL from '../services/serverUrl';
import { Link } from 'react-router-dom';

const BookCard = ({product}) => {

  const [bookDetails, setBookDetails] = useState({
    id: product._id ,
    pro_id: product.pro_id ,
    title: product.title ,
    author: product.author ,
    genre: product.genre ,
    productimg: ""
  });
console.log(product);

  return (
    <>
      <div style={{ paddingTop: '5px',width:"500px" }} className="flex justify-center items-center p-4 transition-transform transform   hover:scale-110  " >
        <div className=" max-w-md w-full bg-teal-100 text-gray-200 rounded-lg shadow-lg overflow-hidden ">
          {/* Image Container */}
          <div className="bg-teal-100 p-4 flex justify-center  " style={{width:"200px", height:"110px"}}>
            <img
              src={`${SERVER_URL}/uploads/${product.productimg}`}
              alt="Book Cover"
              className=" rounded-md"
              style={{height:"100px"}}
/>
          </div>

          {/* Book Details */}
          <div className="p-6 text-center h-48">
            {/* Book Title */}
          <div className='h-32'>
              <h1 className="text-2xl font-bold text-yellow-500 mb-2 capitalize  ">{bookDetails.title}</h1>
              <h4 className="text-lg font-medium text-red-500 mb-4 capitalize"> {bookDetails.author}</h4>
             
          </div> {/* Rating Stars */}
            {/* <div className="flex justify-center items-center space-x-1 mb-4">
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-gray-500"></i>
              <span className="ml-2 text-sm text-gray-400">(4/5)</span>
            </div> */}

            {/* Buy Now Button */}
              {/* <BookModal></BookModal>  */}
              
            <Link className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 "  to={`/product/${bookDetails?.id}/item`}>View</Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
