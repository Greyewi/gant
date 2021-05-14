import {DayItem} from "./styles"
import {addDayToMonth} from "../../utils"
import {useCallback, useMemo} from "react"
import TempTask from "./TempTask"
import moment from "moment"
import {format} from "../../constants"
import {batch} from "react-redux"
import {doNotRerenderDiffProcess} from "../../hoc/memos"
import Task from "../Task"

const Day = ({
               addFirstDateIntervalTask,
               editTask,
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
               timeField,
             }) => {
  const date = useMemo(() => addDayToMonth(timeField, day), [timeField, day])

  const isTempDateInsideInterval = useMemo(
    () =>
      moment(date, format).isBetween(
        moment(startTempInterval, format).add(-1, "days"),
        moment(endTempInterval, format).add(1, "days")
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

  const dayTask = useMemo(() => taskList.find(
    (task) =>
      task.processId === processId &&
      moment(task.dateOfStart, format).isSameOrBefore(currentMomentDate) &&
      moment(task.dateOfEnd, format).isSameOrAfter(currentMomentDate)
  ), [currentMomentDate, taskList, processId])

  const handleTaskEdit = useCallback(() => {
    const editTaskData = taskList.find(f => f.id === editableTaskId)
    editTask({...editTaskData, dateOfStart: startTempInterval, dateOfEnd: endTempInterval})
  }, [taskList, editableTaskId, startTempInterval, endTempInterval, editTask])

  const handleChangeInterval = useCallback(() => {
    if (isIntervalCreated) {
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
    }
  }, [
    isIntervalCreated,
    date,
    timeField,
    firstDateInterval,
    isCreatingNextDate,
    isCreatingPrevDate,
    addEndIntervalTask,
    addStartIntervalTask
  ])

  return (
    <DayItem
      onMouseEnter={() => {
        editableTaskId && console.log("DAY CHANGE")
        handleChangeInterval()
      }}
      onMouseDown={() =>
        !dayTask && addFirstDateIntervalTask(date, processId, timeField)
      }
      onMouseUp={() =>
        editableTaskId ? handleTaskEdit() : addNewTask()
      }
    >
      {day}
      {isTempDateInsideInterval && !dayTask && (
        <TempTask
          currentDate={date}
          startDate={startTempInterval}
          endDate={endTempInterval}
        />
      )}
      {dayTask && <Task handleChangeInterval={handleChangeInterval} task={dayTask} date={date} processId={processId}/>}
    </DayItem>
  )
}

export default doNotRerenderDiffProcess(Day)
