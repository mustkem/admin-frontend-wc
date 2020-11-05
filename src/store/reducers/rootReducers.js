import { combineReducers } from "redux";

import user from "./user/user";
import orders from "./Orders/Orders";
import global from "./global";
import userAccount from "../userAccount";

const rootReducer = combineReducers({
  user,
  orders,
  global,
  userAccount,
});
export default rootReducer;
