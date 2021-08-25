import moment from "moment"

export const addPreviousMonth = (array, format) => {
  return [moment(array, format).subtract(1, "months").format(format), ...array]
}

export const addNextMonth = (array, format) => {
  return [
    ...array,
    moment(array, format).add(array.length, "months").format(format),
  ]
}

export const getUnitsArrayByInterval = (unitsPerScale) => {
  const arr = []

  for (let i = 1; i <= unitsPerScale; i++) {
    const strI = String(i)
    arr.push(strI.length === 1 ? "0" + strI : strI)
  }
  return arr
}

export const addUnitToScale = (date, unitName, unit, format) => {
  if (unitName === 'days') {
    return moment(date, format).set("date", unit).format(format)
  }
  return moment(date, format).set(unitName, unit).format(format)
}

export function getCoords(elem) {
  const box = elem.getBoundingClientRect()
  return {
    top: box.top + window.pageYOffset + elem.clientHeight,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
    width: box.width,
    height: box.height,
  }
}

export const setFormatDateFromHTMLtoMain = (inputValue, format) =>
  moment(inputValue, "yyyy-MM-DD").format(format)

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const enumerateDaysBetweenDates = (startDate, endDate, unitName, format) => {
  const dates = []
  const currDate = moment(startDate, format).startOf(unitName.slice(0, -1)).add(-1, unitName)
  const lastDate = moment(endDate, format).startOf(unitName.slice(0, -1))
  while (currDate.add(1, unitName).diff(lastDate) <= 1) {
    dates.push(currDate.clone().format(format))
  }
  return dates
}

export const getDatedIntoIntervals = (list = [], unitName, format) => {
  const dates = list.map((item) =>
    enumerateDaysBetweenDates(item.dateOfStart, item.dateOfEnd, unitName, format)
  )
  return dates && dates.length ? dates.flat(1) : []
}

export const isThereActiveScale = (activeScales, currentScale) => activeScales.from <= currentScale && activeScales.to >= currentScale