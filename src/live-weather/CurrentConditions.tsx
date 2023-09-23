import { RichRealtimeData } from "vant-environment/structures";

export default interface CurrentConditions extends Omit<RichRealtimeData, "time" | "stormStartDate">{
    time: string | null,
    stormStartDate: string | null,
}