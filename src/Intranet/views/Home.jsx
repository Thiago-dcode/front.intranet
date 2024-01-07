import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAjax from "../../hooks/useAjax";
import { useCompany } from '../../Context/ContextProvider'
useParams;
export default function Home() {
  const company = useCompany();
  useEffect(() => {
  }, [company]);
  return <>{company && <div className=" w-full h-full flex  justify-center
  ">
    <h1 className="mt-20 text-xl" >Bienvenido a <span className="text-white px-2 rounded-md" style={
      {
        backgroundColor: company.color
      }
    }>{company.name}</span></h1>
  </div>}</>;
}
