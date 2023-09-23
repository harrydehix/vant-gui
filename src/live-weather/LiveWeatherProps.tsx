import { UnitConfiguration } from "vant-environment/units";
import SensorsOffIcon from '@mui/icons-material/SensorsOff';

export default interface LiveWeatherProps{
    units: UnitConfiguration,
    interval?: number,
    api: string,
    nullReplacement?: React.ReactNode,
    nullReplacementString?: string,
    apiKey: string,
}

export const defaultProps: Partial<LiveWeatherProps> = {
    interval: 1,
    nullReplacement: <SensorsOffIcon fontSize="inherit" />,
    nullReplacementString: "No data"
}
