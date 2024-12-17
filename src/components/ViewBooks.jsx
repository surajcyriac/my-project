import React, { useContext, useEffect, useState } from 'react';
import Add from './Add';
import Edit from './Edit';
import { getUserproductsAPI, userProductRemoveAPI } from '../services/allapi';
import { addProjectResponseContext } from '../context/Contextapi';

const ViewBooks = () => {
  const {addProjectResponse,setaddProjectResponse}=useContext(addProjectResponseContext)
  const [userproduct,setuserproduct]=useState([])
  const [deletep,setdeletep]=useState(true)
  
  useEffect(()=>{
    getuserproducts()
  },[addProjectResponse,deletep])
  console.log("edit component display",userproduct);
  
  const getuserproducts= async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
     const result=await getUserproductsAPI(reqHeader)
     console.log("user added books" ,result);
     if(result.status==200){
      setuserproduct(result.data)
     }
     
      }catch(err){
      console.log(err);
      
      }
    }
    }

    const deleteproject = async (id) =>{
      const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
       "Authorization":`Bearer ${token}`
      }
      try {
          await userProductRemoveAPI(id,reqHeader)
      } catch (err) {
          console.log(err);   
      }
    console.log(token,id);
    setdeletep(false)

    
      }
    }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg  ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h2 className="text-2xl font-bold text-teal-600">Your BOOKS</h2>
        <Add />
      </div>

      {/* Projects Section */}
         <div className='max-h-64 overflow-y-auto'>
        {/* Placeholder for a Project */}
{
   userproduct?.length>0?
   userproduct.map(products=>(
    <div key={products?._id} className="flex flex-col flex-wrap justify-between items-start bg-gray-50 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">{products?.title}</h3>
       <div>
            <div className="flex flex-wrap items-end gap-4 pt-3 ">
            <div className=" space-x-2">
                                              {
                                                  <span
                                                      className={` font-bold   ${
                                                        products.status === "Approved"
                                                              ? "text-green-500  text-lg  "
                                                              : "text-red-500"
                                                      }`}
                                                  >
                                                      {products.status}
                                                  </span>
                                              }
                                          </div>
             
<div>
                <Edit products={products}></Edit>
  
</div>    
              <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="#github-link"
                    className="text-gray-600 hover:text-teal-600"
                  >
                  </a>
              </div>
  
              <button onClick={()=>deleteproject(products?._id)} className="text-red-600 hover:text-red-800">
                <i className="fa-solid fa-trash text-xl"></i>
              </button>
            </div>
       </div>
        </div>
   )):
   <div className="text-gray-600 text-center">No books available.</div>
  }

        {/* Repeat the above block for each project */}
      </div>
    </div>
  );
};

export default ViewBooks;
