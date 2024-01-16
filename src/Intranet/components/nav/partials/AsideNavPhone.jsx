import React, { useEffect, useState } from 'react'
import Icon from '../../icon/Icon'
import NavLink from '../NavLink';
import { capitalize } from '../../../../utils/Utils';



export default function AsideNavPhone({ company, modules, setModule }) {
    const [display, setDisplay] = useState(false);


    useEffect(() => {
        const aside = document.querySelector('.aside-nav')
        const layoutBtn = document.getElementById('phone-button')
        const main = document.getElementById('intranet-main')
        main.classList.remove('in', 'out')

        if (display) {

            layoutBtn.style.display = 'flex'
            aside.classList.add('in')
            aside.classList.remove('out')

            return

        }

        layoutBtn.style.display = 'none'
        aside.classList.add('out')
        aside.classList.remove('in')
    

    }, [display])

    return (
        <>
            <div className="lg:hidden xl:hidden  bg-none  z-50 absolute -top-10  mt-[3.3rem] left-1 btn-mobile">

                <button onClick={() => {

                    setDisplay(!display)

                }} className="btn-mobile px-1  hover:cursor-pointer  rounded-sm"><Icon className={'btn-mobile w-6 h-6'} color='black' icon={'Bars'} /></button>
            </div>
            <button onClick={() => {
                console.log('hello')
                setDisplay(false)

            }} id='phone-button' className='flex z-[98] absolute w-screen h-screen bg-black/80 cursor-pointer   flex-col items-center justify-start'><p className='text-white  relative  top-20 text-lg'>x</p></button>
            <aside className="aside-nav z-[99] mt-[3.3rem] w-40 text-xs top-0 text-nav fixed  h-screen   flex-col items-center justify-between border-r-slate-400 bg-white shadow-md ">
                <nav className="  w-full  mt-4 h-full flex flex-col gap-2 px-3">
                    {modules.map((mod, i) => {
                        return (
                            <NavLink handleClick={(e) => {
                                setDisplay(false)
                                setModule(mod);
                            }} key={'module-link-phone-' + i} id={'module-link-phone-' + i} to={`/${company}/${mod.route}`}>
                                <Icon icon={mod.logo} />
                                <button id={'module-button-phone-' + i}

                                    className=" text-center"
                                >
                                    {capitalize(mod.name)}
                                </button>

                            </NavLink>
                        );
                    })}
                </nav>
                <div className=" hidden border-t border-t-slate-400 w-full lg:flex  xl:flex  items-center justify-center">
                    <button className="">expand</button>
                </div>
            </aside>
        </>
    )
}
