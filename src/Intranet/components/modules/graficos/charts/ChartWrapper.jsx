import React, { Children, useEffect, useState } from 'react'
import RenderChart from './RenderChart'
import Dropdown from '../../../dropdown/Dropdown'
import GraficosForm from '../GraficosForm'
import Icon from '../../../icon/Icon'
import ConfigWrapper from './config/ConfigWrapper'
import useAjax from '../../../../../hooks/useAjax'
import PopUp from '../../eans/PopUp'
import useCheckDevice from '../../../../../hooks/useCheckDevice'
export default function ChartWrapper({ id, handleEdit, _handleDelete, chart, title }) {

  const [chartEdited, errorChartEdited, isPendingChartEdited, setConfigChartEdited] = useAjax();
  const [style, setStyle] = useState({})
  const [chartDelete, error, isPending, setConfig] = useAjax();
  const [showPopUp, setShowPopUp] = useState(false)
  const [currentChart, setCurrentChart] = useState(chart);
  const device = useCheckDevice();

  const handleDelete = e => {

    setConfig('/api/modules/graficos/' + currentChart.id, {}, 'DELETE');

  }
  useEffect(() => {
    const configEl = document.querySelector(`#config-chart-${chart.id} .container`)
    if (!configEl.classList.contains('show')) return
    if (chartEdited && !errorChartEdited && !isPendingChartEdited) {

      configEl.classList.remove('show')
    }


  }, [chartEdited, errorChartEdited, isPendingChartEdited])

  const handleStyle = (type) => {


    switch (type) {
      case 'bar':
        setStyle({
          height: '250px',
          width: '400px'
        })
        break;
      case 'radial':
        setStyle({
          height: '250px',
          width: '250px'
        })
        break;

      default:
        break;
    }
  }


  useEffect(() => {

    if (chartEdited) {
      handleEdit(chartEdited.data)
      setCurrentChart(chartEdited.data)
      setCurrentChart(chartEdited.data)

    }
    if (errorChartEdited) {

    }


  }, [chartEdited, errorChartEdited])
  useEffect(() => {

    if (chartDelete && !error && !isPending) {
      _handleDelete(currentChart)
      setShowPopUp(false)
    }

  }, [chartDelete, error])

  useEffect(() => {

    setCurrentChart(chart)

    handleStyle(chart.type)

  }, [chart])
  useEffect(() => {

  }, [isPending])


  return (

    <div style={{
      ...style,
      width: device.isPhone && chart.type === 'bar' ? '300px' : style.width
    }} id={`chartwrapper-${id}`} className={`text-xs flex flex-col bg-white border-4  rounded-md p-2`}>
      <div className='w-full flex flex-row items-center justify-center px-2'>
        <h2 className='w-full'>{title}</h2>
        <div >
          <>
            {currentChart &&

              <div className='w-full flex flex-row items-center gap-3 '>


                <Dropdown classNameDrop='  px-2 -left-52 w-52 flex flex-col bg-black/70 rounded-md' id={`edit-chart-${currentChart.id}`} Element={<Icon className={'self-end'} icon={'PenToSquare'} />} arrow={false} title={"edit"} classNameBtn='z-50 self-end' >
                  <GraficosForm cleanField={false} id={`edit-chart-${currentChart.id}`} isPending={isPendingChartEdited} error={errorChartEdited?.data} setConfig={setConfigChartEdited} url={`/api/modules/graficos/${currentChart.id}`} method='PATCH' titleBtn='Editar' titleVal={currentChart.title} sqlVal={currentChart.sql} titleForm={`Edita gráfico ${currentChart.title}`} idDrop={`chart-type-edit-${currentChart.id}`} classNameDrop='top-8 bg-white  rounded-md gap-2 p-2 w-full border border-black' />
                </Dropdown>
                <Dropdown classNameDrop='-left-60  px-2 w-60 j flex flex-col bg-black/70 rounded-md' id={`config-chart-${chart.id}`} Element={<Icon className={'self-end '} icon={'Wrench'} />} arrow={false} title={"config"} classNameBtn='z-10 self-end' >



                  <ConfigWrapper chart={chart} setConfig={setConfigChartEdited} isPending={isPendingChartEdited} />


                </Dropdown>
                <div className='flex items-center' action="">

                  <button onClick={() => {

                    setShowPopUp(true)


                  }} type='button'><Icon icon={'Trash'} /></button>


                </div>
                <PopUp setShow={setShowPopUp} show={showPopUp} id={`chart-popup-${chart.id}`} isPending={isPending} confirmMessage={'Procesando...'} message={`Realmente deseas borrar el gráfico ${chart.title}?`} handleCancel={() => {
                  setShowPopUp(false)
                }} handleConfirm={handleDelete} />


              </div>
            }
          </>
        </div>
      </div>
      <RenderChart chart={chart} /></div>

  )
}
