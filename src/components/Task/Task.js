import React, {useState, useMemo, useEffect} from "react";
import {TaskElement, TaskInput} from "./style";
import moment from "moment"
import {enumerateDaysBetweenDates} from "../../utils"
import {format} from "../../constants";

const Task = ({task, date, unionTask, firstDate, editTask}) => {
    const {id, processId, name, dateOfStart, dateOfEnd, taskColor} = task
    const isStart = date === dateOfStart
    const isEnd = date === dateOfEnd
    const isSecondDay = useMemo(
        () => moment(dateOfStart, format).add(1, "days").format(format) === date,
        [dateOfStart, date]
    )
    const countDates = useMemo(() => enumerateDaysBetweenDates(dateOfStart, dateOfEnd),[dateOfStart, dateOfEnd])
    const [taskName, setTaskName] = useState(name)
    useEffect(() => {
        editTask({...task, name: taskName})
    }, [editTask, taskName])

    return <TaskElement
        isStart={isStart}
        isEnd={isEnd}
        taskColor={taskColor}
        onMouseEnter={() => {
            if(firstDate) unionTask(id)
        }}
    >
        {isSecondDay && <TaskInput
            type="text"
            value={taskName}
            countDates={countDates.length}
            onChange={(e) => setTaskName(e.target.value)}
            /*onChange={(e) => editTask({...task, name: e.target.value})}*/

        />}
    </TaskElement>
}

export default Task