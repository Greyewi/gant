import {createSelector} from 'reselect'
import {v4 as uuidv4} from 'uuid'
import {deleteItemFromList, modifyListByObject} from '../utils'
import {all, take, put, select} from 'redux-saga/effects'

/**
 * Constants
 * */

export const moduleName = 'processes'
const prefix = moduleName
/*ACTIONS*/
export const CHANGE_PROCESS_REQUEST = `${prefix}/CHANGE_PROCESS_REQUEST`
export const CHANGE_PROCESS_SUCCESS = `${prefix}/CHANGE_PROCESS_SUCCESS`
export const REMOVE_PROCESS_REQUEST = `${prefix}/REMOVE_PROCESS_REQUEST`
export const REMOVE_PROCESS_SUCCESS = `${prefix}/REMOVE_PROCESS_SUCCESS`
export const ADD_NEW_PROCESS_REQUEST = `${prefix}/ADD_NEW_PROCESS_REQUEST`
export const ADD_NEW_PROCESS_SUCCESS = `${prefix}/ADD_NEW_PROCESS_SUCCESS`



/**
 * Reducer
 * */
export const ReducerState = {
    processList: []
}

export const ReducerRecord = {
    id: null,
    name: 'new process',

}

export default function reducer(state = ReducerState, action) {
    const {type, payload} = action

    switch (type) {
        case CHANGE_PROCESS_SUCCESS:
        case REMOVE_PROCESS_SUCCESS:
        case ADD_NEW_PROCESS_SUCCESS:
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
 * Action creators
 * */

export const addNewProcess = () => ({
    type: ADD_NEW_PROCESS_REQUEST,
    payload: ReducerRecord
})

export const removeProcess = (id) => ({
    type: REMOVE_PROCESS_REQUEST,
    payload: id
})

export const changeProcess = (editProcess) => ({
    type: CHANGE_PROCESS_REQUEST,
    payload: editProcess
})

/**
 * Redux sagas
 * */

export const addNewProcessSaga = function* () {
    while(true){
        const {payload} = yield take(ADD_NEW_PROCESS_REQUEST)
        const processList = yield select(processListSelector)
        const token = yield uuidv4()
        yield put({
            type: ADD_NEW_PROCESS_SUCCESS,
            payload: [...processList, {...payload, id: token}]
        })
    }
}

export const removeProcessSaga = function* () {
    while(true){
        const {payload} = yield take(CHANGE_PROCESS_REQUEST)
        const processList = yield select(processListSelector)
        const newProcessList = yield deleteItemFromList(processList, payload.id)
        yield put({
            type: CHANGE_PROCESS_SUCCESS,
            payload: newProcessList
        })
    }
}

export const changeProcessSaga = function* () {
    while(true){
        const {payload} = yield take(REMOVE_PROCESS_REQUEST)
        const processList = yield select(processListSelector)
        const changedProcessList = yield modifyListByObject(processList, payload.editProcess)
        yield put({
            type: REMOVE_PROCESS_SUCCESS,
            payload: changedProcessList
        })
    }
}

/*export const removeProcess = (id) => (dispatch, getState)=>{
    const processList = processListSelector(getState())

    dispatch({
        type: REMOVE_PROCESS,
        payload: [deleteItemFromList(processList, id)]
    })
}

export const changeProcess = (editProcess) => (dispatch, getState)=>{
    const processList = processListSelector(getState())

    dispatch({
        type: CHANGE_PROCESS,
        payload: modifyListByObject(processList, editProcess)
    })
}*/

export const saga = function* () {
    yield all([
        addNewProcessSaga(),
        removeProcessSaga(),
        changeProcessSaga()
    ])
}
