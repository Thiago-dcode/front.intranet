import { config } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useState, useMemo } from "react";
//General imports
import {
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    Tooltip,
    LabelList,
    Text
} from "recharts";
//Radial bar imports
import { RadialBarChart, RadialBar } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { capitalize, formatNumberWithCommas, generateRandomColor, maxWords, roundTo } from "../../../../../utils/Utils";
import useCheckDevice from "../../../../../hooks/useCheckDevice";


const parseData = (data, callback) => {

    let newData = [];
    data.forEach((d) => {
        let newD = d;
        for (let i = 0; i < Object.keys(d).length; i++) {
            const key = Object.keys(d)[i];


            callback(key, newD)


        }
        newData.push(newD);
    });
    return newData;

};


export function ChartRadial({ chart }) {
    const [_data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [colors, setColors] = useState(['#0CD967'])


    const handleSetColors = () => {

        const color = generateRandomColor();

        if (!colors.includes(color)) {
            setColors(prev => [...prev, color])
            return color
        }
        return handleSetColors();

    }
    useEffect(() => {

        if (!chart.config) {
            setConfig(null);
            return;
        }
        setConfig(JSON.parse(chart.config));
    }, [chart.config]);

    useEffect(() => {


        if (!config || !chart.data) return;

        let data = { ...chart.data[0] }
        data[config.datakey] = roundTo(data[config.datakey], 2)


        let newData = [
            {
                ...data,

                name: config.comparar,
                fill: 'red'
            },

            {

                [config.datakey]: config.objetivo,
                name: config.nombre,
                fill: '#0CD967'

            }
        ]


        setData(newData)


    }, [config]);

    useEffect(() => {

    }, [_data])

    return (
        <>

            {_data && config && < ResponsiveContainer width={"100%"} height={"100%"}>

                <RadialBarChart
                    cx='50%'
                    cy='50%'
                    width={100}
                    height={100}
                    barGap={'0.5rem'}
                    data={_data}
                    label={{ fill: "#666", position: "insideStart" }}
                    innerRadius={"50%"}
                    outerRadius={"80%"}
                    barSize={30}

                    startAngle={180}
                    endAngle={0}
                >
                    <RadialBar

                        endAngle={180}
                        startAngle={0}
                        minAngle={0}
                        spacing={20}
                        background
                        dataKey={config.datakey}
                        label={{ fill: "black", position: "insideStart", fontSize: "0.8rem" }}
                    />
                    <Legend


                        iconSize={10}
                        width={'100%'}
                        fontSizeAdjust={"0.8rem"}
                        fontSize={'0.6rem'}
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"

                    />
                    <text
                        fontSize={'1rem'}
                        x={115}
                        y={110}
                        fill={config?.percentage >= 100 ? 'green' : 'black'}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="progress-label"
                    >
                        {`${formatNumberWithCommas(config?.percentage)}%`}
                    </text>

                    {_data.map((d, i) => {

                        return (
                            <text key={'text-radial-bar-'+i}
                                fontSize={'1rem'}
                                x={110}
                                y={150 + i * 20}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="progress-label"
                            >
                                {`${d.name}: ${formatNumberWithCommas(d[config.datakey])}`}
                            </text>

                        )

                    })}
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer >}
        </>
    );
}
const YAxisLeftTick = ({ y, payload: { value } }) => {
    return (
        <Text color="black" x={0} y={y} fontSize={'0.6rem'} textAnchor="start" verticalAnchor="middle" >
            {maxWords(value, 2, "...", " ", true)}
        </Text>
    );
};
let ctx;
export const measureText14HelveticaNeue = text => {
    if (!ctx) {
        ctx = document.createElement("canvas").getContext("2d");
        ctx.font = "8px 'Helvetica Neue";
    }

    return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;
export function ChartBar({ chart }) {
    const [_data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [max, setMax] = useState()
    const device = useCheckDevice()

    useEffect(() => {
        if (!chart.config) {
            setConfig(null);
            return;
        }
        setConfig(JSON.parse(chart.config));
    }, [chart]);
    useEffect(() => {
        if (!config) return;

        setData(parseData(chart.data, (key, d) => {



            for (let j = 0; j < config?.data?.length; j++) {
                const e = config.data[j];

                if (!d['color']) { d['color'] = generateRandomColor(); }
                if (e.bardata !== key) continue

                d[key] = roundTo(d[key], 2);




            }


        }));
    }, [config]);
    useEffect(() => {

        if (!_data) return

        const max = Math.max(..._data.map(d => Number.parseFloat(d[config.data[0].bardata])))
        setMax(device.isPhone ? max * 2 : max * 1.5);

    }, [_data])

    return (
        <>
            {config && _data && (
                <ResponsiveContainer width={"100%"} height={'100%'}  >
                    <BarChart
                        layout="vertical"
                        width={500}

                        margin={{ right: 1, left: 40, bottom: 1 }}
                        data={_data}

                    >


                        <XAxis

                            hide
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            domain={[
                                Number.parseInt(config.min),
                                max,
                            ]}

                        />
                        <YAxis
                            yAxisId={0}
                            dataKey={config.datakey}
                            type="category"


                            axisLine={false}
                            tickLine={false}
                            tick={YAxisLeftTick}
                        />
                        <YAxis
                            orientation="right"
                            yAxisId={1}
                            fill="black"
                            fontSize={'0.8rem'}
                            dataKey={config.data[0].bardata}
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={value => formatNumberWithCommas(value)}
                            mirror

                            tick={{
                                transform: `translate(${-5 + BAR_AXIS_SPACE}, 0)`
                            }}

                        />
                        <Tooltip />


                        {config.data.map((bar) => {
                            return (
                                <Bar key={bar.bardata} dataKey={bar.bardata}  >

                                    {_data.map((d, idx) => {
                                        return <Cell key={d[bar.bardata]} fill={d['color']} />;
                                    })}
                                </Bar>
                            );
                        })}
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    );
}
