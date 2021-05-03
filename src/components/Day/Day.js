import {DayItem} from "./styles"
import {addDayToMonth} from "../../utils"
import {useMemo, memo} from "react"
import TempTask from './TempTask'
import moment from 'moment'
import {format} from '../../constants'
import {batch} from "react-redux"
import {doNotRerenderDiffProcess, doNotRerenderDaysInCurrentProcess} from '../../hoc/memos'

const Day = ({
               addFirstDateIntervalTask,
               firstDateInterval,
               addStartIntervalTask,
               addEndIntervalTask,
               startTempInterval,
               endTempInterval,
               processId,
               activeProcessId,
               day,
               addNewTask,
               timeField
             }) => {
  const date = addDayToMonth(timeField, day)

  const isDateInsideInterval = useMemo(
    () => moment(date, format)
      .isBetween(
        moment(startTempInterval, format)
          .add(-1, 'days'),
        moment(endTempInterval, format)
          .add(1, 'days')
      ) && activeProcessId === processId,
    [date, activeProcessId, processId, endTempInterval, startTempInterval]
  )

  const isIntervalCreated = useMemo(
    () => activeProcessId === processId && endTempInterval && startTempInterval,
    [activeProcessId, processId, endTempInterval, startTempInterval]
  )

  const isCreatingNextDate = useMemo(
    () => moment(date, format).isSameOrAfter(moment(firstDateInterval, format)),
    [date, firstDateInterval]
  )

  const isCreatingPrevDate = useMemo(
    () => moment(date, format).isSameOrBefore(moment(firstDateInterval, format)),
    [date, firstDateInterval]
  )


  return (
    <DayItem
      onMouseEnter={isIntervalCreated ? () => {
        if(date === firstDateInterval) {
          batch(() => {
            addEndIntervalTask(date, timeField)
            addStartIntervalTask(date, timeField)
          })
          return 0
        }

        if(isCreatingNextDate){
          addEndIntervalTask(date, timeField)
        } else if(isCreatingPrevDate){
          addStartIntervalTask(date, timeField)
        }

      } : () => null}
      onMouseDown={() => addFirstDateIntervalTask(date, processId, timeField)}
      onMouseUp={addNewTask}
    >
      {day}
      {isDateInsideInterval && <TempTask
        currentDate={date}
        startDate={startTempInterval}
        endDate={endTempInterval}
      />}
    </DayItem>
  )
}



export default memo(memo(Day, doNotRerenderDaysInCurrentProcess), doNotRerenderDiffProcess)