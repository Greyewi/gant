import {DayContainer, DayItem} from "./styles"
import Task from "../Task"
import {useCallback} from "react"
import moment from "moment"
import {format} from "../../constants"
import {getDaysArrayByMonth, addDayToMonth, dateIntoInterval} from '../../utils'

const Day = ({timeField, addEndIntervalTask, interval, addNewTask, addStartIntervalTask, ...rest}) => {

  const setStartInterval = useCallback((addInterval, day) => {
    addInterval(moment(addDayToMonth(timeField, day), format).format(format))
  }, [timeField])

  const setEndInterval = useCallback((month, day) => {
    if (month && day && interval.length > 0) {
      addEndIntervalTask(addDayToMonth(month, day))
    }
  }, [interval, addEndIntervalTask])

  return (
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
          {...rest}
        />}
      </DayItem>)}
    </DayContainer>
  )
}

export default Day