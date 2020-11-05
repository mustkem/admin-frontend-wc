import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {};
export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STATES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return { ...state };
  }
}
