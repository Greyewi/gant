import {createSelector} from 'reselect'
import moment from "moment"

/**
 * Constants
 * */

export const moduleName = 'tasks'
const prefix = moduleName
/*ACTIONS*/
export const ADD_NEW_TASK = `${prefix}/ADD_NEW_TASK`
export const DELETE_TASK = `${prefix}/DELETE_TASK`
export const EDIT_TASK = `${prefix}/DELETE_FIRST_MONTH`



/**
 * Reducer
 * */

export const ReducerState = {
    taskList: []
}

export const ReducerRecord = {
    name: " ",
    dateOfStart: moment().format("DD-MM-YYYY"),
    dateOfEnd: moment().add(1, 'months').format("DD-MM-YYYY"),
    taskColor: "#000",
    position: 0
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
        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const taskListSelector = createSelector(stateSelector, state => state.taskList)

/**
 * Action creators
 * */

/**
 * Redux thunks
 * */

export const addNewTask = (newTask) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]

    dispatch({
        type: ADD_NEW_TASK,
        payload: [...taskList, newTask]

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




