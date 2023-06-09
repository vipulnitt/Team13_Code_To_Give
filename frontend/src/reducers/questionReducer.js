import { QUESTION_REQUEST,
    QUESTION_SUCCESS,
    QUESTION_FAIL,
    CLEAR_ERRORS
} from '../constants/questionConstant';

export const questionReducer = (state = { question: {} }, action) => {
    switch (action.type) {
      case QUESTION_REQUEST:
        return {
          loading: true
        }
      case QUESTION_SUCCESS:
        return {
          ...state,
          loading: false,
          question: action.payload
     
        }
      case QUESTION_FAIL:
        return {
          ...state,
          loading: false,
          question: null,
          error: action.payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }
      default:
        return state;
    }
  }