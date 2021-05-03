export const doNotRerenderDiffProcess = (prevProps, nextProps) => {
  if((!prevProps.activeProcessId && !prevProps.processId) || (!nextProps.activeProcessId && !nextProps.processId)) {
    return false
  }

  if(prevProps.activeProcessId === prevProps.processId || nextProps.activeProcessId === nextProps.processId){
    return false
  }

  return true
}

export const doNotRerenderDaysInCurrentProcess = (prevProps, nextProps) => {
  if(prevProps.activeMonthsList.size !== nextProps.activeMonthsList.size) {
    return false
  }
  if(prevProps.activeMonthsList.has(prevProps.timeField) && nextProps.activeMonthsList.has(nextProps.timeField)){
    return false
  }
  return true
}