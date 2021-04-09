import React from "react"
import {TaskElement} from "./style";

const Task = ({interval, currentDate, day, handleMouseOver, activeTaskEdit}) => {
  const {fill, border} = activeTaskEdit
    return (
          <TaskElement
            color={fill}
            border={border}
            isEnd={currentDate === interval[1]}
            isStart={currentDate === interval[0]}
            onMouseOver={() => handleMouseOver(currentDate, day)}
          />
    )
}

export default Task