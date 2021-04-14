import React, {useCallback, useMemo} from "react"
import {TaskElement, TaskNameInput} from "./style"
import moment from 'moment'
import {format} from '../../constants'

export const CreatableTask = ({interval, currentDate, activeTaskEdit}) => {
  const {fill, border} = activeTaskEdit
  return (
    <TaskElement
      tempTask
      color={fill}
      border={border}
      isEnd={currentDate === interval[1]}
      isStart={currentDate === interval[0]}
    />
  )
}

const Task = ({isCreatable, isEditableTask, currentDate, unionTwoTask, editTask, task, taskDates, setActiveTask}) => {
  const {dateOfStart, dateOfEnd, fill, name, border, id} = task

  const isStart = currentDate === dateOfStart
  const isEnd = currentDate === dateOfEnd

  const isSecondDay = useMemo(() => currentDate === moment(dateOfStart, format).add(1, 'days').format(format), [currentDate, dateOfStart])
  const countDates = useMemo(() => taskDates.filter(f => moment(f, format) >= moment(dateOfStart, format) && moment(f, format) <= moment(dateOfEnd, format)).length, [taskDates, dateOfStart, dateOfEnd])

  return (
    <TaskElement
      fill={fill}
      isEditableTask={isEditableTask}
      border={border}
      isStart={isStart}
      isEnd={isEnd}
      onMouseUp={() => isEditableTask && setActiveTask(null)}
      onMouseEnter={() => (isStart || isEnd) && isCreatable && unionTwoTask(id, isStart ? 'start' : 'end')}
      onMouseDown={() => setActiveTask(id, isStart ? 'start' : 'end')}
    >
      {isSecondDay && <TaskNameInput
        type='text'
        value={name}
        countDates={countDates}
        isEditableTask={isEditableTask}
        onChange={(e) => editTask({...task, name: e.target.value})}
      />}
    </TaskElement>
  )
}

export default Task