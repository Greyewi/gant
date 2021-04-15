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
    position: 0,
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

/**
 * Redux sagas
 * */

export const addNewProcessSaga = function* () {
/*    while(true){*/
        const {payload} = yield take(ADD_NEW_PROCESS_REQUEST)
        const processList = yield select(processListSelector)
        const token = yield uuidv4()
        yield put({
            type: ADD_NEW_PROCESS_SUCCESS,
            payload: [...processList, {...payload, id: token, position: processList.length}]
        })
/*    }*/

/*    dispatch({
        type: ADD_NEW_PROCESS,
        payload: [...processList, {...newProcess, id: uuidv4(), position: processList.length}]
    })*/
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
        addNewProcessSaga()
    ])
}
