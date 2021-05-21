import {dontRenderOtherProcess} from "../../hoc/memo";
import moment from "moment";
import React, {useMemo, memo} from "react";
import {format} from '../../constants';
import Task from "../Task";
import {batch} from "react-redux";
import {TempTask, DayTaskContainer} from "./styles"


const Day = ({addStartIntervalTempTask, addEndIntervalTempTask, processId, date, addFirstDate, children, startInterval, endInterval, processIdTemp, firstDate, addNewTask, taskList}) => {
    const isDateInsideInterval = useMemo(() => moment(date, format).isBetween(moment(startInterval, format).add(-1, 'days'), moment(endInterval, format).add(1, 'days')) && processIdTemp === processId, [date, startInterval, endInterval, processId, processIdTemp])
    const isStartInterval = useMemo(() => date === startInterval, [date, startInterval])
    const isEndInterval = useMemo(() => date === endInterval, [date, startInterval])
    const dayTask = taskList.find((task) => task.processId === processId && moment(task.dateOfStart, format).isSameOrBefore(moment(date, format)) && moment(task.dateOfEnd, format).isSameOrAfter(moment(date, format)))

    return <div

        onMouseDown={() => !dayTask ? addFirstDate(date, processId) : null}
        onMouseEnter={() => {
            if(date === firstDate){
                batch(() => {
                    addStartIntervalTempTask(date)
                    addEndIntervalTempTask(date)
                })
                return 0
            }
            if(moment(date, format).isSameOrBefore(moment(firstDate, format))){
                addStartIntervalTempTask(date)
            } else if (moment(date, format).isSameOrAfter(moment(firstDate, format))) {
                addEndIntervalTempTask(date)
            }
        }}
        onMouseUp={() => !dayTask ? addNewTask() : null}
    >
        {children}
        {dayTask && <Task task={dayTask} date={date} firstDate={firstDate} />}
        {!dayTask && <TempTask
            isDateInsideInterval={isDateInsideInterval}
            isStartInterval={isStartInterval}
            isEndInterval={isEndInterval}
        />}
    </div>
}

export default dontRenderOtherProcess(Day)
