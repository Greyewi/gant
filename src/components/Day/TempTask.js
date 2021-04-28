import React from "react"
import {TaskElement} from "../Task/style"

const TempTask = ({startDate, endDate, currentDate, activeTaskEdit = {}}) => {
  const {fill = '#E7BA78', border = 'solid'} = activeTaskEdit

  return (
    <TaskElement
      color={fill}
      border={border}
      isStart={currentDate === startDate}
      isEnd={currentDate === endDate}
    />
  )
}

export default TempTask