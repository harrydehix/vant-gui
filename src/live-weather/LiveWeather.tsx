import useLiveWeather from "./useLiveWeather";
import Grid from '@mui/joy/Grid';
import "./live-weather.css";
import LinearProgress from "@mui/joy/LinearProgress";
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Temperature from "./components/Temperature";
import Pressure from "./components/Pressure";
import Forecast from "./components/Forecast";
import WindDirection from "./components/WindDirection";
import WeatherComponent from "./components/WeatherComponent";
import RainRate from "./components/RainRate";
import LensBlurIcon from '@mui/icons-material/LensBlur';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LiveWeatherProps, { defaultProps } from "./LiveWeatherProps";


const LiveWeather : React.FunctionComponent<LiveWeatherProps> = (options: LiveWeatherProps): JSX.Element => {
    const [connected, currentConditions, current] = useLiveWeather(options);

    function hoursAndMinutes(time: string){
        const splitted = time.split(':');
        return {
            hour: parseInt(splitted[0]),
            minute: parseInt(splitted[1])
        }
    }

    function isItDaytime(){
        if(!currentConditions.time || !currentConditions.sunset || !currentConditions.sunrise){
            return false;
        }

        const currentTime = new Date(currentConditions.time);
        const sunsetTime = new Date(currentTime);
        const sunriseTime = new Date(currentTime);

        const sunsetHoursAndMinutes = hoursAndMinutes(currentConditions.sunset);
        sunsetTime.setHours(sunsetHoursAndMinutes.hour);
        sunsetTime.setMinutes(sunsetHoursAndMinutes.minute);

        const sunriseHoursAndMinutes = hoursAndMinutes(currentConditions.sunrise);
        sunriseTime.setHours(sunriseHoursAndMinutes.hour);
        sunriseTime.setMinutes(sunriseHoursAndMinutes.minute);

        return currentTime.getTime() >= sunriseTime.getTime() && currentTime.getTime() <= sunsetTime.getTime();
    }

    return (
        connected ? 
        <Grid className="live-weather" container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={12} sm={6} md={6} lg={6}>
                <Forecast day={isItDaytime()} title="Forecast" tooltip="Current forecast" forecast={current({field: "forecast", precision: 1})} />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={6}>
                <WindDirection title="Wind direction" tooltip="Current forecast" direction={current({field: "windDirDeg", round: true})} />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <Temperature title="Outside temperature" tooltip="Outside temperature" temperature={current({field: "tempOut", precision: 1})} unit={options.units.temperature} />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <Temperature title="Inside temperature" tooltip="Inside temperature" temperature={current({field: "tempIn", precision: 1})} unit={options.units.temperature} />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <WeatherComponent className="humidity" unit="%" icon={<LensBlurIcon />} title="Inside humidity" tooltip="Inside humidity" data={current({field: "humIn", round: true})} />
            </Grid>
            <Grid xs={12} sm={6} md={3} lg={3}>
                <WeatherComponent className="humidity" unit="%" icon={<LensBlurIcon />} title="Outside humidity" tooltip="Outside humidity" data={current({field: "humOut", round: true})} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="wind" icon={<AirIcon />} title="Speed" tooltip="Current wind speed" data={current({field: "wind", round: true})} unit={options.units.wind} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="wind" icon={<AirIcon />} title="Gust" tooltip="Maximum wind gust in the latest 10 minutes" data={current({field: "windGust", round: true})} unit={options.units.wind} />
            </Grid>
            <Grid xs={12} sm={4} md={3} lg={3}>
                <WeatherComponent className="wind" icon={<AirIcon />} title="Direction" tooltip="The current direction of the wind" data={current({field: "windDir"})} unit={""} />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <Pressure title="Pressure" tooltip="Current pressure" trend={current({field: "pressTrend"})} pressure={current({field: "press", precision: 1})} unit={options.units.pressure} />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <WeatherComponent className="time" icon={<AccessTimeIcon />} title="Latest update" tooltip="Time the latest weather data has been uploaded" data={current({field: "time", formatDateTime: "HH:MM:ss"})} unit={""} />
            </Grid>
            <Grid xs={6} sm={4} md={4} lg={3}>
                <RainRate title="Rain rate" tooltip="Current rain rate" rate={current({field: "rainRate", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="rain" icon={<WaterDropIcon />} title="Quarter" tooltip="Precipation of the latest 15 minutes" data={current({field: "rain15m", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="rain" icon={<WaterDropIcon />} title="Hour" tooltip="Precipation of the latest 60 minutes" data={current({field: "rain1h", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="rain" icon={<WaterDropIcon />} title="Day" tooltip="Precipation of the current day" data={current({field: "rainDay", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={12} sm={4} md={3} lg={3}>
                <WeatherComponent className="rain" icon={<WaterDropIcon />} title="Month" tooltip="Precipation of the current month" data={current({field: "rainMonth", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={12} sm={4} md={3} lg={3}>
                <WeatherComponent className="rain" icon={<WaterDropIcon />} title="Year" tooltip="Precipation of the current year" data={current({field: "rainYear", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={12} sm={4} md={3} lg={3}>
                <WeatherComponent className="rain" icon={<WaterDropIcon />} title="Latest shower" tooltip="Precipation of the latest shower / storm" data={current({field: "stormRain", precision: 1})} unit={options.units.rain} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="sun sunrise" icon={<><WbTwilightIcon /><ArrowUpwardIcon/></>} title="Sunrise" tooltip="Today's sunrise time" data={current({field: "sunrise"})} unit={""} />
            </Grid>
            <Grid xs={6} sm={4} md={3} lg={3}>
                <WeatherComponent className="sun sunset" icon={<><WbTwilightIcon /><ArrowDownwardIcon/></>} title="Sunset" tooltip="Today's sunset time" data={current({field: "sunset"})} unit={""} />
            </Grid>
        </Grid>
        : 
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "100vh" }}
        >
            <Stack justifyContent="center"
            alignItems="center">
                <LinearProgress style={{width: "100%"}}/>
                <Typography level="title-lg" fontWeight={100} paddingTop={5}>Connecting to weather api...</Typography>
            </Stack>
        </Stack>
    );
}

LiveWeather.defaultProps = defaultProps;

export default LiveWeather;