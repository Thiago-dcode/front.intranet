import React from 'react'
import Error from '../../../components/error/Error';

export default function Dropdown({ hideable = true, Element = null, errors, classNameDrop = 'bg-black/70  rounded-md gap-2 p-2 w-full border-white', classNameBtn = 'bg-white flex items-center gap-2 px-2 rounded-md', id, title, children, arrow = true }) {

    const handleDropDown = () => {
        const element = document.querySelector(`#${id} .container`)
        const classList = element.classList;

        const elements = document.querySelectorAll('.container');


        if (!classList.contains('show')) {

           
            classList.add('show');
            if (element.classList.contains(`hideable`)) {
                for (let i = 0; i < elements.length; i++) {
                    const el = elements[i];


                    if (el.classList.contains(`class-${id}`)) {

                        continue
                    }
                    el.classList.remove('show')
                }
            }
            return;
        }
        classList.remove('show')

    }

    return (
        <div id={id} className={`relative flex flex-col w-full  items-start dropdown  z-[97]`}>
            < button onClick={(e) => {
                handleDropDown();
            }} type='button' className={`${classNameBtn}`}>{!Element ? (<span>{title}</span>) : Element}{arrow && <i className="arrow down"></i>}</button>
            <div className='flex flex-col'>
                <div className={`${classNameDrop} ${hideable ? 'hideable' : ''} class-${id} z-[95] items-start container absolute top-10 flex flex-col`}>{children}</div>
                <div>
                    {errors && errors.map((error, i) => {
                      
                        return <Error message={error} key={`dropdown-error-${id}-${i}`} id={`dropdown-error-${id}-${i}`} /> 
                    })}
                </div>

            </div>

        </div>
    )
}
