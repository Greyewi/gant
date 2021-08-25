import {DayItem} from "./styles"
import {addUnitToScale} from "../../utils"
import {useCallback, useMemo} from "react"
import TempTask from "./TempTask"
import moment from "moment"
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
               activeScales,
               unit,
               format,
               unitName,
               addNewTask,
               taskList,
               timeField,
             }) => {
  const date = useMemo(() => addUnitToScale(timeField, unitName, unit, format), [timeField, unitName, unit, format])

  const isTempDateInsideInterval = useMemo(
    () => moment(date, format).isBetween(
      moment(startTempInterval, format).add(-1, unitName),
      moment(endTempInterval, format).add(1, unitName)
    ) && activeProcessId === processId,
    [date, activeProcessId, processId, endTempInterval, startTempInterval, format, unitName]
  )

  const currentMomentDate = useMemo(() => moment(date, format), [date, format])

  const isIntervalCreated = useMemo(
    () => activeProcessId === processId && endTempInterval && startTempInterval,
    [activeProcessId, processId, endTempInterval, startTempInterval]
  )

  const isCreatingNextDate = useMemo(
    () => currentMomentDate.isSameOrAfter(moment(firstDateInterval, format)),
    [currentMomentDate, firstDateInterval, format]
  )

  const isCreatingPrevDate = useMemo(
    () => currentMomentDate.isSameOrBefore(moment(firstDateInterval, format)),
    [currentMomentDate, firstDateInterval, format]
  )

  const dayTask = useMemo(() => taskList.find(
    (task) =>
      task.processId === processId &&
      moment(task.dateOfStart, format).isSameOrBefore(currentMomentDate) &&
      moment(task.dateOfEnd, format).isSameOrAfter(currentMomentDate)
  ), [currentMomentDate, taskList, processId, format])

  const handleTaskEdit = useCallback(() => {
    const editTaskData = {...taskList.find(f => f.id === editableTaskId)}

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
        handleChangeInterval()
      }}
      onMouseDown={() =>
        !dayTask && addFirstDateIntervalTask(date, processId, timeField)
      }
      onMouseUp={() =>
        editableTaskId ? handleTaskEdit() : addNewTask()
      }
    >
      {unit}
      {isTempDateInsideInterval && !dayTask && (
        <TempTask
          currentDate={date}
          startDate={startTempInterval}
          endDate={endTempInterval}
        />
      )}
      {dayTask && <Task
        handleChangeInterval={handleChangeInterval}
        task={dayTask}
        date={date}
        processId={processId}
        activeScales={activeScales}/>}
    </DayItem>
  )
}

export default doNotRerenderDiffProcess(Day)
