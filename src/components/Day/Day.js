import {DayItem} from "./styles"
import {addDayToMonth} from "../../utils"
import {useMemo} from "react"
import TempTask from './TempTask'
import moment from 'moment'
import {format} from '../../constants'
import {batch} from "react-redux"

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
  const date = useMemo(() => addDayToMonth(timeField, day), [timeField, day])

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
            addEndIntervalTask(date)
            addStartIntervalTask(date)
          })
          return 0
        }

        if(isCreatingNextDate){
          addEndIntervalTask(date)
        } else if(isCreatingPrevDate){
          addStartIntervalTask(date)
        }

      } : () => null}
      onMouseDown={() => addFirstDateIntervalTask(date, processId)}
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

export default Day