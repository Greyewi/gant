import {createSelector} from "reselect"
import moment from "moment"
import {defaultFormat} from '../constants'

/**
 * Constants
 * */

export const moduleName = "timeline"
const prefix = moduleName
export const INIT_TIME_LINE = `${prefix}/INIT_TIME_LINE`
export const ADD_NEW_MONTH = `${prefix}/ADD_NEW_MONTH`
export const DELETE_FIRST_MONTH = `${prefix}/DELETE_FIRST_MONTH`
export const DELETE_LAST_MONTH = `${prefix}/DELETE_LAST_MONTH`
export const CHANGE_SCALE = `${prefix}/CHANGE_SCALE`
export const CHANGE_COUNT_ACTIVE_SCALE = `${prefix}/CHANGE_COUNT_ACTIVE_SCALE`
export const CHANGE_UNIT_NAME = `${prefix}/CHANGE_UNIT_NAME`
export const CHANGE_UNIT_COUNT = `${prefix}/CHANGE_UNIT_COUNT`
export const CHANGE_FORMAT = `${prefix}/CHANGE_FORMAT`

/**
 * Reducer
 * */

export const ReducerRecord = {
  timeFieldArray: [],
  scale: 'months', // medium
  unitName: 'week', // small
  unitsPerScale: 0, // small
  format: defaultFormat,
  activeScales: {
    from: 1,
    to: 2
  }
}

export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action

  switch (type) {
    case INIT_TIME_LINE:
      return Object.assign({}, state, {
        timeFieldArray: payload,
      })
    case CHANGE_FORMAT:
      return Object.assign({}, state, {
        format: payload,
      })
    case CHANGE_SCALE:
      return Object.assign({}, state, {
        scale: payload,
      })
    case CHANGE_UNIT_NAME:
      return Object.assign({}, state, {
        unitName: payload,
      })
    case CHANGE_UNIT_COUNT:
      return Object.assign({}, state, {
        unitsPerScale: payload,
      })
    case CHANGE_COUNT_ACTIVE_SCALE:
      return Object.assign({}, state, {
        activeScales: payload,
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const timeFieldArraySelector = createSelector(stateSelector, (state) => state.timeFieldArray)
export const timeFieldArrayFilteredSelector = createSelector(stateSelector, (state) => state.timeFieldArray.filter((f, index) => index >= state.activeScales.from && index <= state.activeScales.to))
export const formatSelector = createSelector(stateSelector, (state) => state.format)
export const scaleSelector = createSelector(stateSelector, (state) => state.scale)
export const unitNameSelector = createSelector(stateSelector, (state) => state.unitName)
export const unitsPerScaleSelector = createSelector(stateSelector, (state) => state.unitsPerScale)
export const activeScalesSelector = createSelector(stateSelector, (state) => state.activeScales)

/**
 * Action creators
 * */

export const addNewMoth = (months) => ({
  type: ADD_NEW_MONTH,
  payload: months,
})

export const onChangeFormat = (format) => ({
  type: CHANGE_FORMAT,
  payload: format,
})

export const onChangeScale = (scale) => ({
  type: CHANGE_SCALE,
  payload: scale,
})

export const onChangeUnitName = (name) => ({
  type: CHANGE_UNIT_NAME,
  payload: name,
})

export const onChangeCountUnits = (count) => ({
  type: CHANGE_UNIT_COUNT,
  payload: count,
})

export const onChangeActiveScaleCount = (rangeObject) => ({
  type: CHANGE_COUNT_ACTIVE_SCALE,
  payload: rangeObject,
})

export const loadTimeLine = (startDate, count) => (dispatch, getState) => {
  const format = formatSelector(getState())
  const scale = scaleSelector(getState())

  dispatch({
    type: INIT_TIME_LINE,
    payload: [...Array(count).keys()].map((i) =>
      moment(startDate, format).add(i, scale).format(format)
    ),
  })
}