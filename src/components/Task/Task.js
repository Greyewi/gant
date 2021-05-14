import React, {useCallback, useMemo, useState} from "react"
import {TaskElement, TaskNameInput} from "./style"
import moment from "moment"
import {format} from "../../constants"
import {enumerateDaysBetweenDates} from "../../utils"

const Task = ({
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
    () => date === moment(dateOfStart, format).add(1, "days").format(format),
    [date, dateOfStart]
  )
  const countDates = useMemo(
    () => enumerateDaysBetweenDates(dateOfStart, dateOfEnd),
    [dateOfStart, dateOfEnd]
  )

  const isEditableTask = editableTaskId === id
  const [taskName, setTaskName] = useState(name)

  const handleEditTask = useCallback(() => {
    let changedInterval = null
    if(firstDateInterval === task.dateOfStart){
      changedInterval = {...task, dateOfStart: endTempInterval}
    } else if(firstDateInterval === task.dateOfEnd){
      changedInterval = {...task, dateOfEnd: startTempInterval}
    }
    isEditableTask && editTask(changedInterval)
  }, [isEditableTask, editTask, task, startTempInterval, endTempInterval, firstDateInterval])

  const isEditedInterval = useMemo(() => {
    if (moment(date, format).isBefore(moment(startTempInterval, format))) {
      return true
    } else if(moment(date, format).isAfter(moment(endTempInterval, format))){
      return true
    }
    return false
  }, [date, startTempInterval, endTempInterval])

  return (
    <TaskElement
      fill={fill}
      isEditableTask={isEditableTask}
      isEditedInterval={isEditedInterval}
      border={border}
      isStart={isStart}
      isEnd={isEnd}
      onMouseUp={handleEditTask}
      onMouseEnter={() => {
        if (firstDateInterval && !isEditableTask) {
          unionTwoTask(
            id,
            moment(date, format).isAfter(moment(firstDateInterval, format))
              ? "start"
              : "end"
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
