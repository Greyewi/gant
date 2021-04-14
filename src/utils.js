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


export function getCoords(elem) {
    const box = elem.getBoundingClientRect()
    return {
        top: box.top + window.pageYOffset + elem.clientHeight,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset,
        width: box.width,
        height: box.height
    }
}

export const setFormatDateFromHTMLtoMain = (inputValue) => moment(inputValue, 'yyyy-MM-DD').format(format)

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const enumerateDaysBetweenDates = (startDate, endDate) => {
    const dates = []
    const currDate = moment(startDate, format).startOf('day').add(-1, 'days')
    const lastDate = moment(endDate, format).startOf('day')
    while (currDate.add(1, 'days').diff(lastDate) <= 1) {
        dates.push(currDate.clone().format(format))
    }
    return dates
}

export const getDatedIntoIntervals = (list = []) => {
    const dates = list.map((item) => enumerateDaysBetweenDates(item.dateOfStart, item.dateOfEnd))
    return dates && dates.length ? dates.flat(1) : []
}
