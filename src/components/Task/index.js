import React from "react"
import {TaskElement} from "./style";

const Task = ({interval, color, name, status, currentDate, day, handleMouseOver, ...rest}) => {
    return (
          <TaskElement
            color={color}
            isEnd={currentDate === interval[1]}
            isStart={currentDate === interval[0]}
            onMouseOver={() => handleMouseOver(currentDate, day)}
          >
            {name}
          </TaskElement>
    )
}

export default Task