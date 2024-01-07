import React, { useEffect, useState } from 'react'
import { BlockPicker } from 'react-color'
import Dropdown from '../../../../dropdown/Dropdown';
import { config } from '@fortawesome/fontawesome-svg-core';
export default function BarChartForm({ chart, setForm }) {

    // const [color, setColor] = useState('')
    const [formBar, setFormBar] = useState({
        datakey: '',
        min: 0,
        max: null,
        data: [
            { bardata: '', color: '' }

        ]
    });
    const handleBarForm = (e) => {

        const key = e.target.name
        const value = e.target.value

        let form = formBar
        switch (key) {

            case 'bardata':
                form.data[0][key] = value;
                break;

            default:
                form[key] = value;
                break;
        }

        // form.data[0]['color'] = color;
        setFormBar(form);






    }

    // useEffect(() => {

    //     let form = formBar
    //     form.data[0]['color'] = color;
    //     setFormBar(form);
    // }, [color])

    useEffect(() => {

        setForm(formBar)
    }, [formBar])



    useEffect(() => {

        if (!chart.config) return

        const config = JSON.parse(chart.config)
        setFormBar({

            datakey: config?.datakey,
            min: config?.min ? config?.min : 0,
            max: config?.max,
            data: [
                { bardata: config?.data[0]?.bardata, color: config?.data[0]?.color }

            ]
        })
        // setColor(config?.data[0]?.color)

    }, [chart])

    return (
        <>



            {chart && formBar && <>
                <div className='flex lef witems-start flex-col ' >
                    <label className='text-white' htmlFor="datakey">Campo nombre</label>
                    <select required onChange={handleBarForm} name="datakey" id=""> <option value="">-</option>{
                        Object.keys(chart?.data[0]).map(key => {

                            return <option key={'option-bar-form-datakey-' + key} defaultValue={formBar?.datakey === key ? true : false} value={key}>{key}</option>
                        })
                    }</select>
                </div>
                {/* <div className='flex items-start flex-col gap-1 w-full'>
                    <label className='text-white' htmlFor="min">Min Y</label>
                    <input onChange={handleBarForm} className='w-20 pl-2' name='min' placeholder={formBar?.min ? formBar?.min : 0} type="number" />
                </div>
                <div className='flex items-start flex-col gap-1 w-full' >
                    <label className='text-white' htmlFor="max">Max Y</label>
                    <input onChange={handleBarForm} placeholder={formBar?.max ? formBar?.max : null} className='w-20' name='max' type="number" />
                </div> */}



                <div className='flex lef witems-start flex-col ' >
                    <label className='text-white' htmlFor="bardata">Valor</label>
                    <select required onChange={handleBarForm} name="bardata" id="">  <option value="">-</option>{
                        Object.keys(chart?.data[0]).map(key => {

                            return <option key={'option-bar-form-bardata-' + key} defaultValue={formBar?.data[0]?.bardata === key ? true : false} value={key}>{key}</option>
                        })
                    }</select>

                </div>

                {/* 
                        <Dropdown classNameDrop='w-44   bg-red z-[99]  flex-row ' classNameBtn={`self-end bg-white flex flex-row items-center gap-2 px-2`} title={color ? color : 'Color'} id={'color-input-' + chart.id}>
                            <input type="hidden" name='color' value={color} onChange={(e) => { handleBarForm(e) }} />
                            <BlockPicker color={color} onChange={(color) => {
                                document.querySelector('#color-input-' + chart.id + ' .container').classList.remove('show')
                                setColor(color.hex)
                            }

                            }
                            />

                        </Dropdown> */}



            </>
            }


        </>
    )
}
