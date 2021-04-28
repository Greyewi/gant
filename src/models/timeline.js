import {createSelector} from 'reselect'
import moment from "moment"

/**
 * Constants
 * */

export const moduleName = 'timeline'
const prefix = moduleName
/*ACTIONS*/
export const INIT_TIME_FIELD = `${prefix}/INIT_TIME_FIELD`
export const ADD_NEW_MONTH = `${prefix}/ADD_NEW_MONTH`
export const DELETE_FIRST_MONTH = `${prefix}/DELETE_FIRST_MONTH`
export const DELETE_LAST_MONTH = `${prefix}/DELETE_LAST_MONTH`
export const SET_SCALE_OF_TIMELINE = `${prefix}/SET_SCALE_OF_TIMELINE`


/**
 * Reducer
 * */

export const ReducerRecord = {
    timeFieldArray: [
        moment().format("DD-MM-YYYY"),
        moment().add(1, 'months').format("DD-MM-YYYY"),
    ],
    timelineScale: 'months',
    scaleOptions: ['years', 'months', 'days', 'hours']

}

export default function reducer(state = ReducerRecord, action) {
    const {type, payload} = action

    switch (type) {
        case INIT_TIME_FIELD:
        case ADD_NEW_MONTH:
        case DELETE_FIRST_MONTH:
        case DELETE_LAST_MONTH:
            return Object.assign({}, state, {
                timeFieldArray: payload,
            })
        case SET_SCALE_OF_TIMELINE:
            return Object.assign({}, state, {
                timelineScale: payload,
            })
        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const timeFieldArraySelector = createSelector(stateSelector, state => state.timeFieldArray)

/**
 * Action creators
 * */

export const addNewMoth = (months) => ({
    type: ADD_NEW_MONTH,
    payload: months
})

export const setScaleTimeline = (scale) => ({
    type: SET_SCALE_OF_TIMELINE,
    payload: scale
})

/*export const startGame = () => ({
  type: SET_NEW_GAME,
  payload: [getRandomInt(4)]
})*/




