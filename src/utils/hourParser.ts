import { Thours, Tminutes } from "../interfaces/interfaces"
export default function hoursParser(hour: Thours, minutes: Tminutes): Date {
    const date_now = new Date()
    date_now.setHours(hour, minutes, 0)
    return date_now
}