import {createSelector} from "reselect"
import moment from "moment"
import {v4 as uuidv4} from "uuid"
import {formatSelector} from "./timeline"

/**
 * Constants
 * */

export const moduleName = "tasks"
const prefix = moduleName

export const ADD_NEW_TASK = `${prefix}/ADD_NEW_TASK`
export const ADD_START_INTERVAL_TASK = `${prefix}/ADD_START_INTERVAL_TASK`
export const ADD_END_INTERVAL_TASK = `${prefix}/ADD_END_INTERVAL_TASK`
export const ADD_FIRST_DATE_INTERVAL_TASK = `${prefix}/ADD_FIRST_DATE_INTERVAL_TASK`
export const REMOVE_INTERVAL_TASK = `${prefix}/REMOVE_INTERVAL_TASK`
export const DELETE_TASK = `${prefix}/DELETE_TASK`
export const EDIT_TASK = `${prefix}/EDIT_TASK`
export const SET_ACTIVE_TASK = `${prefix}/SET_ACTIVE_TASK`
export const SET_OPEN_FORM_TASK = `${prefix}/SET_OPEN_FORM_TASK`
export const UNION_COUPLE_TASK = `${prefix}/UNION_COUPLE_TASK`
export const CHANGE_END_DATE_TASK = `${prefix}/CHANGE_END_DATE_TASK`
export const HOVER_TASK_LINKS = `${prefix}/HOVER_TASK_LINKS`

/**
 * Reducer
 * */

export const ReducerState = {
  taskList: [{
    border: "solid",
    dateOfEnd: "2021-10-10",
    dateOfStart: "2021-09-21",
    fill: "#E09B33",
    id: "26c0dbf1-b60e-42d1-b682-8f7f204a962e",
    name: "Enter name",
    processId: "431"
  }],
  isOpenTaskFormId: null,
  isCreatable: false,
  editableTaskId: null,
  editableTaskSide: "", //start or end
  endInterval: null,
  startInterval: null,
  firstDateInterval: null,
  activeProcessId: null,
  activeMonthsList: new Set(),
  hoverTaskId: null,
}

export const ReducerRecord = {
  id: null,
  name: "Enter name",
  dateOfStart: null,
  dateOfEnd: null,
  fill: "#E09B33",
  border: "solid",
  processId: null,
}

export default function reducer(state = ReducerState, action) {
  const {type, payload} = action

  switch (type) {
    case ADD_NEW_TASK:
      return Object.assign({}, state, {
        taskList: payload,
      })
    case UNION_COUPLE_TASK:
      return Object.assign({}, state, {
        taskList: payload,
      })
    case EDIT_TASK:
      return Object.assign(
        {},
        state,
        {
          ...payload,
        },
        {
          editableTaskId: null,
          firstDateInterval: null,
          activeMonthsList: new Set(),
          activeProcessId: null,
          startInterval: null,
          endInterval: null,
        }
      )
    case SET_ACTIVE_TASK:
      return Object.assign({}, state, {...payload})
    case ADD_FIRST_DATE_INTERVAL_TASK:
      return {
        ...state,
        firstDateInterval: payload.data,
        startInterval: payload.data,
        endInterval: payload.data,
        activeProcessId: payload.processId,
        activeMonthsList: new Set([...state.activeMonthsList, payload.month]), // to distinct reducer
      }
    case ADD_START_INTERVAL_TASK:
      return {
        ...state,
        startInterval: payload.startData,
        activeMonthsList: new Set([...state.activeMonthsList, payload.month]),
      }
    case ADD_END_INTERVAL_TASK:
      return {
        ...state,
        endInterval: payload.endData,
        activeMonthsList: new Set([...state.activeMonthsList, payload.month]),
      }
    case SET_OPEN_FORM_TASK:
      return Object.assign({}, state, {
        isOpenTaskFormId: payload,
      })
    case HOVER_TASK_LINKS:
      return Object.assign({}, state, {
        hoverTaskId: payload,
      })
    case REMOVE_INTERVAL_TASK:
      return Object.assign({}, state, {
        editableTaskId: null,
        firstDateInterval: null,
        activeMonthsList: new Set(),
        activeProcessId: null,
        startInterval: null,
        endInterval: null,
      })
    case CHANGE_END_DATE_TASK:
      return Object.assign({}, state, {
        firstDateInterval: null,
        activeMonthsList: new Set(),
        activeProcessId: null,
        startInterval: null,
        endInterval: null,
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const taskListSelector = createSelector(
  stateSelector,
  (state) => state.taskList
)
export const activeMonthsListSelector = createSelector(
  stateSelector,
  (state) => state.activeMonthsList
)
export const isCreatableSelector = createSelector(
  stateSelector,
  (state) => state.isCreatable
)
export const editableTaskIdSelector = createSelector(
  stateSelector,
  (state) => state.editableTaskId
)
export const isOpenTaskFormIdSelector = createSelector(
  stateSelector,
  (state) => state.isOpenTaskFormId
)
export const editableTaskSideSelector = createSelector(
  stateSelector,
  (state) => state.editableTaskSide
)
export const activeProcessIdSelector = createSelector(
  stateSelector,
  (state) => state.activeProcessId
)
export const startTempIntervalSelector = createSelector(
  stateSelector,
  (state) => state.startInterval
)
export const firstDateIntervalSelector = createSelector(
  stateSelector,
  (state) => state.firstDateInterval
)
export const endTempIntervalSelector = createSelector(
  stateSelector,
  (state) => state.endInterval
)
export const hoverTaskIdSelector = createSelector(
  stateSelector,
  (state) => state.hoverTaskId
)
export const activeTaskEditSelector = createSelector(
  stateSelector,
  (state) => {
    state.taskList.find(item => state.isOpenTaskFormId === item.id)
  }
)

/**
 * Action creators
 * */

export const addFirstDateIntervalTask = (data, processId, month) => ({
  type: ADD_FIRST_DATE_INTERVAL_TASK,
  payload: {data, processId, month},
})

export const addStartIntervalTask = (startData, month) => ({
  type: ADD_START_INTERVAL_TASK,
  payload: {startData, month},
})

export const addEndIntervalTask = (endData, month) => ({
  type: ADD_END_INTERVAL_TASK,
  payload: {endData, month},
})

export const toggleEditTaskForm = (taskId) => ({
  type: SET_OPEN_FORM_TASK,
  payload: taskId
})

export const hoverTask = (taskId) => ({
  type: HOVER_TASK_LINKS,
  payload: taskId
})

/**
 * Redux thunks
 * */

export const setActiveTask = (editableTaskId, side) => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]

  const newTask = taskList.find((taskItem) => taskItem.id === editableTaskId)
  let payload = {
    editableTaskId: editableTaskId,
    activeProcessId: newTask.processId,
  }
  const endData = newTask.dateOfEnd
  const startData = newTask.dateOfStart
  payload.endInterval = endData
  payload.startInterval = startData

  if (side === "end") {
    payload.firstDateInterval = startData
  } else {
    payload.firstDateInterval = endData
  }

  dispatch({
    type: SET_ACTIVE_TASK,
    payload: payload,
  })
}

export const changeIntervalTask = () => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]

  dispatch({
    type: EDIT_TASK,
    payload: {taskList: taskList},
  })
}

export const addNewTask = () => (dispatch, getState) => {
  const startTempInterval = startTempIntervalSelector(getState())
  const endTempInterval = endTempIntervalSelector(getState())
  const activeProcessId = activeProcessIdSelector(getState())
  const {taskList} = getState()[moduleName]
  const newTask = ReducerRecord

  if (!startTempInterval || !endTempInterval) {
    return
  }

  const id = uuidv4()

  dispatch({
    type: ADD_NEW_TASK,
    payload: [
      ...taskList,
      Object.assign({}, newTask, {
        id: id,
        dateOfStart: startTempInterval,
        dateOfEnd: endTempInterval,
        processId: activeProcessId,
      }),
    ],
  })

  dispatch({
    type: REMOVE_INTERVAL_TASK,
  })

  dispatch({
    type: SET_OPEN_FORM_TASK,
    payload: id,
  })
}

export const editTask = (newTask) => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]
  const newTaskList = taskList.map((taskItem) => {
    if (taskItem.id === newTask.id) {
      return newTask
    }
    return taskItem
  })

  dispatch({
    type: EDIT_TASK,
    payload: {taskList: newTaskList},
  })
}

export const deleteTask = (key) => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]

  dispatch({
    type: DELETE_TASK,
    payload: taskList.filter((taskItem, taskKey) => taskKey !== key),
  })
}

export const unionTwoTask = (unionTaskId, direction, editableTaskId = null) => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]
  const startTempInterval = startTempIntervalSelector(getState())
  const endTempInterval = endTempIntervalSelector(getState())
  const format = formatSelector(getState())

  let newDirection = direction
  if (newDirection !== "start" && newDirection !== "end") {
    const task = taskList.find((f) => unionTaskId === f.id)
    if (moment(task.dateOfStart, format).isAfter(moment(direction))) {
      newDirection = "start"
    } else if (moment(task.dateOfEnd, format).isBefore(moment(direction))) {
      newDirection = "end"
    } else {
      return false
    }
  }

  const newDates = newDirection === "start"
    ? {dateOfStart: startTempInterval}
    : {dateOfEnd: endTempInterval}

  const newTaskList = taskList.map((taskItem) => {
    if (taskItem.id === unionTaskId) {
      taskItem = {...taskItem, ...newDates}
    }
    return taskItem
  }).filter(f => f.id !== editableTaskId)

  if (window.confirm(editableTaskId ? "Do you want to merge task?" : "Do you want to union task?")) {
    dispatch({
      type: UNION_COUPLE_TASK,
      payload: newTaskList,
    })
  }

  dispatch({
    type: REMOVE_INTERVAL_TASK,
  })
}
