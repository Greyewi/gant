import {createSelector} from 'reselect'
import moment from "moment"
import {format} from '../constants'
import {v4 as uuidv4} from 'uuid'
import {all, put, select, take} from 'redux-saga/effects'
import cloneDeep from "lodash/cloneDeep"

/**
 * Constants
 * */

export const moduleName = 'tasks'
const prefix = moduleName
/*ACTIONS*/
export const ADD_NEW_TASK_REQUEST = `${prefix}/ADD_NEW_TASK_REQUEST`
export const ADD_NEW_TASK_SUCCESS = `${prefix}/ADD_NEW_TASK_SUCCESS`
export const ADD_START_TEMP_INTERVAL_TASK_REQUEST = `${prefix}/ADD_START_TEMP_INTERVAL_TASK_REQUEST`
export const ADD_START_TEMP_INTERVAL_TASK_SUCCESS = `${prefix}/ADD_START_TEMP_INTERVAL_TASK_SUCCESS`
export const ADD_END_TEMP_INTERVAL_TASK_REQUEST = `${prefix}/ADD_END_TEMP_INTERVAL_TASK_REQUEST`
export const ADD_END_TEMP_INTERVAL_TASK_SUCCESS = `${prefix}/ADD_END_TEMP_INTERVAL_TASK_SUCCESS`
export const ADD_PROCESS_ID_TEMP_SUCCESS = `${prefix}/ADD_PROCESS_ID_TEMP_SUCCESS`
export const REMOVE_INTERVAL_TASK_SUCCESS = `${prefix}/REMOVE_INTERVAL_TASK_SUCCESS`
export const DELETE_TASK = `${prefix}/DELETE_TASK`
export const EDIT_TASK_REQUEST = `${prefix}/EDIT_TASK_REQUEST`
export const EDIT_TASK_SUCCESS = `${prefix}/EDIT_TASK_SUCCESS`
export const ADD_FIRST_DATE_SUCCESS = `${prefix}/ADD_FIRST_DATE_SUCCESS`
export const UNION_TASK_SUCCESS = `${prefix}/UNION_TASK_SUCCESS`
export const UNION_TASK_REQUEST = `${prefix}/UNION_TASK_REQUEST`


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
    id: null,
    processId: null,
    name: "task name",
    dateOfStart: moment().format(format),
    dateOfEnd: moment().add(1, 'months').format(format),
    taskColor: "#000",

}

export default function reducer(state = ReducerState, action) {
    const {type, payload} = action

    switch (type) {
        case ADD_NEW_TASK_SUCCESS:
        case DELETE_TASK:
        case EDIT_TASK_SUCCESS:
        case UNION_TASK_SUCCESS:
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
        case REMOVE_INTERVAL_TASK_SUCCESS:
            return Object.assign({}, state, {
                startIntervalTemp: null,
                endIntervalTemp: null,
                firstDate: null,
                processIdTemp: null
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
    if (!state.startIntervalTemp && state.endIntervalTemp) {
        return [state.endIntervalTemp]
    } else if (state.startIntervalTemp && !state.endIntervalTemp) {
        return [state.startIntervalTemp]
    } else if (!state.startIntervalTemp && !state.endIntervalTemp) {
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

export const addNewTask = () => ({
    type: ADD_NEW_TASK_REQUEST
})

export const unionTask = (id) => ({
    type: UNION_TASK_REQUEST,
    payload: id
})

export const editTask = (task) => ({
    type: EDIT_TASK_REQUEST,
    payload: task
})


/**
 * Redux thunks
 * */


export const addNewTaskSaga = function* () {
    while (true) {
        yield take(ADD_NEW_TASK_REQUEST)
        const taskList = yield select(taskListSelector)
        const interval = yield select(intervalSelector)
        const processIdTemp = yield select(processIdTempSelector)
        const newTask = ReducerRecord
        yield console.log(taskList)
        yield put({
            type: ADD_NEW_TASK_SUCCESS,
            payload: [...taskList, Object.assign({}, newTask, {
                id: uuidv4(),
                dateOfStart: interval[0],
                dateOfEnd: interval[1],
                processId: processIdTemp
            })]

        })
        yield put({
            type: REMOVE_INTERVAL_TASK_SUCCESS

        })
    }
}

export const editTaskSaga = function* () {
    while (true) {
        const {payload} = yield take(EDIT_TASK_REQUEST)
        const taskList = yield select(taskListSelector)

        yield put({
            type: EDIT_TASK_SUCCESS,
            payload: taskList.map((taskItem) => {
                if (taskItem.id === payload.id) {
                    taskItem = payload
                }
                return taskItem
            })
        })

        yield put({
            type: REMOVE_INTERVAL_TASK_SUCCESS

        })
    }
}

export const unionTaskSaga = function* () {
    while (true) {
        const {payload} = yield take(UNION_TASK_REQUEST)
        const startIntervalDate = yield select(startIntervalSelector)
        const endIntervalDate = yield select(endIntervalSelector)
        const firstIntervalDate = yield select(firstDateSelector)
        const taskList = yield select(taskListSelector)
        const task = cloneDeep(taskList.find( (f) => f.id === payload))
        console.log(task, payload)
        const isConfirm = window.confirm("Объединить таски?")
        if(isConfirm){
            if(moment(firstIntervalDate, format).isBefore(moment(task.dateOfStart, format))){
                task.dateOfStart = startIntervalDate
            } else if (moment(firstIntervalDate, format).isAfter(moment(task.dateOfEnd, format))){
                task.dateOfEnd = endIntervalDate
            }

            yield put({
                type: EDIT_TASK_REQUEST,
                payload: task
            })
        } else {
            yield put({
                type: REMOVE_INTERVAL_TASK_SUCCESS

            })
        }

    }
}


export const deleteTask = (key) => (dispatch, getState) => {
    const {taskList} = getState()[moduleName]

    dispatch({
        type: DELETE_TASK,
        payload: taskList.filter((taskItem, taskKey) => taskKey !== key)
    })
}

export const saga = function* () {
    yield all([
        addNewTaskSaga(),
        editTaskSaga(),
        unionTaskSaga()
    ])
}

/*export const startGame = () => ({
  type: SET_NEW_GAME,
  payload: [getRandomInt(4)]
})*/




