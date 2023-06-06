import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {CounselorReducer, authReducer} from './reducers/adminReducers';

const reducer = combineReducers({
  auth: authReducer,
  Counselors: CounselorReducer
})

let initialState = {
 
}
const middleware =[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;