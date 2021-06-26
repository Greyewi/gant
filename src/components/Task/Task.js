import React, {useCallback, useMemo, useState} from "react"
import {TaskElement, TaskNameInput} from "./style"
import moment from "moment"
import {enumerateDaysBetweenDates} from "../../utils"

const Task = ({
                unitName,
                format,
                date,
                task,
                editableTaskId,
                handleChangeInterval,
                startTempInterval,
                endTempInterval,
                firstDateInterval,
                setActiveTask,
                unionTwoTask,
                editTask,
              }) => {
  const {dateOfStart, dateOfEnd, fill, border, name, id} = task

  const isStart = date === dateOfStart
  const isEnd = date === dateOfEnd

  const isSecondDay = useMemo(
    () => date === moment(dateOfStart, format).add(1, unitName).format(format),
    [date, dateOfStart, format, unitName]
  )

  const countDates = useMemo(
    () => enumerateDaysBetweenDates(dateOfStart, dateOfEnd, unitName, format),
    [dateOfStart, dateOfEnd, format, unitName]
  )

  const isEditableTask = editableTaskId === id
  const [taskName, setTaskName] = useState(name)

  const handleEditTask = useCallback(() => {
    let changedInterval = null
    if (firstDateInterval === task.dateOfStart) {
      changedInterval = {...task, dateOfStart: endTempInterval}
    } else if (firstDateInterval === task.dateOfEnd) {
      changedInterval = {...task, dateOfEnd: startTempInterval}
    }

    isEditableTask && editTask(changedInterval)
  }, [isEditableTask, editTask, task, startTempInterval, endTempInterval, firstDateInterval])

  const isEditedInterval = useMemo(
    () => isEditableTask && (moment(date, format).isBefore(moment(startTempInterval, format)) || moment(date, format).isAfter(moment(endTempInterval, format))),
    [date, startTempInterval, endTempInterval, isEditableTask, format]
  )

  return (
    <TaskElement
      fill={fill}
      isEditableTask={isEditableTask}
      isEditedInterval={isEditedInterval}
      border={border}
      isStart={isStart}
      isEnd={isEnd}
      id={isStart ? id : ''}
      onMouseUp={handleEditTask}
      onMouseEnter={() => {
        if (firstDateInterval && !isEditableTask) {
          unionTwoTask(
            id,
            moment(date, format).isAfter(moment(firstDateInterval, format))
              ? "start"
              : "end",
            editableTaskId
          )
        } else if (isEditableTask) {
          handleChangeInterval()
        }
      }}
      onMouseDown={() => {
        if (isStart) {
          setActiveTask(id, "start")
        }
        if (isEnd) {
          setActiveTask(id, "end")
        }
      }}
    >
      {isSecondDay && (
        <TaskNameInput
          type="text"
          value={taskName}
          countDates={countDates.length}
          isEditableTask={isEditableTask}
          onChange={(e) => setTaskName(e.target.value)}
          onBlur={() => editTask({...task, name: taskName})}
        />
      )}
    </TaskElement>
  )
}

export default Task
