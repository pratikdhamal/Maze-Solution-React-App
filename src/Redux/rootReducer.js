import { combineReducers } from "redux";

import dataReducer from "./slice";


const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;