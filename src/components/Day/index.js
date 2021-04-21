import {DayContainer} from "./styles";
import moment from "moment";
import React, {useCallback} from "react";
import {format} from '../../constants'
import {getDaysArrayByMonth, changeDayOfMonth} from '../../utils'



const Day = ({timeField, addStartIntervalTask, addEndIntervalTask, interval, addNewTask}) => {

    const setStartInterval = useCallback((addInterval, day) => {
        addInterval(moment(changeDayOfMonth(timeField, day), format))
    }, [timeField, changeDayOfMonth])

    const setEndInterval = useCallback((month, day) => {
        if(interval.length > 0) {
            addEndIntervalTask(changeDayOfMonth(month, day))
        }

    },[interval, changeDayOfMonth, addEndIntervalTask])
    return <DayContainer>
                {getDaysArrayByMonth(timeField).map((day) => <div
                    onMouseUp={() => addNewTask()}
                    onMouseDown={() => setStartInterval(addStartIntervalTask, day)}
                    onMouseMove={(event) => setEndInterval(event.target.parentElement.dataset.date, event.target.innerHTML)}
                    key={day}
                >
                    {day}
                </div>)}
            </DayContainer>
}

export default Day