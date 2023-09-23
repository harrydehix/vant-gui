import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import React, { useRef, useState } from 'react';
import LiveWeatherData from '../LiveWeatherData';
import CurrentConditions from '../CurrentConditions';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { BSSunFill } from '@icongo/bs/lib/BSSunFill';
import { BSCloudSnowFill } from '@icongo/bs/lib/BSCloudSnowFill';
import { BSCloudHailFill } from '@icongo/bs/lib/BSCloudHailFill';
import { BSCloudRainFill } from '@icongo/bs/lib/BSCloudRainFill';
import { BSCloudsFill } from '@icongo/bs/lib/BSCloudsFill';
import { BSCloudSunFill } from '@icongo/bs/lib/BSCloudSunFill';
import Stack from '@mui/joy/Stack';
import CardContent from '@mui/joy/CardContent';
import CardBackgroundVideo from "./CardBackgroundVideo";

const Forecast : React.FunctionComponent<{
    forecast: LiveWeatherData<CurrentConditions["forecast"]>,
    title: React.ReactNode,
    tooltip: string,
    day: boolean,
}> = ({forecast, tooltip, title, day}) => {

    const style = {
        fontSize: "8.55rem",
        padding: "1rem",
    };

    function forecastIcon(){
        switch(forecast.val){
            case null:
                return <SensorsOffIcon style={style}/>;
            case "Partly Cloudy": return <BSCloudSunFill style={style} />
            case "Mostly Cloudy": return <BSCloudsFill style={style}/>
            case "Mostly Cloudy, Rain within 12 hours": return <BSCloudRainFill style={style}/>
            case "Mostly Cloudy, Snow within 12 hours": return <BSCloudSnowFill style={style}/> 
            case "Mostly Cloudy, Rain or Snow within 12 hours": return <BSCloudHailFill style={style}/>; 
            case "Partly Cloudy, Rain within 12 hours": return <BSCloudRainFill style={style}/>
            case "Partly Cloudy, Rain or Snow within 12 hours": return <BSCloudHailFill style={style}/>
            case "Partly Cloudy, Snow within 12 hours": return <BSCloudSnowFill style={style}/>; 
            case "Mostly Clear": return <BSSunFill style={style}/>;
            default:
                return ""
        }
    }

    function forecastVideo(){
        switch(forecast.val){
            case "Mostly Clear": return day ? "partly-cloudy-day-loop.mp4" : "partly-cloudy-night-loop.mp4";
            case "Partly Cloudy": return day ? "partly-cloudy-day-loop.mp4" : "partly-cloudy-night-loop.mp4";
            case "Mostly Cloudy": return day ? "mostly-cloudy-loop.mp4" : "mostly-cloudy-night-loop.mpg";
            case "Mostly Cloudy, Rain within 12 hours": return "rain-loop.mp4"
            case "Mostly Cloudy, Snow within 12 hours": return "snow-loop.mp4"
            case "Mostly Cloudy, Rain or Snow within 12 hours": return "snowrain-loop.mp4"
            case "Partly Cloudy, Rain within 12 hours": return "rain-sun-loop.mp4"
            case "Partly Cloudy, Rain or Snow within 12 hours": return "snowrain-loop.mp4"
            case "Partly Cloudy, Snow within 12 hours": return "snow-sun-loop.mp4"; 
            default:
                return ""
        }
    }

    function forecastPoster(){
        switch(forecast.val){
            case null:
                return "";
            case "Mostly Clear": return day ? "partly-cloudy-day.jpg" : "partly-cloudy-night.jpg";
            case "Partly Cloudy": return day ? "partly-cloudy-day.jpg" : "partly-cloudy-night.jpg";
            case "Mostly Cloudy": return day ? "mostly-cloudy-day.jpg" : "mostly-cloudy-night.jpg";
            case "Mostly Cloudy, Rain within 12 hours": return "rain.jpg"
            case "Mostly Cloudy, Snow within 12 hours": return "snow.jpg"
            case "Mostly Cloudy, Rain or Snow within 12 hours": return "snowrain.jpg"
            case "Partly Cloudy, Rain within 12 hours": return "rain-sun.jpg"
            case "Partly Cloudy, Rain or Snow within 12 hours": return "snowrain.jpg"
            case "Partly Cloudy, Snow within 12 hours": return "snowsun.jpg"; 
            default:
                return ""
        }
    }

    return <Tooltip title={tooltip} variant="outlined">
        <Card className={`forecast live-component ${forecast.val === null ? "no-data" : ""}`}>  
            <CardBackgroundVideo opacity={0.5} url={forecastVideo()} poster={forecastPoster()} />
            <CardContent>
                <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography textAlign={"left"} noWrap>
                        {forecastIcon()}
                    </Typography>
                </Stack>
                <Typography startDecorator={<QueryStatsIcon/ >}>{title}</Typography>
            </CardContent>    
        </Card>
    </Tooltip>;
}

export default Forecast;