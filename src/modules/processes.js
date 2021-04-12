import {createSelector} from 'reselect'
import {v4 as uuidv4} from 'uuid'

/**
 * Constants
 * */

export const moduleName = 'processes'
const prefix = moduleName
export const ADD_NEW_PROCESS = `${prefix}/ADD_NEW_PROCESS`
export const CHANGE_PROCESS = `${prefix}/CHANGE_PROCESS`
export const REMOVE_PROCESS = `${prefix}/REMOVE_PROCESS`
export const CHANGE_POSITIONS_PROCESS = `${prefix}/CHANGE_POSITIONS_PROCESS`

/**
 * Reducer
 * */

export const ReducerState = {
  processList: [{id: "993db536-82b7-4c5e-ba77-db8798af1431", name: "old process"},
    {id: "9e58929b-8d3f-486c-970e-edb29900e903", name: "new process"},
    {id: "9d11b985-0aee-48f7-844d-201f8d9a0a34", name: "strange process"}]
}

export const ReducerRecord = {
  id: null,
  name: 'new process'
}

export default function reducer(state = ReducerState, action) {
  const {type, payload} = action

  switch (type) {
    case ADD_NEW_PROCESS:
    case CHANGE_PROCESS:
    case CHANGE_POSITIONS_PROCESS:
      return Object.assign({}, state, {
        processList: payload,
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const processListSelector = createSelector(stateSelector, state => state.processList)

/**
 * Redux thunks
 * */

export const changeProcessListPosition = processList => ({
  type: CHANGE_POSITIONS_PROCESS,
  payload: processList
})

export const addNewProcess = () => (dispatch, getState) => {
  const processList = processListSelector(getState())
  const newProcess = ReducerRecord

  dispatch({
    type: ADD_NEW_PROCESS,
    payload: [
      ...processList, {...newProcess, id: uuidv4()}
    ]
  })
}

export const editProcess = editedProcess => (dispatch, getState) => {
  const processList = processListSelector(getState())

  const newProcessList = processList.map((processItem) => {
    if (processItem.id === editedProcess.id) {
      processItem = {...processItem, ...editedProcess}
    }
    return processItem
  })

  dispatch({
    type: CHANGE_PROCESS,
    payload: newProcessList
  })
}

export const removeProcess = processId => (dispatch, getState) => {
  const processList = processListSelector(getState())

  dispatch({
    type: REMOVE_PROCESS,
    payload: processList.filter(f => f.id !== processId)
  })
}

