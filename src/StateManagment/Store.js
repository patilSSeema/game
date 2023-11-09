import { createStore, combineReducers } from "redux";
import gameReducer from "../StateManagment/Reducers";

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer);

export default store;
