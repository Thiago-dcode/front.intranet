import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function EanSuccess({ handleSucess, num }) {
    const navigate = useNavigate();
    return (
        <div className='mt-36 flex flex-col items-center justify-center gap-4 no-underline '>
            <h1 className='text-xl font-sans'>Felicidades!, has actualizado: <span>{num === 1 ? <>un código de barra.</> : <>{num} códigos de barras.</>}</span></h1>
            <button onClick={(e) => {
                navigate(0)
            }} className=' bg-bera-textil text-white p-2 rounded-md' to={'?limit=50'}> Cargar más códigos de barras. </button>
        </div>

    )
}
