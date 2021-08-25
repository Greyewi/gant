import {memo} from "react"

export const doNotRerenderDiffProcess = (component) =>
  memo(component, (prevProps, nextProps) => {

    if (
      (!prevProps.activeProcessId && !prevProps.processId) ||
      (!nextProps.activeProcessId && !nextProps.processId)
    ) {
      return false
    }

    if (
      prevProps.activeProcessId !== prevProps.processId &&
      nextProps.activeProcessId !== nextProps.processId &&
      (!prevProps.isOpenTaskFormId && !nextProps.isOpenTaskFormId)
    ) {
      return true
    }

    return false
  })

export const doNotRerenderDaysInCurrentProcess = (prevProps, nextProps) => {
  if (prevProps.activeMonthsList.size !== nextProps.activeMonthsList.size) {
    return false
  }
  if (
    prevProps.activeMonthsList.has(prevProps.timeField) &&
    nextProps.activeMonthsList.has(nextProps.timeField)
  ) {
    return false
  }
  return true
}

export const doNotRerenderNotActiveScales = (prevProps, nextProps) => {
  if (nextProps && nextProps.isActiveScale === false) {
    return false
  }
  return false
}
