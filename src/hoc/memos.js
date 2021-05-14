import { memo } from "react";

export const doNotRerenderDiffProcess = (component) =>
  memo(component, (prevProps, nextProps) => {
    if (
      (!prevProps.activeProcessId && !prevProps.processId) ||
      (!nextProps.activeProcessId && !nextProps.processId)
    ) {
      return false;
    }

    if (
      prevProps.activeProcessId !== prevProps.processId &&
      nextProps.activeProcessId !== nextProps.processId
    ) {
      return true;
    }

    return false;
  });

export const doNotRerenderDaysInCurrentProcess = (prevProps, nextProps) => {
  if (prevProps.activeMonthsList.size !== nextProps.activeMonthsList.size) {
    return false;
  }
  if (
    prevProps.activeMonthsList.has(prevProps.timeField) &&
    nextProps.activeMonthsList.has(nextProps.timeField)
  ) {
    return false;
  }
  return true;
};
