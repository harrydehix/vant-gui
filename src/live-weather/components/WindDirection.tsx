import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import React from 'react';
import LiveWeatherData from '../LiveWeatherData';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import { BSCompass } from '@icongo/bs/lib/BSCompass';

import { BSArrowUpCircleFill } from '@icongo/bs/lib/BSArrowUpCircleFill';

import Stack from '@mui/joy/Stack';


const Rain : React.FunctionComponent<{
    direction: LiveWeatherData<number | null>,
    title: React.ReactNode,
    tooltip: string,
}> = ({direction, tooltip, title}) => {

    const style = {
        fontSize: "8rem",
        padding: "1rem",
        rotate: direction.val ? `${direction.val + 180}deg` : "0deg",
        transition: "all 0.2s"
    };

    return <Tooltip title={tooltip} variant="outlined">
        <Card className={`wind live-component ${direction.val === null ? "no-data" : ""}`}>  
            <Stack justifyContent={"center"} alignItems={"center"}>
                <Typography textAlign={"left"} noWrap>
                    {direction.val !== null ? <BSArrowUpCircleFill style={style} />: <SensorsOffIcon style={style} />}
                </Typography>
            </Stack>
           <Typography startDecorator={<BSCompass/ >}>{title}</Typography>
        </Card>
    </Tooltip>;
}

export default Rain;