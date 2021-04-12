import React from "react"
import {TaskElement} from "./style"
import moment from 'moment'
import {format} from '../../constants'

export const CreatableTask = ({interval, currentDate, activeTaskEdit}) => {
  const {fill, border} = activeTaskEdit
  return (
    <TaskElement
      color={fill}
      border={border}
      isEnd={currentDate === interval[1]}
      isStart={currentDate === interval[0]}
    />
  )
}

const Task = ({isCreatable, startDate, endDate, currentDate, fill, name, border, id, unionTwoTask}) => {
  const isStart = currentDate === startDate
  const isEnd = currentDate === endDate
  const isSecondDay = currentDate === moment(startDate, format).add(1, 'days')

  return (
    <TaskElement
      fill={fill}
      border={border}
      isStart={isStart}
      isEnd={isEnd}
      onMouseOver={() => (isStart || isEnd) && isCreatable && unionTwoTask(id, isStart ? 'start' : 'end')}
    >
      {isSecondDay && <input type='text' value={name}/>}
    </TaskElement>
  )
}

export default Task