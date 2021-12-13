import {memo} from "react"

export const doNotRerenderDiffProcess = (component) =>
  memo(component, (prevProps, nextProps) => {

    if (
      (!prevProps.activeProcessId && !prevProps.processId) ||
      (!nextProps.activeProcessId && !nextProps.processId)
    ) {
      return false
    }

    if (prevProps.activeScales.from !== nextProps.activeScales.from ||
      prevProps.activeScales.to !== nextProps.activeScales.to) {
      return false
    }

    return prevProps.activeProcessId !== prevProps.processId &&
      nextProps.activeProcessId !== nextProps.processId &&
      (!prevProps.isOpenTaskFormId && !nextProps.isOpenTaskFormId);
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
