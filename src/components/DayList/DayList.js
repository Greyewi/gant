import {DayContainer} from "./styles"
import Unit from "../Unit"
import {useMemo} from "react"
import {getDatedIntoIntervals, getUnitsArrayByInterval} from "../../utils"
import {doNotRerenderDiffProcess} from "../../hoc/memos"

const DayList = ({timeField, taskList, processId, format, unitName, unitsPerScale}) => {
  const processTaskList = useMemo(
    () => taskList.filter((f) => f.processId === processId),
    [taskList, processId]
  )

  const taskDates = getDatedIntoIntervals(processTaskList, unitName, format)
  const calcUnitsPerScale = typeof unitsPerScale === 'function' ? unitsPerScale(timeField, format) : unitsPerScale

  return (
    <DayContainer>
      {getUnitsArrayByInterval(calcUnitsPerScale).map((unit, key) => {
        return (
          <Unit
            processId={processId}
            key={key + processId + unit}
            unit={unit}
            timeField={timeField}
            taskDates={taskDates}
          />
        )
      })}
    </DayContainer>
  )
}

export default doNotRerenderDiffProcess(DayList)
