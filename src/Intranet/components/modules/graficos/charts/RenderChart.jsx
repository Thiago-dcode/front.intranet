import React from 'react'
import ChartMessage from './config/ChartMessage'
import { ChartRadial, ChartBar } from './Charts'
export default function RenderChart({ chart }) {


    const render = (chart) => {



        if (chart.type === 'radial' && chart.data.length > 1) {
            return (
                <ChartMessage message={`La SQL no es adecuada para el tipo de gráfico ${chart.type}`} handleBtn={() => {
                    document.querySelector(`#edit-chart-${chart.id} .container`).classList.add('show')
                }} />)

        }
        if (!chart.config) {

            return (
                <ChartMessage message={`click para configurar gráfico tipo ${chart.type}`} handleBtn={() => {
                    document.querySelector(`#config-chart-${chart.id} .container`).classList.add('show')
                }} />)
        }
        switch (chart.type) {
            case "radial":
                return <ChartRadial chart={chart} />

            case "bar":
                return <ChartBar chart={chart} />


            default:
                break;
        }
    }
    return (


        <>
            {chart &&

                render(chart)

            }

        </>

    )
}
