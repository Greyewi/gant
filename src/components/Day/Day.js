import {DayItem} from "./styles"
import {addDayToMonth} from "../../utils"
import {useMemo} from "react"

const Day = ({
               taskDates,
               day,
               timeField
             }) => {
  const fullDate = useMemo(() => addDayToMonth(timeField, day), [timeField, day])
  const isDateIncludeTask = useMemo(() => taskDates.includes(fullDate), [taskDates, fullDate])

  return (
    <DayItem
      onMouseEnter={() => console.log(day)}
      onMouseDown={() => console.log(day)}
      onMouseUp={() => console.log(day)}
    >
      {day}
    </DayItem>
  )
}

export default Day