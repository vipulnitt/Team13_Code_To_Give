import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {CounselorReducer, authReducer} from './reducers/adminReducers';
import {counselingRequestReducer, counselorAuthReducer} from "./reducers/counselorReducer"

const reducer = combineReducers({
  auth: authReducer,
  Counselors: CounselorReducer,
  Counselor: counselorAuthReducer,
  counselingRequest:counselingRequestReducer

})

let initialState = {
 
}
const middleware =[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;