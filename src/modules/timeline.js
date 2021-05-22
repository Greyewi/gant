import { createSelector } from "reselect";
import moment from "moment";

/**
 * Constants
 * */

export const moduleName = "timeline";
const prefix = moduleName;
export const INIT_TIME_FIELD = `${prefix}/INIT_TIME_FIELD`;
export const ADD_NEW_MONTH = `${prefix}/ADD_NEW_MONTH`;
export const DELETE_FIRST_MONTH = `${prefix}/DELETE_FIRST_MONTH`;
export const DELETE_LAST_MONTH = `${prefix}/DELETE_LAST_MONTH`;
export const CHANGE_SCALE = `${prefix}/CHANGE_SCALE`;

/**
 * Reducer
 * */

export const ReducerRecord = {
  timeFieldArray: [...Array(2).keys()].map((i) =>
    moment().add(i, "months").format("DD-MM-YYYY")
  ),
  scale: 'months', // medium
  unit: 'week', // small
};

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action;

  switch (type) {
    case INIT_TIME_FIELD:
    case ADD_NEW_MONTH:
    case DELETE_FIRST_MONTH:
    case DELETE_LAST_MONTH:
      return Object.assign({}, state, {
        timeFieldArray: payload,
      });
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName];
export const timeFieldArraySelector = createSelector(
  stateSelector,
  (state) => state.timeFieldArray
);

/**
 * Action creators
 * */

export const addNewMoth = (months) => ({
  type: ADD_NEW_MONTH,
  payload: months,
});

/*export const startGame = () => ({
  type: SET_NEW_GAME,
  payload: [getRandomInt(4)]
})*/
