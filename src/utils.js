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
        if(i < 10){
            arr.push("0" + i)
        } else {
            arr.push(i)
        }

    }
    return arr
}

export const changeDayOfMonth = (month, day) => {
    const dArr = month.split('-')
    dArr[0] = day
    return dArr.join('-')
}

export const deleteItemFromList = (list, id) => {
    return  list.filter(f => f.id !== id)
}

export const modifyListByObject = (list, object) => {
    return  list.map(item => {
        if(item.id === object.id){
            return {...item, ...object}
        }
        return item
    })
}

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const addDayToMonth = (month, day) => {
    const dArr = month.split('-')
    dArr[0] = day
    return dArr.join('-')
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

