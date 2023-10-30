import { IAsignature } from "../interfaces/interfaces"
export default function SortByHour(a: IAsignature, b: IAsignature){
    return a.hour - b.hour
}