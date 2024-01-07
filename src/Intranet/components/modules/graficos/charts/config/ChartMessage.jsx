import React from 'react'

export default function ChartMessage({handleBtn,message}) {

    return (<div className='w-full h-full items-center flex justify-center mb-10'><button onClick={(e) => {

        handleBtn(e)

    }} className='bg-arzumaBlack p-2 text-white rounded-md font-bold text-xl '> {message}</button></div>)

}
