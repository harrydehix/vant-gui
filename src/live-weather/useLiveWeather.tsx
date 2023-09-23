import React, { useState, useEffect } from "react";
import superagent from "superagent";
import CurrentConditions from "./CurrentConditions";
import LiveWeatherData from "./LiveWeatherData";
import dateFormat from "dateformat";
import LiveWeatherProps from "./LiveWeatherProps";

const useLiveWeather = (options : LiveWeatherProps) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [currentConditions, setCurrentConditions] = useState<CurrentConditions>({
        altimeter: null,
        chill: null,
        consoleBatteryVoltage: null,
        dewpoint: null,
        etDay: null,
        etMonth: null,
        etYear: null,
        forecast: null,
        forecastID: null,
        forecastRule: null,
        heat: null,
        humExtra:
            [null, null, null, null, null, null, null],
        humIn: null,
        humOut: null,
        leafTemps:
            [null, null, null, null],
        leafWetnesses:
            [null, null, null, null],
        press: null,
        pressAbs: null,
        pressCalibrationOffset: null,
        pressRaw: null,
        pressReductionMethod: null,
        pressReductionMethodID: null,
        pressTrend: null,
        pressTrendID: null,
        pressUserOffset: null,
        rain15m: null,
        rain1h: null,
        rain24h: null,
        rainDay: null,
        rainMonth: null,
        rainRate: null,
        rainYear: null,
        soilMoistures:
            [null, null, null, null],
        soilTemps:
            [null, null, null, null],
        solarRadiation: null,
        stormRain: null,
        stormStartDate: null,
        sunrise: null,
        sunset: null,
        tempExtra:
            [null, null, null, null, null, null, null],
        tempIn: null,
        tempOut: null,
        thsw: null,
        time: null,
        transmitterBatteryStatus: null,
        uv: null,
        wind: null,
        windAvg10m: null,
        windAvg2m: null,
        windDir: null,
        windDirDeg: null,
        windGust: null,
        windGustDir: null,
        windGustDirDeg: null,
    });

    const current = (currentOptions: {field: keyof CurrentConditions, formatDateTime?: string, round?: boolean, precision?: number, index?: number, nullReplacementString?: string, nullReplacement?: React.ReactNode}) => {
        let result = currentConditions[currentOptions.field];

        if(result instanceof Array){
            result = result[currentOptions.index || 0];
        }

        const raw = result;

        if(typeof result === "string" && currentOptions.formatDateTime){
            result = dateFormat(new Date(result), currentOptions.formatDateTime)
        }

        if(typeof result === "number"){
            if(currentOptions.round){
                result = Math.round(result);
            }else if(currentOptions.precision && typeof result === "number"){
                result = result.toFixed(currentOptions.precision);
            }
        }
        

        let node: React.ReactNode = result;

        if(result === null){
            node = currentOptions.nullReplacement !== undefined ? currentOptions.nullReplacement : options.nullReplacement;
            result = (currentOptions.nullReplacementString !== undefined ? currentOptions.nullReplacementString : options.nullReplacementString)!;
        }

        return {
            val: raw,
            str: result.toString(),
            node: node,
        };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            superagent
                .get(options.api + "/v1/current")
                .query({ rainUnit: options.units.rain })
                .query({ windUnit: options.units.wind })
                .query({ pressureUnit: options.units.pressure })
                .query({ solarRadiationUnit: options.units.solarRadiation })
                .query({ temperatureUnit: options.units.temperature })
                .set('accept', 'json')
                .set('x-api-key', options.apiKey)
                .timeout(1000)
                .end((err?: superagent.ResponseError, res?: superagent.Response) => {
                    if (!res || !res.ok) {
                        console.error("Failed to get realtime record!");
                        if (res && res.body && res.body.message) {
                            console.error("Server message: '" + res.body.message + "'");
                        } else {
                            console.error("Is your api running?");
                        }
                        setConnected(false);
                    } else if (res && res.body && res.body.data) {
                        setConnected(true);
                        setCurrentConditions(res.body.data);
                    } else {
                        setConnected(false);
                        console.error("Failed to get realtime record!");
                    }
                });
        }, options.interval! * 1000);

        return () => clearInterval(interval);
    }, [options.api, options.interval, options.apiKey, options.units.pressure, options.units.rain, options.units.solarRadiation, options.units.temperature, options.units.wind]);

    return [connected, currentConditions, current] as [
        boolean,
        CurrentConditions, 
        (
            options: {field: keyof CurrentConditions, formatDateTime?: string, round?: boolean, precision?: number, index?: number, nullReplacementString?: string, nullReplacement?: React.ReactNode}
        ) => LiveWeatherData<any>
    ];
}

export default useLiveWeather;