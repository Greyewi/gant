import {createSelector} from 'reselect'
import moment from "moment"
import {format} from '../constants'

/**
 * Constants
 * */

export const moduleName = 'tasks'
const prefix = moduleName
/*ACTIONS*/
export const ADD_NEW_TASK = `${prefix}/ADD_NEW_TASK`
export const ADD_START_TEMP_INTERVAL_TASK_REQUEST = `${prefix}/ADD_START_TEMP_INTERVAL_TASK_REQUEST`
export const ADD_START_TEMP_INTERVAL_TASK_SUCCESS = `${prefix}/ADD_START_TEMP_INTERVAL_TASK_SUCCESS`
export const ADD_END_TEMP_INTERVAL_TASK_REQUEST = `${prefix}/ADD_END_TEMP_INTERVAL_TASK_REQUEST`
export const ADD_END_TEMP_INTERVAL_TASK_SUCCESS = `${prefix}/ADD_END_TEMP_INTERVAL_TASK_SUCCESS`
export const ADD_PROCESS_ID_TEMP_SUCCESS = `${prefix}/ADD_PROCESS_ID_TEMP_SUCCESS`
export const REMOVE_INTERVAL_TASK = `${prefix}/REMOVE_INTERVAL_TASK`
export const DELETE_TASK = `${prefix}/DELETE_TASK`
export const EDIT_TASK = `${prefix}/DELETE_FIRST_MONTH`
export const ADD_FIRST_DATE_SUCCESS = `${prefix}/ADD_FIRST_DATE_SUCCESS`



/**
 * Reducer
 * */

export const ReducerState = {
    taskList: [],
    startIntervalTemp: null,
    endIntervalTemp: null,
    processIdTemp: null,
    firstDate: null
}

export const ReducerRecord = {
    name: " ",
    dateOfStart: moment().format(format),
    dateOfEnd: moment().add(1, 'months').format(format),
    taskColor: "#000",

}

export default function reducer(state = ReducerState, action) {
    const {type, payload} = action

    switch (type) {
        case ADD_NEW_TASK:
        case DELETE_TASK:
        case EDIT_TASK:
            return Object.assign({}, state, {
                taskList: payload,
            })
        case ADD_START_TEMP_INTERVAL_TASK_SUCCESS:
            return Object.assign({}, state, {
                startIntervalTemp: payload,
            })
        case ADD_END_TEMP_INTERVAL_TASK_SUCCESS:
            return Object.assign({}, state, {
                endIntervalTemp: payload,
            })
        case REMOVE_INTERVAL_TASK:
            return Object.assign({}, state, {
                startIntervalTemp: null,
                endIntervalTemp: null
            })
        case ADD_PROCESS_ID_TEMP_SUCCESS:
            return Object.assign({}, state, {
                processIdTemp: payload
            })
        case ADD_FIRST_DATE_SUCCESS:
            return Object.assign({}, state, {
                firstDate: payload.date,
                processIdTemp: payload.processId,
                startIntervalTemp: payload.date,
                endIntervalTemp: payload.date
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
export const startIntervalSelector = createSelector(stateSelector, state => state.startIntervalTemp)
export const endIntervalSelector = createSelector(stateSelector, state => state.endIntervalTemp)
export const firstDateSelector = createSelector(stateSelector, state => state.firstDate)
export const processIdTempSelector = createSelector(stateSelector, state => state.processIdTemp)
export const intervalSelector = createSelector(stateSelector, state => {
    if(!state.startIntervalTemp && state.endIntervalTemp) {
        return [state.endIntervalTemp]
    } else if (state.startIntervalTemp && !state.endIntervalTemp){
        return [state.startIntervalTemp]
    } else if (!state.startIntervalTemp && !state.endIntervalTemp){
        return []
    } else {
        const arr = moment(state.startIntervalTemp, format) < moment(state.endIntervalTemp, format) ?
            [state.startIntervalTemp, state.endIntervalTemp] :
            [state.endIntervalTemp, state.startIntervalTemp]
        return arr
    }

})

/**
 * Action creators
 * */

export const addStartIntervalTempTask = (startData) => ({
    type: ADD_START_TEMP_INTERVAL_TASK_SUCCESS,
    payload: startData
})

export const addEndIntervalTempTask = (endData) => ({
    type: ADD_END_TEMP_INTERVAL_TASK_SUCCESS,
    payload: endData
})

export const addProcessIdTemp = (processIdTemp) => ({
    type: ADD_PROCESS_ID_TEMP_SUCCESS,
    payload: processIdTemp
})
export const addFirstDate = (date, processId) => ({
    type: ADD_FIRST_DATE_SUCCESS,
    payload: {date, processId}
})



/**
 * Redux thunks
 * */


export const addNewTask = (newTask) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]

/*    dispatch({
        type: ADD_NEW_TASK,
        payload: [...taskList, newTask]

    })*/
    dispatch({
        type: REMOVE_INTERVAL_TASK

    })
}

export const editTask = (newTask, key) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]

    dispatch({
        type: EDIT_TASK,
        payload: taskList.map((taskItem, taskKey) => {
            if(key === taskKey){
                taskItem = newTask
            }
            return taskItem
        })
    })
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




