import React from 'react'
import useAjax from '../../../hooks/useAjax';
import { useCompany } from '../../../Context/ContextProvider';
import { useEffect } from 'react';
import IsPending from '../../../components/pending/IsPending';
export default function PymeSearch({ isPending, handleBtn, handleSearch, setCodArticulo, setProveedor, codArticulo = '', proveedor = '' }) {
    const company = useCompany();
    const [proveedores, error, _isPending, setConfig] = useAjax();

    useEffect(() => {
        if (!company) return
        setConfig(`/api/${company.name}/modules/eans/proveedores`)

    }, [company])
    return (
        <>
            <form onSubmit={(e) => {
                handleSearch(e)
            }} method="GET" action="" className='flex items-center '>
                <div className="flex lg:flex-row xl:flex-row flex-col h-full w-[12rem]items-center gap-2">


                    <input value={codArticulo} className=' outline-none border focus:border-blue-500  border-black rounded-md text-sm text-center' id='codArticulo' onChange={(e) => {
                        setCodArticulo(e.target.value.trim().toUpperCase())
                    }} type="text" placeholder="código Artículo" name="codArticulo" />



                    <select value={proveedor} className='border border-black focus:border-blue-500 text-xs w-[12rem] rounded-md outline-none text-center' id='proveedor' onChange={(e) => {

                        setProveedor(e.target.value.trim().toUpperCase())
                    }} name="codProveedor" placeholder="Proveedor">
                        <option value={''} >
                            Proveedor
                        </option>
                        {proveedores && <>{proveedores.map((_proveedor, i) => {
                            if (_proveedor.NOMBRECOMERCIAL) { return <option className='focus:border-blue-500' key={`proveedor-option-${i}`} id={`proveedor-option-${i}`} value={_proveedor.CODIGO}>{_proveedor.NOMBRECOMERCIAL}</option> }
                        })}</>}

                    </select>


                    {!isPending ? <button onClick={(e) => {
                        handleBtn(e)
                    }} name='search' className='bg-bera-textil px-2 rounded-md text-white ' type="submit">Buscar</button> : <IsPending size='24' color='bg-bera-textil' />}

                </div>
            </form></>
    )
}
