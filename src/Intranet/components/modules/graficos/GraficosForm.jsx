import React, { useEffect, useState } from 'react'
import useAjax from '../../../../hooks/useAjax';
import Icon from '../../icon/Icon';
import Dropdown from '../../dropdown/Dropdown';
import IsPending from '../../../../components/pending/IsPending';
import Error from '../../../../components/error/Error';
export default function GraficosForm({ cleanField = true, url = '/api/modules/graficos/new', method = 'POST', titleVal = '', sqlVal = '', id, idDrop = 'chart-type-create', titleForm = 'Crea tu propio gráfico.', titleDrop, titleBtn = 'Crear', result, isPending, setConfig, error, classNameDrop = ' top-8 bg-white rounded-md gap-2 p-2 w-full border border-black', }) {
    const [chartTypes, chartTypesError, isPendingChartTypes] = useAjax('/api/modules/graficos/types');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [sql, setSql] = useState('');
    const [dropTitle, setDropTitle] = useState('Tipo de gráfico');
    const [dropError, setDropError] = useState(null)
    const [form, setForm] = useState(null);
    const handleSubmit = (e) => {

        e.preventDefault();
        if (!type) {

            setDropError(['El campo tipo de gráfico es obligatorio.'])
            return
        }
        if (!title || !sql) return
        setDropError(null)

        setForm({
            title, type, sql: sql.trim()
        })
    }
    const handleType = (value) => {


        setType(value)
        setDropTitle(value)
        document.querySelector(`#${idDrop} .container`).classList.remove('show');

    }

    useEffect(() => {

        if (!form) return

        setConfig(url, form, method)

    }, [form])
    useEffect(() => {

        if (!isPending && !error) {

            document.querySelector(`#${id} .container`).classList.remove('show');

            if (!cleanField) return
            setSql('');
            setTitle('')

        }

    }, [isPending, error])
    useEffect(() => {

        setTitle(titleVal)


        setSql(sqlVal)




    }, [titleVal, sqlVal])
 

    return (
        <>
            {chartTypes ?
                (<form onSubmit={(e) => {
                    handleSubmit(e)
                }} className="flex flex-col items-center  w-full gap-4">
                    <h2 className='text-white text-lg font-semibold capitalize w-full rounded-md pl-2'>{titleForm}</h2>
                    <input required onChange={(e) => {
                        setTitle(e.target.value)
                    }} value={title} type="text" className='w-full p-2 rounded-md' placeholder=' Título del Gráfico' />

                    <Dropdown hideable={false} errors={dropError} classNameDrop={classNameDrop + ' w-96'} id={idDrop} title={dropTitle}>

                        {chartTypes.data?.map((chartType, i) => {

                            return (
                                <button key={'button-dropdown-chart-type-' + i} id={'button-dropdown-chart-type-' + i} type='button' onClick={(e) => {

                                    handleType(chartType.type)


                                }} name='type' value={chartType.type} className='hover:bg-slate-500 hover:text-white flex items-center  justify-between p-2 w-full '>
                                    <Icon icon={chartType.icon} />
                                    <span className='text-left ml-2 w-full'>{chartType.type}</span>


                                </button>
                            )
                        })}

                    </Dropdown>
                    <div className='flex flex-col gap-1 w-full'>

                        <textarea required onChange={(e) => {
                            setSql(e.target.value)
                        }} value={sql} className='p-5 rounded-md' placeholder="Escribe tu SQL" name="sql" id="sql" cols="5" rows="5"></textarea>
                    </div>

                    {!isPending ? <button type='submit' className=' border-white bg-arzumaRed w-20 rounded-md text-white'>{titleBtn}</button> : <IsPending size='25' color="#DC0146" />}

                    <div>  {error && 
                        error.map((err, i) => {

                            return <Error key={'error-chart-form-' + i} id={'error-chart-form-' + i} className='text-white' message={err} />
                        })
                    }</div>
                </form>) : <div>Loading</div>}
        </>
    )
}
