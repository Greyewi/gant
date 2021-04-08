import {MonthElement, NameOfMonth, DayContainer, DayItem} from "./styles";
import moment from "moment";
import React, {useCallback} from "react";
import {format} from '../../constants'
import {getDaysArrayByMonth, addDayToMonth, dateIntoInterval} from '../../utils'
import Task from '../Task'

const Month = ({timeField, odd, addStartIntervalTask, addEndIntervalTask, interval, addNewTask}) => {

    const setStartInterval = useCallback((addInterval, day) => {
        addInterval(moment(addDayToMonth(timeField, day), format).format(format))
    }, [timeField, addDayToMonth])

    const setEndInterval = useCallback((month, day) => {
        if(month && day && interval.length > 0) {
            addEndIntervalTask(addDayToMonth(month, day))
        }
    },[interval, addDayToMonth, addEndIntervalTask])

    return <MonthElement odd={odd} >
        <NameOfMonth>{moment(timeField, format).format("MMMM YYYY")}</NameOfMonth>
        <DayContainer date={timeField}>
            {getDaysArrayByMonth(timeField).map((day) => <DayItem
              data-day={day}
              onMouseUp={() => addNewTask()}
              onMouseDown={() => setStartInterval(addStartIntervalTask, day)}
              onMouseOver={(event) => setEndInterval(event.target.parentElement.dataset.date, event.target.dataset.day)}
              key={day}
            >
                {day}
                {dateIntoInterval(addDayToMonth(timeField, day), interval) && <Task
                      interval={interval}
                      currentDate={addDayToMonth(timeField, day)}
                      day={day}
                      handleMouseOver={(data, day) => setEndInterval(data, day)}
                    />}
            </DayItem>)}
        </DayContainer>
    </MonthElement>
}

export default Month