import React, { useEffect, useState } from 'react'
import '../../assets/css/components/success.css'

export default function Success({ messages }) {
    console.log(messages)
    const [show, setShow] = useState(true);

    useEffect(() => {




        setTimeout(() => {
            setShow(false)

        }, 5000);


    }, [])

    return (
        <>
            <div className={`absolute flex flex-col gap-2 right-2 popup-success ${show ? 'show' : 'hide'}`}>
                {messages && messages.map(message => {


                    return <p className='font-bold text-white bg-green-400 px-2 py-1   rounded-md  text-xs'>{message}</p>


                })}
            </div>

        </>
    )
}
