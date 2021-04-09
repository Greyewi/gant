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
        arr.push(i < 10 ? '0' + i : i)
    }
    return arr
}

export const addDayToMonth = (month, day) => {
    const dArr = month.split('-')
    dArr[0] = day
    return dArr.join('-')
}

export const dateIntoInterval = (date, interval) =>
  moment(date, format) >= moment(interval[0], format) && moment(date, format) <= moment(interval[1], format)


export const setFormatDateFromHTMLtoMain = (inputValue) => moment(inputValue, 'yyyy-MM-DD').format(format)