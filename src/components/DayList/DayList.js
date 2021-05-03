import {DayContainer} from "./styles"
import Day from "../Day"
import {useMemo, memo} from "react"
import {getDatedIntoIntervals, getDaysArrayByMonth} from '../../utils'
import {doNotRerenderDiffProcess, doNotRerenderDaysInCurrentProcess} from '../../hoc/memos'

const DayList = ({
                   timeField,
                   taskList,
                   activeProcessId,
                   processId
                 }) => {

  const processTaskList = useMemo(() => taskList.filter(f => f.processId === processId), [taskList, processId])
  const taskDates = getDatedIntoIntervals(processTaskList)

  return (
    <DayContainer
      isActiveDay={processId === activeProcessId}
    >
      {getDaysArrayByMonth(timeField).map((day, key) => {
        return <Day processId={processId} key={key + processId + day} day={day} timeField={timeField} taskDates={taskDates}/>
      })}
    </DayContainer>
  )
}

export default memo(memo(DayList, doNotRerenderDaysInCurrentProcess), doNotRerenderDiffProcess)