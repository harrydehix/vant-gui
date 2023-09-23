import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import React from 'react';
import { RainUnit } from "vant-environment/units";
import LiveWeatherData from '../LiveWeatherData';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TextTransition, { presets } from 'react-text-transition';

const Rain : React.FunctionComponent<{
    rate: LiveWeatherData<number | null>,
    title: React.ReactNode,
    tooltip: string,
    unit: RainUnit
}> = ({rate, tooltip, title, unit}) => {

    function rainRateIcon(){
        if(rate.val === null || rate.val === 0.0){
            return <UmbrellaIcon />;
        }else{
            return <BeachAccessIcon />;
        }
    }

    return <Tooltip title={tooltip} variant="outlined">
        <Card className={`rain-rate live-component ${rate.val === null ? "no-data" : ""}`}>  
            <Typography textAlign={"left"} noWrap>
                    <Typography level="h1" noWrap className="value">
                        <TextTransition springConfig={presets.stiff} inline>{rate.node}</TextTransition>
                    </Typography>
                    <Typography level="h4" noWrap className="unit" paddingLeft={1} fontWeight={100}>{rate.val === null ? "" : unit + "/h"}</Typography>
                </Typography>
           <Typography startDecorator={rainRateIcon()}>{title}</Typography>
        </Card>
    </Tooltip>;
}

export default Rain;