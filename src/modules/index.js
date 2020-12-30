import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import posts, { postsSaga } from "./posts";
import { all  } from "redux-saga/effects";


export function* rootSaga(){
    yield all([counterSaga(),postsSaga()]);
}

export default combineReducers({ counter, posts });
