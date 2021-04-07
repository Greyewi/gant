import moment from "moment"
import {format} from './constants'

export const addPreviousMonth = (array) => {
    return [moment(array, format).subtract(1, "months").format(format), ...array]
}

export const addNextMonth = (array) => {
    return [...array, moment(array, format).add(array.length, "months").format(format)]
}

export const getDaysArrayByMonth = (data) => {
    const days = moment(data, format).daysInMonth()
    const arr = []
    for(let i = 1; i <= days; i++){
        arr.push(i)
    }
    return arr
}

export const addDayToMonth = (month, day) => {
    const dArr = month.split('-')
    dArr[0] = day
    return dArr.join('-')
}