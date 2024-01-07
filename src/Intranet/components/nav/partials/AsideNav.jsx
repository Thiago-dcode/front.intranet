import React, { useEffect, useState } from 'react'
import { capitalize } from '../../../../utils/Utils';
import NavLink from '../NavLink';
import Icon from '../../icon/Icon';
import useCheckDevice from '../../../../hooks/useCheckDevice';
export const AsideNav = ({ company, modules, setModule }) => {

    const [display, setDisplay] = useState(true);
    const device = useCheckDevice();


    useEffect(() => {

        const aside = document.getElementById('aside-nav-desk')
        const main = document.getElementById("intranet-main")

        if (display) {

            aside.classList.add('in-desk')
            aside.classList.remove('out-desk')
            main.classList.add('in')
            main.classList.remove('out')
            return

        }
        aside.classList.add('out-desk')
        aside.classList.remove('in-desk')
        main.classList.add('out')
        main.classList.remove('in')

    }, [display])
    return (
        <aside id='aside-nav-desk' className="flex aside-nav in z-[20] mt-[3.3rem] w-40 text-xs top-0 text-nav fixed  h-screen   flex-col items-center justify-between border-r-slate-400 bg-white shadow-md ">
            <nav className="  w-full  mt-4 h-full flex flex-col gap-2 px-3">
                {modules.map((mod) => {
                    return (
                        <NavLink key={`link-${mod.name}`} to={`/${company}/${mod.route}`}>
                            <Icon icon={mod.logo} />
                            <button id='btn-nav-desk'
                                onClick={(e) => {

                                    setModule(mod.id);
                                }}
                                className=" text-center"
                            >
                                {capitalize(mod.name)}
                            </button>

                        </NavLink>
                    );
                })}
            </nav>
            <div className=" absolute bottom-12 border-t border-t-slate-400  w-full">
                <button onClick={() => {
                    setDisplay(!display)
                }} className="flex w-full justify-end items-end pr-2 py-4"><Icon icon={display ? 'ArrowLeft' : 'ArrowRight'} /></button>
            </div>
        </aside>
    )
}
