import React, {useMemo, useState} from "react"
import {TaskElement, TaskNameInput} from "./style"
import moment from 'moment'
import {format} from '../../constants'
import {enumerateDaysBetweenDates} from '../../utils'

const Task = ({date, task, editableTaskId, firstDateInterval, setActiveTask, unionTwoTask, editTask, processId}) => {
  const {dateOfStart, dateOfEnd, fill, border, name, id} = task

  const isStart = date === dateOfStart
  const isEnd = date === dateOfEnd

  const isSecondDay = useMemo(() => date === moment(dateOfStart, format).add(1, 'days').format(format), [date, dateOfStart])
  const countDates = useMemo(() => enumerateDaysBetweenDates(dateOfStart, dateOfEnd), [dateOfStart, dateOfEnd])

  const isEditableTask = editableTaskId === id
  const [taskName, setTaskName] = useState(name)

  return (
    <TaskElement
      fill={fill}
      border={border}
      isStart={isStart}
      isEnd={isEnd}
      onMouseUp={() => isEditableTask && setActiveTask(null)}
      onMouseEnter={() => {
        if(firstDateInterval){
          unionTwoTask(id, moment(date, format).isAfter(moment(firstDateInterval, format)) ? 'start' : 'end')
        }
      }}
      onMouseDown={() => (isStart || isEnd) && setActiveTask(id, processId)}
    >
      {isSecondDay && <TaskNameInput
        type='text'
        value={taskName}
        countDates={countDates.length}
        isEditableTask={isEditableTask}
        onChange={e => setTaskName(e.target.value)}
        onBlur={() => editTask({...task, name: taskName})}
      />}
    </TaskElement>
  )
}

export default Task