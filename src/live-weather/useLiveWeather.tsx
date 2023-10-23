import React, { useState, useEffect } from "react";
import superagent from "superagent";
import LiveWeatherData from "./LiveWeatherData";
import dateFormat from "dateformat";
import LiveWeatherProps from "./LiveWeatherProps";
import { DetailedRealtimeData } from "vant-environment/structures";

const useLiveWeather = (options: LiveWeatherProps) => {
    const [failedUpdates, setFailedUpdates] = useState<number>(0);
    const [connected, setConnected] = useState<boolean>(false);
    const [realtimeData, setRealtimeData] = useState<DetailedRealtimeData>(
        new DetailedRealtimeData()
    );

    const current = (currentOptions: {
        field: keyof DetailedRealtimeData;
        formatDateTime?: string;
        round?: boolean;
        precision?: number;
        index?: number;
        nullReplacementString?: string;
        nullReplacement?: React.ReactNode;
    }) => {
        let result = realtimeData[currentOptions.field];

        if (result instanceof Array) {
            result = result[currentOptions.index || 0];
        }

        const raw = result;

        if (result instanceof Date && currentOptions.formatDateTime) {
            result = dateFormat(result, currentOptions.formatDateTime) as any;
        }

        if (typeof result === "number") {
            if (currentOptions.round) {
                result = Math.round(result);
            } else if (currentOptions.precision && typeof result === "number") {
                result = result.toFixed(currentOptions.precision) as any;
            }
        }

        let node: React.ReactNode = result?.toString();

        if (result === null) {
            node =
                currentOptions.nullReplacement !== undefined
                    ? currentOptions.nullReplacement
                    : options.nullReplacement;
            result = (
                currentOptions.nullReplacementString !== undefined
                    ? currentOptions.nullReplacementString
                    : options.nullReplacementString
            )! as any;
        }

        return {
            val: raw,
            str: result!.toString(),
            node: node,
        };
    };

    useEffect(() => {
        function updateFail() {
            setFailedUpdates(failedUpdates + 1);
            if (failedUpdates > options.maximumUpdateFailCount) {
                setConnected(false);
            }
        }

        function validUpdate() {
            setFailedUpdates(0);
            setConnected(true);
        }
        const interval = setInterval(() => {
            console.log(`Requesting weather data from '${options.api}'!`);
            superagent
                .get(options.api + "/v1/current")
                .query({ rainUnit: options.units.rain })
                .query({ windUnit: options.units.wind })
                .query({ pressureUnit: options.units.pressure })
                .query({ solarRadiationUnit: options.units.solarRadiation })
                .query({ temperatureUnit: options.units.temperature })
                .set("accept", "json")
                .set("x-api-key", options.apiKey)
                .timeout(1000)
                .end(
                    (
                        err?: superagent.ResponseError,
                        res?: superagent.Response
                    ) => {
                        if (!res || !res.ok) {
                            console.error("Failed to get realtime record!");
                            if (res && res.body && res.body.message) {
                                console.error(
                                    "Server message: '" + res.body.message + "'"
                                );
                            } else {
                                console.error("Is your api running?");
                            }
                            updateFail();
                        } else if (res && res.body && res.body.data) {
                            const data = res.body.data as DetailedRealtimeData;
                            // Convert strings to dates
                            data.time = new Date(data.time);
                            data.sunrise = data.sunrise
                                ? new Date(data.sunrise)
                                : null;
                            data.sunset = data.sunset
                                ? new Date(data.sunset)
                                : null;
                            data.stormStartDate = data.stormStartDate
                                ? new Date(data.stormStartDate)
                                : null;

                            setRealtimeData(res.body.data);
                            validUpdate();
                        } else {
                            console.error("Failed to get realtime record!");
                            updateFail();
                        }
                    }
                );
        }, options.interval! * 1000);

        return () => clearInterval(interval);
    }, [
        options.api,
        options.interval,
        options.apiKey,
        options.units.pressure,
        options.units.rain,
        options.units.solarRadiation,
        options.units.temperature,
        options.units.wind,
        options.maximumUpdateFailCount,
        failedUpdates,
    ]);

    return [connected, realtimeData, current] as [
        boolean,
        DetailedRealtimeData,
        (options: {
            field: keyof DetailedRealtimeData;
            formatDateTime?: string;
            round?: boolean;
            precision?: number;
            index?: number;
            nullReplacementString?: string;
            nullReplacement?: React.ReactNode;
        }) => LiveWeatherData<any>
    ];
};

export default useLiveWeather;
