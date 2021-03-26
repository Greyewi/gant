import moment from "moment"

export const addPreviousMonth = (array) => {
    return [moment(array, "DD-MM-YYYY").subtract(1, "months").format("DD-MM-YYYY"), ...array]
}

export const addNextMonth = (array) => {
    return [...array, moment(array, "DD-MM-YYYY").add(array.length, "months").format("DD-MM-YYYY")]
}