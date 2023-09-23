import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import React from 'react';
import LiveWeatherData from '../LiveWeatherData';
import TextTransition, { presets } from 'react-text-transition';


const WeatherComponent : React.FunctionComponent<{
    data: LiveWeatherData<any>,
    className?: string,
    title: React.ReactNode,
    tooltip: string,
    unit: string,
    icon: React.ReactNode
}> = (props) => {
    return <Tooltip title={props.tooltip} variant="outlined">
        <Card className={`${props.className} live-component ${props.data.val === null ? "no-data" : ""}`}>  
            <Typography textAlign={"left"} noWrap>
                    <Typography level="h1" noWrap className="value">
                        <TextTransition springConfig={presets.stiff} inline>{props.data.node}</TextTransition>
                    </Typography>
                    <Typography level="h4" noWrap className="unit" paddingLeft={1} fontWeight={100}>{props.data.val === null ? "" : props.unit}</Typography>
                </Typography>
           <Typography startDecorator={props.icon}>{props.title}</Typography>
        </Card>
    </Tooltip>;
}

export default WeatherComponent;