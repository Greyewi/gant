export const doNotRerenderDiffProcess = (prevProps, nextProps) => {
  if((!prevProps.activeProcessId && !prevProps.processId) || (!nextProps.activeProcessId && !nextProps.processId)) {
    return false
  }

  if(prevProps.activeProcessId === prevProps.processId || nextProps.activeProcessId === nextProps.processId){
    return false
  }

  return true
}