import { DayContainer } from "./styles";
import Day from "../Day";
import { useMemo } from "react";
import { getDatedIntoIntervals, getUnitsArrayByInterval } from "../../utils";
import { doNotRerenderDiffProcess } from "../../hoc/memos";

const DayList = ({ timeField, taskList, activeProcessId, processId, format, unitName, unitsPerScale }) => {
  const processTaskList = useMemo(
    () => taskList.filter((f) => f.processId === processId),
    [taskList, processId]
  )

  const taskDates = getDatedIntoIntervals(processTaskList, unitName, format)

  return (
    <DayContainer isActiveDay={processId === activeProcessId}>
      {getUnitsArrayByInterval(timeField, unitsPerScale).map((unit, key) => {
        return (
          <Day
            processId={processId}
            key={key + processId + unit}
            unit={unit}
            timeField={timeField}
            taskDates={taskDates}
          />
        );
      })}
    </DayContainer>
  );
};

export default doNotRerenderDiffProcess(DayList);
