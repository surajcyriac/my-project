import React, { createContext, useState } from "react";
export const addProjectResponseContext = createContext();
export const editProjectResponseContext = createContext();



const Contextapi = ({ children }) => {
  const [addProjectResponse, setaddProjectResponse] = useState("");
  const [editProjectResponse, seteditProjectResponse] = useState("");


  return (
<editProjectResponseContext.Provider value={{editProjectResponse,seteditProjectResponse}}>  
  <addProjectResponseContext.Provider value={{ addProjectResponse, setaddProjectResponse }}>
      {children}
    </addProjectResponseContext.Provider>
    </editProjectResponseContext.Provider>
  );
};

export default Contextapi;
