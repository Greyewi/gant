import {DayContainer} from "./styles"
import Day from "../Day"
import {useMemo} from "react"
import {getDatedIntoIntervals, getDaysArrayByMonth} from '../../utils'

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

export default DayList