import {all} from 'redux-saga/effects'
import {saga as processSaga} from '../models/processes'

export default function* rootSaga() {
    yield all([
        processSaga()
    ])
}