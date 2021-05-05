import {DayItem} from "./styles"
import {addDayToMonth} from "../../utils"
import {memo, useMemo} from "react"
import TempTask from './TempTask'
import moment from 'moment'
import {format} from '../../constants'
import {batch} from "react-redux"
import {doNotRerenderDaysInCurrentProcess, doNotRerenderDiffProcess} from '../../hoc/memos'
import Task from '../Task'
import {unionTwoTask} from "../../modules/tasks"

const Day = ({
               addFirstDateIntervalTask,
               firstDateInterval,
               addStartIntervalTask,
               addEndIntervalTask,
               startTempInterval,
               endTempInterval,
               processId,
               activeProcessId,
               editableTaskId,
               day,
               addNewTask,
               taskList,
               timeField
             }) => {
  const date = useMemo(() => addDayToMonth(timeField, day), [timeField, day])

  const isTempDateInsideInterval = useMemo(
    () => moment(date, format)
      .isBetween(
        moment(startTempInterval, format)
          .add(-1, 'days'),
        moment(endTempInterval, format)
          .add(1, 'days')
      ) && activeProcessId === processId,
    [date, activeProcessId, processId, endTempInterval, startTempInterval]
  )

  const currentMomentDate = useMemo(() => moment(date, format), [date])

  const isIntervalCreated = useMemo(
    () => activeProcessId === processId && endTempInterval && startTempInterval,
    [activeProcessId, processId, endTempInterval, startTempInterval]
  )

  const isCreatingNextDate = useMemo(
    () => currentMomentDate.isSameOrAfter(moment(firstDateInterval, format)),
    [currentMomentDate, firstDateInterval]
  )

  const isCreatingPrevDate = useMemo(
    () => currentMomentDate.isSameOrBefore(moment(firstDateInterval, format)),
    [currentMomentDate, firstDateInterval]
  )

  const dayTask = taskList.find(task => task.processId === processId && moment(task.dateOfStart, format).isSameOrBefore(currentMomentDate) && moment(task.dateOfEnd, format).isSameOrAfter(currentMomentDate))

  return (
    <DayItem
      onMouseEnter={isIntervalCreated ? () => {
        if (date === firstDateInterval) {
          batch(() => {
            addEndIntervalTask(date, timeField)
            addStartIntervalTask(date, timeField)
          })
          return 0
        }

        if (isCreatingNextDate) {
          addEndIntervalTask(date, timeField)
        } else if (isCreatingPrevDate) {
          addStartIntervalTask(date, timeField)
        }

      } : () => {
        if(editableTaskId) {
          addEndIntervalTask(date, timeField)
        }
      }}
      onMouseDown={() => !dayTask && addFirstDateIntervalTask(date, processId, timeField)}
      onMouseUp={() => editableTaskId ? unionTwoTask(editableTaskId, date) : addNewTask() }
    >
      {day}
      {isTempDateInsideInterval && <TempTask
        currentDate={date}
        startDate={startTempInterval}
        endDate={endTempInterval}
      />}
      {dayTask && <Task task={dayTask} date={date} processId={processId}/>}
    </DayItem>
  )
}


export default memo(memo(Day, doNotRerenderDaysInCurrentProcess), doNotRerenderDiffProcess)