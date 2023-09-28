import React from "react";
import LiveWeather from './live-weather/LiveWeather';
import { useColorScheme } from '@mui/joy/styles';
import { RainUnit, RainUnits, WindUnit, WindUnits, TemperatureUnit, TemperatureUnits, PressureUnit, PressureUnits, SolarRadiationUnits, SolarRadiationUnit } from "vant-environment/units";
import validator from "validator";

const App: React.FunctionComponent<{}> = () => {
    const { mode, setMode } = useColorScheme();
    setMode("dark");

    function validateEnvironmentVariables(){
        const api = process.env.REACT_APP_API;
        const apiKey = process.env.REACT_APP_API_KEY;
        const pressureUnit = process.env.REACT_APP_PRESSURE_UNIT;
        const rainUnit = process.env.REACT_APP_RAIN_UNIT;
        const temperatureUnit = process.env.REACT_APP_TEMPERATURE_UNIT;
        const windUnit = process.env.REACT_APP_WIND_UNIT;
        const solarRadiationUnit = process.env.REACT_APP_SOLAR_RADIATION_UNIT;

        if(!api || !validator.isURL(api, { require_tld: false })){
            throw new Error("Invalid or missing environment variable: REACT_APP_API. Pleace specify the url to your running vant-api!");
        }

        if(!apiKey){
            throw new Error("Missing environment variable: REACT_APP_API_KEY. Pleace specify the key to access weather data from your running vant-api!");
        }

        if(!pressureUnit || !validator.isIn(pressureUnit, PressureUnits)){
            throw new Error("Invalid or missing environment variable: REACT_APP_PRESSURE_UNIT. Please specify a supported unit!");
        }

        if(!rainUnit || !validator.isIn(rainUnit, RainUnits)){
            throw new Error("Invalid or missing environment variable: REACT_APP_RAIN_UNIT. Please specify a supported unit!");
        }

        if(!windUnit || !validator.isIn(windUnit, WindUnits)){
            throw new Error("Invalid or missing environment variable: REACT_APP_WIND_UNIT. Please specify a supported unit!");
        }

        if(!solarRadiationUnit || !validator.isIn(solarRadiationUnit, SolarRadiationUnits)){
            throw new Error("Invalid or missing environment variable: REACT_APP_SOLAR_RADIATION_UNIT. Please specify a supported unit!");
        }

        if(!temperatureUnit || !validator.isIn(temperatureUnit, TemperatureUnits)){
            throw new Error("Invalid or missing environment variable: REACT_APP_TEMPERATURE_UNIT. Please specify a supported unit!");
        }
    }
    validateEnvironmentVariables();

    return <LiveWeather
            api={process.env.REACT_APP_API!}
            apiKey={process.env.REACT_APP_API_KEY!}
            units={{
                pressure: process.env.REACT_APP_PRESSURE_UNIT as PressureUnit,
                rain: process.env.REACT_APP_RAIN_UNIT as RainUnit,
                temperature: process.env.REACT_APP_TEMPERATURE_UNIT as TemperatureUnit,
                wind: process.env.REACT_APP_WIND_UNIT as WindUnit,
                solarRadiation: process.env.REACT_APP_SOLAR_RADIATION_UNIT as SolarRadiationUnit,
            }}
            maximumUpdateFailCount={3}
            interval={1}
        />
}

export default App;