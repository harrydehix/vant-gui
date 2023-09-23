import React, { useState } from "react";
import { TemperatureUnit } from "vant-environment/units";
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LiveWeatherData from "../LiveWeatherData";
import TextTransition, { presets } from 'react-text-transition';

const Temperature : React.FunctionComponent<{
    temperature: LiveWeatherData<number | null>,
    unit: TemperatureUnit,
    title: React.ReactNode,
    tooltip: string,
}> = ({temperature, unit, tooltip, title}) => {
    const [colorCodes] = useState([
            { "°C": -39.99, "°F": -39.99, color: " #9358f5"},
            { "°C": -29.99, "°F": -21.99, color: " #5f58f5"},
            { "°C": -19.99, "°F": -3.99, color: " #587af5"},
            { "°C": -9.99, "°F": 14, color: " #58a2f5"},
            { "°C": -4.99, "°F": 23, color: " #58bcf5"},
            { "°C": -1.99, "°F": 28.4, color: " #58d0f5"},
            { "°C": 0, "°F": 32, color: " #5acbef"},
            { "°C": 5, "°F": 41, color: " #4fe780"},
            { "°C": 10, "°F": 50, color: " #5aef5c"},
            { "°C": 15, "°F": 59, color: " #b5ef5a"},
            { "°C": 20, "°F": 68, color: " #f4e758"},
            { "°C": 25, "°F": 77, color: " #f4bf58"},
            { "°C": 30, "°F": 86, color: " #f48658"},
            { "°C": 35, "°F": 95, color: " #f84242"},
            { "°C": 40, "°F": 104, color: " #ff5474"},
            { "°C": 45, "°F": 113, color: " #fd3d79"},
            { "°C": 50, "°F": 122, color: " #fd3d98"},
            { "°C": Infinity, "°F": Infinity, color: "#fd3d98"},
        ]);

    function colorizeTemperature(temperature: number | null){
        if(temperature === null){
            return "#fff";
        }
        for(const entry of colorCodes){
            if(temperature < entry[unit]){
                return entry.color;
            }
        }
    }

    return <Tooltip title={tooltip} variant="outlined">
        <Card className={`temperature live-component ${temperature.val === null ? "no-data" : ""}`}>  
            <Typography textAlign={"left"} noWrap>
                    <Typography level="h1" noWrap className="value" textColor={colorizeTemperature(temperature.val)}>
                        <TextTransition springConfig={presets.stiff} inline>{temperature.node}</TextTransition>
                    </Typography>
                    <Typography level="h4" noWrap className="unit" paddingLeft={1} fontWeight={100}>{temperature.val === null ? "" : unit}</Typography>
                </Typography>
           <Typography startDecorator={<DeviceThermostatIcon/>}>{title}</Typography>
        </Card>
    </Tooltip>;
}

export default Temperature;