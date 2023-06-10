import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {CounselorReducer, Data, authReducer, graphReducer} from './reducers/adminReducers';
import {counselingAcceptReducer, counselingRequestReducer, counselingUnderProcessReducer, counselorAuthReducer, exportData} from "./reducers/counselorReducer"
import { questionReducer } from './reducers/questionReducer';

const reducer = combineReducers({
  auth: authReducer,
  Counselors: CounselorReducer,
  Counselor: counselorAuthReducer,
  counselingRequest:counselingRequestReducer,
  counselingAccept:counselingUnderProcessReducer,
  question: questionReducer,
  export: exportData,
  graph:graphReducer,
  data: Data

})

let initialState = {
 
}
const middleware =[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;