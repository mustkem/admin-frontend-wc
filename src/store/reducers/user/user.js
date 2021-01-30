import { actionTypes } from "../../actionTypes/actionTypes";

const initialState = {
  user: {},
};
if (localStorage.getItem("ship_user_data_access")) {
  initialState.user = JSON.parse(localStorage.getItem("ship_user_data_access"));
}

export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN: {
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    }
    case actionTypes.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          loading: false,
          ...action.payload,
        },
      };
    }
    case actionTypes.USER_LOGIN_FAILED: {
      return {
        ...state,
        user: {
          loading: false,
          ...action.payload,
        },
      };
    }
    case actionTypes.SET_COVERAGE_AREA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actionTypes.SET_ADDRESSES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return { ...state };
  }
}
