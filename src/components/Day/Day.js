import {DayContainer, DayItem} from "./styles"
import Task, {CreatableTask} from "../Task"
import {useCallback, useMemo} from "react"
import moment from "moment"
import {format} from "../../constants"
import {addDayToMonth, dateIntoInterval, getDaysArrayByMonth, getDatedIntoIntervals} from '../../utils'

const Day = ({
               activeProcessId,
               timeField,
               taskList,
               isCreatable,
               addEndIntervalTask,
               interval,
               addNewTask,
               unionTwoTask,
               addStartIntervalTask,
               processId,
               activeTaskEdit
             }) => {

  const processTaskList = useMemo(() => taskList.filter(f => f.processId === processId), [taskList, processId])

  const setStartInterval = useCallback((addInterval, day) => {
    addInterval(moment(addDayToMonth(timeField, day), format).format(format), processId)
  }, [timeField, processId])

  const setEndInterval = useCallback((month, day) => {
    if (month && day && interval.length > 0) {
      addEndIntervalTask(addDayToMonth(month, day), processId)
    }
  }, [interval, addEndIntervalTask, processId])

  const taskDates = getDatedIntoIntervals(processTaskList)

  return (
    <DayContainer date={timeField}>
      {getDaysArrayByMonth(timeField).map((day) => {
        const isDateIncludeTask = taskDates.includes(addDayToMonth(timeField, day))
        return <DayItem
          onMouseUp={() => !isDateIncludeTask && addNewTask(processId)}
          onMouseDown={() => !isDateIncludeTask && setStartInterval(addStartIntervalTask, day)}
          onMouseEnter={() => !isDateIncludeTask && isCreatable && setEndInterval(timeField, day)}
          key={day}
        >
          {day}
          {processTaskList && processTaskList.map(task => isTaskInterval(task, timeField, day) &&
            <Task
              currentDate={addDayToMonth(timeField, day)}
              key={task.id}
              isCreatable={isCreatable}
              endDate={task.dateOfEnd}
              startDate={task.dateOfStart}
              unionTwoTask={unionTwoTask}
              {...task}
            />
          )}
          {dateIntoInterval(addDayToMonth(timeField, day), interval) && activeProcessId === processId && <CreatableTask
            interval={interval}
            activeTaskEdit={activeTaskEdit}
            currentDate={addDayToMonth(timeField, day)}
            day={day}
          />}
        </DayItem>
      })}
    </DayContainer>
  )
}

const isTaskInterval = (task, timeField, day) => dateIntoInterval(addDayToMonth(timeField, day), [task.dateOfStart, task.dateOfEnd])


export default Day