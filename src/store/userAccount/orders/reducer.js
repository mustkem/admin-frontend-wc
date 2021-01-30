import * as types from "./actions";

const initialState = {};
export default function index(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.SET_ORDERS: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // }
    default:
      return { ...state };
  }
}
