import {createSelector} from 'reselect'
import moment from "moment"
import {format} from '../constants'

/**
 * Constants
 * */

export const moduleName = 'tasks'
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

/**
 * Reducer
 * */

export const ReducerState = {
  taskList: [],
  isOpenTaskFormId: null,
  isCreatable: false,
  editableTaskId: null,
  editableTaskSide: '', //start or end
  endInterval: null,
  startInterval: null,
  firstDateInterval: null,
  border: 'solid',
  activeProcessId: null
}

export const ReducerRecord = {
  id: null,
  name: "Enter name",
  dateOfStart: moment().format(format),
  dateOfEnd: moment().format(format),
  fill: '#E09B33',
  border: 'solid',
  processId: null
}

export default function reducer(state = ReducerState, action) {
  const {type, payload} = action

  switch (type) {
    case ADD_NEW_TASK:
      return Object.assign({}, state, {
        taskList: payload
      })
    case UNION_COUPLE_TASK:
      return Object.assign({}, state, {
        taskList: payload
      })
    case EDIT_TASK:
      return Object.assign({}, state, {
        ...payload,
      })
    case ADD_FIRST_DATE_INTERVAL_TASK:
      return {
        ...state,
        firstDateInterval: payload.data,
        startInterval: payload.data,
        endInterval: payload.data,
        activeProcessId: payload.processId
      }
    case ADD_START_INTERVAL_TASK:
      return {...state, startInterval: payload.startData, isCreatable: true}
    case SET_ACTIVE_TASK:
      return Object.assign({}, state, {
        editableTaskId: payload.id,
        editableTaskSide: payload.side,
      })
    case ADD_END_INTERVAL_TASK:
      return {...state, endInterval: payload.endData}
    case SET_OPEN_FORM_TASK:
      return Object.assign({}, state, {
        isOpenTaskFormId: payload,
      })
    case REMOVE_INTERVAL_TASK:
      return Object.assign({}, state, {
        activeProcessId: null,
        startInterval: null,
        endInterval: null
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const taskListSelector = createSelector(stateSelector, state => state.taskList)
export const isCreatableSelector = createSelector(stateSelector, state => state.isCreatable)
export const editableTaskIdSelector = createSelector(stateSelector, state => state.editableTaskId)
export const isOpenTaskFormIdSelector = createSelector(stateSelector, state => state.isOpenTaskFormId)
export const editableTaskSideSelector = createSelector(stateSelector, state => state.editableTaskSide)
export const activeProcessIdSelector = createSelector(stateSelector, state => state.activeProcessId)
export const startTempIntervalSelector = createSelector(stateSelector, state => state.startInterval)
export const firstDateIntervalSelector = createSelector(stateSelector, state => state.firstDateInterval)
export const endTempIntervalSelector = createSelector(stateSelector, state => state.endInterval)
export const activeTaskEditSelector = createSelector(stateSelector, ({name, fill, border}) => ({name, fill, border}))
export const intervalSelector = createSelector(stateSelector, state => {
  if (!state.startInterval && state.endInterval) {
    return [state.endInterval]
  } else if (state.startInterval && !state.endInterval) {
    return [state.startInterval]
  } else if (!state.startInterval && !state.endInterval) {
    return []
  } else {
    const arr = moment(state.startInterval, format) < moment(state.endInterval, format) ?
      [state.startInterval, state.endInterval] :
      [state.endInterval, state.startInterval]
    return arr
  }
})

/**
 * Action creators
 * */

export const addFirstDateIntervalTask = (data, processId) => ({
  type: ADD_FIRST_DATE_INTERVAL_TASK,
  payload: {data, processId}
})

export const addStartIntervalTask = (startData) => ({
  type: ADD_START_INTERVAL_TASK,
  payload: {startData}
})

export const addEndIntervalTask = (endData) => ({
  type: ADD_END_INTERVAL_TASK,
  payload: {endData}
})

export const setActiveTask = (taskId, side) => ({
  type: SET_ACTIVE_TASK,
  payload: {id: taskId, side: side}
})

/**
 * Redux thunks
 * */

export const addNewTask = (processId) => (dispatch, getState) => {
  // const interval = intervalSelector(getState())
  // const {taskList} = getState()[moduleName]
  // const newTask = ReducerRecord

  dispatch({
    type: REMOVE_INTERVAL_TASK
  })

  // if(interval.length <= 1) {
  //   return
  // }
  //
  // dispatch({
  //   type: ADD_NEW_TASK,
  //   payload: [
  //     ...taskList,
  //     Object.assign(
  //       {},
  //       newTask,
  //       {id: uuidv4(), dateOfStart: interval[0], dateOfEnd: interval[1], processId}
  //     )
  //   ]
  // })
  //
  // dispatch({
  //   type: SET_OPEN_FORM_TASK,
  //   payload: newTask.id
  // })
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
    payload: {taskList: newTaskList}
  })
}

export const deleteTask = (key) => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]

  dispatch({
    type: DELETE_TASK,
    payload: taskList.filter((taskItem, taskKey) => taskKey !== key)
  })
}

export const unionTwoTask = (unionTaskId, direction) => (dispatch, getState) => { //direction === 'end' or 'start'
  const {taskList} = getState()[moduleName]
  const interval = intervalSelector(getState())

  const newDates = direction === 'start' ? {dateOfStart: interval[0]} : {dateOfEnd: interval[1]}

  const newTaskList = taskList.map((taskItem) => {
    if (taskItem.id === unionTaskId) {
      taskItem = {...taskItem, ...newDates}
    }
    return taskItem
  })


  if (window.confirm('Do you want to union task?')) {
    dispatch({
      type: UNION_COUPLE_TASK,
      payload: newTaskList
    })
  }

  dispatch({
    type: REMOVE_INTERVAL_TASK
  })
}
