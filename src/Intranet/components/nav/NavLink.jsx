import React from "react";

import { Link } from "react-router-dom";
export default function NavLink({ handleClick = ()=>{}, id ='',to, children }) {
  return (
    <Link onClick={()=>{
      handleClick()
    }} id={id} className=" hover:bg-gray-500 py-2 pl-2 hover:text-white flex items-center w-full justify-center" to={to}>
      <div className=" flex items-center gap-2  w-full" >
        {children}
      </div>

    </Link>
  );
}
