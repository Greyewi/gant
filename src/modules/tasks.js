import {createSelector} from 'reselect'
import moment from "moment"
import {format} from '../constants'
import {v4 as uuidv4} from 'uuid'

/**
 * Constants
 * */

export const moduleName = 'tasks'
const prefix = moduleName
export const ADD_NEW_TASK = `${prefix}/ADD_NEW_TASK`
export const ADD_START_INTERVAL_TASK = `${prefix}/ADD_START_INTERVAL_TASK`
export const ADD_END_INTERVAL_TASK = `${prefix}/ADD_END_INTERVAL_TASK`
export const REMOVE_INTERVAL_TASK = `${prefix}/REMOVE_INTERVAL_TASK`
export const DELETE_TASK = `${prefix}/DELETE_TASK`
export const EDIT_TASK = `${prefix}/EDIT_TASK`
export const SET_ACTIVE_TASK = `${prefix}/SET_ACTIVE_TASK`
export const SET_OPEN_FORM_TASK = `${prefix}/SET_OPEN_FORM_TASK`

/**
 * Reducer
 * */

export const ReducerState = {
  taskList: [],
  startInterval: null,
  endInterval: null,
  isOpenTaskFormId: false,
  name: "",
  fill: '#E09B33',
  border: 'solid'
}

export const ReducerRecord = {
  id: uuidv4(),
  name: "Enter name",
  dateOfStart: moment().format(format),
  dateOfEnd: moment().format(format),
  fill: '#E09B33',
  border: 'solid',
}

export default function reducer(state = ReducerState, action) {
  const {type, payload} = action

  switch (type) {
    case ADD_NEW_TASK:
      return Object.assign({}, state, {
        taskList: payload,
      })
    case EDIT_TASK:
      return Object.assign({}, state, {
        ...payload,
      })
    case ADD_START_INTERVAL_TASK:
      return Object.assign({}, state, {
        startInterval: payload,
      })
    case SET_ACTIVE_TASK:
      return Object.assign({}, state, {
        isOpenTaskFormId: payload,
      })
    case ADD_END_INTERVAL_TASK:
      return Object.assign({}, state, {
        endInterval: payload,
      })
    case SET_OPEN_FORM_TASK:
      return Object.assign({}, state, {
        isOpenTaskFormId: payload,
      })
    case REMOVE_INTERVAL_TASK:
      return Object.assign({}, state, {
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
export const isOpenTaskFormIdSelector = createSelector(stateSelector, state => state.isOpenTaskFormId)
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

export const addStartIntervalTask = (startData) => ({
  type: ADD_START_INTERVAL_TASK,
  payload: startData
})

export const setActiveTask = (taskId) => ({
  type: SET_ACTIVE_TASK,
  payload: taskId
})

export const addEndIntervalTask = (endData) => ({
  type: ADD_END_INTERVAL_TASK,
  payload: endData
})

/**
 * Redux thunks
 * */

export const addNewTask = () => (dispatch, getState) => {
  const interval = intervalSelector(getState())
  const {taskList} = getState()[moduleName]
  const newTask = ReducerRecord

  dispatch({
    type: ADD_NEW_TASK,
    payload: [
      ...taskList,
      Object.assign(
        newTask,
        {dateOfStart: interval[0], dateOfEnd: interval[1]}
      )
    ]
  })

  dispatch({
    type: SET_OPEN_FORM_TASK,
    payload: newTask.id
  })
}

export const editTask = newTask => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]
  const activeTaskId = isOpenTaskFormIdSelector(getState())
  const newTaskList = taskList.map((taskItem) => {
    if (taskItem.id === activeTaskId) {
      taskItem = {...taskItem, ...newTask}
    }
    return taskItem
  })

  dispatch({
    type: EDIT_TASK,
    payload: {taskList : newTaskList, ...newTask}
  })

  // dispatch({
  //   type: SET_OPEN_FORM_TASK,
  //   payload: null
  // })
  //
  // dispatch({
  //   type: REMOVE_INTERVAL_TASK
  // })
}

export const deleteTask = (key) => (dispatch, getState) => {
  const {taskList} = getState()[moduleName]

  dispatch({
    type: DELETE_TASK,
    payload: taskList.filter((taskItem, taskKey) => taskKey !== key)
  })
}

/*export const startGame = () => ({
  type: SET_NEW_GAME,
  payload: [getRandomInt(4)]
})*/
