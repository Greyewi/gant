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
               setActiveTask,
               editableTaskId,
               isCreatable,
               addEndIntervalTask,
               interval,
               addNewTask,
               unionTwoTask,
               addStartIntervalTask,
               editableTaskSide,
               processId,
               editTask,
               activeTaskEdit
             }) => {

  const processTaskList = useMemo(() => taskList.filter(f => f.processId === processId), [taskList, processId])

  const setStartInterval = useCallback((addInterval, date) => {
    addInterval(moment(date, format).format(format), processId)
  }, [timeField, processId])

  const setEndInterval = useCallback((date) => {
    if (date && interval.length > 0) {
      addEndIntervalTask(date, processId)
    }
  }, [interval, addEndIntervalTask, processId])

  const editTaskInterval = useCallback((date) => {

    const task = processTaskList.find(f => f.id === editableTaskId)
    const isBefore = moment(date, format) < moment(task.dateOfStart, format)
    const dateKey = editableTaskSide === 'start' ? 'dateOfStart' : 'dateOfEnd'
    editTask(isBefore ? {...task, [dateKey]: date} : {...task, [dateKey]: date})
    setActiveTask(null)
  }, [editableTaskId, editTask, processTaskList, editableTaskSide])

  const taskDates = getDatedIntoIntervals(processTaskList)

  return (
    <DayContainer date={timeField}>
      {getDaysArrayByMonth(timeField).map((day) => {
        const fullDate = addDayToMonth(timeField, day)
        const isDateIncludeTask = taskDates.includes(fullDate)
        return <DayItem
          onMouseUp={() => editableTaskId ? editTaskInterval(fullDate) : !isDateIncludeTask && addNewTask(processId) }
          onMouseDown={() => !isDateIncludeTask && setStartInterval(addStartIntervalTask, fullDate)}
          onMouseEnter={() => editableTaskId ? setEndInterval(fullDate) : !isDateIncludeTask && isCreatable && setEndInterval(fullDate)}
          key={day}
          isCreatable={isCreatable}
        >
          {day}
          {processTaskList && processTaskList.map(task => isTaskInterval(task, timeField, day) &&
            <Task
              currentDate={fullDate}
              key={task.id}
              isCreatable={isCreatable}
              unionTwoTask={unionTwoTask}
              editTask={editTask}
              taskDates={taskDates}
              setActiveTask={setActiveTask}
              isEditableTask={editableTaskId === task.id}
              task={task}
            />
          )}
          {dateIntoInterval(fullDate, interval) && activeProcessId === processId && <CreatableTask
            interval={interval}
            activeTaskEdit={activeTaskEdit}
            currentDate={fullDate}
            day={day}
          />}
        </DayItem>
      })}
    </DayContainer>
  )
}

const isTaskInterval = (task, timeField, day) => dateIntoInterval(addDayToMonth(timeField, day), [task.dateOfStart, task.dateOfEnd])


export default Day