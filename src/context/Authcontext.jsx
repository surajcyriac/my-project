import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()

const Authcontext = ({children}) => {
    const [isAuthorised,setisAuuthorised]=useState(
        !!sessionStorage.getItem('token')
    )
    useEffect(()=>{
        const token=sessionStorage.getItem('token')
        setisAuuthorised(!!token)
    },[] )
  return (
<tokenAuthContext.Provider value={{isAuthorised,setisAuuthorised}}>
    {children}
</tokenAuthContext.Provider>
)
}

export default Authcontext