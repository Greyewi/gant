import {all} from 'redux-saga/effects'
import {saga as processSaga} from '../models/processes'
import {saga as tasksSaga} from '../models/tasks'

export default function* rootSaga() {
    yield all([
        processSaga(),
        tasksSaga()
    ])
}