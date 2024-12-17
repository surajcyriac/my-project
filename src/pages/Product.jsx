import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { allproductsAPI } from '../services/allapi';

const Product = () => {
  
    const [searchKey,setSearchKey] = useState("")
  const [allbook,setallbook] = useState([])
  console.log(allbook);

  useEffect(()=>{
    getAllproducts()
  },[searchKey])

  const getAllproducts = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await allproductsAPI(searchKey,reqHeader)
        if(result.status==200){
          setallbook(result.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
    


      return (
        <div className="min-h-screen bg-gray-100  ">
          {/* Header Section */}
          <Header/>
           {/* Search Bar */}
                 <div className='flex flex-wrap justify-end w-full  '>
                    <div className=" w-1/3">
                      <input
                        type="text"
                        placeholder="Search books..."
                        className="w-full p-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={e=>setSearchKey(e.target.value)} 
                      />
                    </div>
                 </div>
       
    
          {/* Books Grid */}
          {/* {loading ?  */}
            {/* <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-500">Loading books...</p>
            </div> */}
           {/* :  */}
          <div className='flex justify-center flex-wrap'>
             {
              allbook?.length>0? 
              allbook.map( product=>(
                  <div key={product?._id} className="flex w-40 flex-wrap mx-5 ">
                  <BookCard product={product}></BookCard>
                  </div>
              )  )
              :
              <div></div>
             }
          </div>
          {/* } */}
          <Footer></Footer>
        </div>
      );
    }
    
   
export default Product