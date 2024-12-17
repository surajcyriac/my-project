
import commonAPI from "./commonapi"
import SERVER_URL from "./serverUrl"

// register called by auth component when user click register btn
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}
// login component when user click login btn
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}
// display userdetails in profile page
export const getUserDetails = async (reqBody)=>{
    return await commonAPI("GET",`${SERVER_URL}/userdetails`,reqBody)
}
// update user profile api
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}
// add book api
export const addBookAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-product`,reqBody,reqHeader)
}
// display userproducts in profile page
export const getUserproductsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-products`,{},reqHeader)
}
// udate project api
export const updateProjectAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/products/${id}/edit`,reqBody,reqHeader)
}
// display all products
export const allproductsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-product?search=${searchKey}`,{},reqHeader)
}
// display single products
export const SingleproductAPI = async (id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/product/${id}/item`,{},reqHeader)
}
// delete product from user profile
export const userProductRemoveAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/product/${id}/remove`,{},reqHeader)
}
// add to wishlist 
export const addwishlistAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-wishlist`,reqBody,reqHeader)
}
// get wishlist
export const getWishlistAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-wishlist`,{},reqHeader)
}
// delete wishlist item
export const deleteWishlistAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/del-wishlist`,reqBody,reqHeader)
}
// add to cart
export const addCartAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-cart`, reqBody, reqHeader);
  };
//   display cart
export const getCartAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/get-cart`, null, reqHeader);
  };
//   delete cart
export const deleteCartAPI = async (reqBody, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/del-cart`, reqBody, reqHeader);
  };
//   update quantity api
  export const updateCartQuantityAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/update-cart`, reqBody, reqHeader);
};
// add to purchases
export const addPurchaseAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-purchased`, reqBody, reqHeader);
  };
  
//   get purchases books
export const getPurchasedAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/get-purchased`, null, reqHeader);
  };
  
//   ---------------admin------------------------
// display all products
export const adminproductsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/admin-product`,{},reqHeader)
}
// status setting project api
// export const statusProjectAPI = async (bookId,reqBody,reqHeader)=>{
//     return await commonAPI("PUT",`${SERVER_URL}/products/${bookId}/status`,reqBody,reqHeader)
// }
export const statusProjectAPI = async (bookId,newStatus,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/products/${bookId}/status?status=${newStatus}`,{},reqHeader)
}
// add comment
export const addcommentAPI = async (bookId,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/product/${bookId}/comments`,reqBody,reqHeader)
}