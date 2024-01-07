import React, { useState, useEffect } from 'react'
import BarChartForm from './BarChartForm'
import RadialChartForm from './RadialConfigForm'
import IsPending from '../../../../../../components/pending/IsPending'
export default function ConfigWrapper({ chart, isPending, setConfig }) {
    const [chartConfig, setChartConfig] = useState(null)
    const [form, setForm] = useState(null)



    const handleSubmit = (e) => {
        e.preventDefault()

        setConfig('/api/modules/graficos/' + chart.id, {
            title: chart.title,
            sql: chart.sql,
            type: chart.type,
            config: JSON.stringify(form)


        }, 'PATCH')
    }

    const renderChartConfig = (chartType) => {

        switch (chartType) {
            case 'bar':
                return <BarChartForm chart={chart} setForm={setForm} />
            case 'radial':
                return <RadialChartForm chart={chart} setForm={setForm} />
            default:

        }

    }

    useEffect(() => {

        if (chart.config) {
            setChartConfig(JSON.parse(chart.config))
        }

    }, [chart])
    return (
        <>


            {chart &&


                <form className=' w-full flex flex-col items-start p-2 gap-2' onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <h2 className='text-white font-bold self-center'>Configura {chart.title}</h2>
                    {renderChartConfig(chart.type)}


                    {!isPending ? (<button className='bg-arzumaRed self-center px-2 text-white rounded-md'>Guardar</button>) : <IsPending size='25' color={'#DC0146'} />}
                </form>}
        </>
    )
}
