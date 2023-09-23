import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import React from 'react';
import { PressureUnit } from "vant-environment/units";
import CompressIcon from '@mui/icons-material/Compress';
import EastIcon from '@mui/icons-material/East';
import CurrentConditions from '../CurrentConditions';
import LiveWeatherData from '../LiveWeatherData';
import TextTransition, { presets } from 'react-text-transition';

const WindSpeed : React.FunctionComponent<{
    pressure: LiveWeatherData<number | null>,
    trend: LiveWeatherData<CurrentConditions["pressTrend"]>,
    title: React.ReactNode,
    tooltip: string,
    unit: PressureUnit
}> = ({pressure, tooltip, title, unit, trend}) => {
    function trendIcon(){
        switch(trend.val){
            case "Falling Rapidly":
                return <EastIcon style={{ rotate: "40deg" }}/>;
            case "Falling Slowly":
                return <EastIcon style={{ rotate: "20deg" }}/>;
            case "Steady":
                return <EastIcon style={{ rotate: "0deg" }}/>;
            case "Rising Slowly":
                return <EastIcon style={{ rotate: "-20deg" }}/>;
            case "Rising Rapidly":
                return <EastIcon style={{ rotate: "-40deg" }}/>;
            default:
                return <></>;
        }
    }

    return <Tooltip title={tooltip} variant="outlined">
            <Card className={`pressure live-component ${pressure.val === null ? "no-data" : ""}`} style={{width: "100%", height: "100%"}}>  
                <Typography level="h2" startDecorator={trendIcon()} textAlign={"left"} noWrap>
                        <Typography level="h1" className="value">
                            <TextTransition springConfig={presets.stiff} inline>{pressure.node}</TextTransition>
                        </Typography>
                    <Typography gutterBottom marginBottom={"-0.75rem"} level="h4" noWrap className="unit" paddingLeft={1} fontWeight={"100"}>{pressure.val === null ? "" : unit}</Typography>  
                </Typography>
            <Typography startDecorator={<CompressIcon/>}>{title} ({trend.str.toLowerCase()})</Typography>
            </Card>
    </Tooltip>;
}

export default WindSpeed;