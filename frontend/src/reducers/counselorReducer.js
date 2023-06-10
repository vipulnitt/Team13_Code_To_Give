import {
  COUNSELOR_LOGIN_SUCCESS,
  COUNSELOR_LOGIN_REQUEST,
  COUNSELOR_LOGIN_FAIL,
  COUNSELOR_REG_REQUEST,
  COUNSELOR_REG_SUCCESS,
  COUNSELOR_REG_FAIL,
  COUNSELOR_LOAD_USER_REQUEST,
  COUNSELOR_LOAD_USER_SUCCESS,
  COUNSELOR_LOAD_USER_FAIL,
  COUNSELOR_LOGOUT_USER_SUCCESS,
  COUNSELOR_LOGOUT_USER_FAIL,
  COUNSELOR_UPDATE_PROFILE_REQUEST,
  COUNSELOR_UPDATE_PROFILE_SUCCESS,
  COUNSELOR_UPDATE_PROFILE_FAIL,
  COUNSELOR_UPDATE_PASSWORD_REQUEST,
  COUNSELOR_UPDATE_PASSWORD_SUCCESS,
  COUNSELOR_UPDATE_PASSWORD_FAIL,
  CLEAR_ERRORS,
  COUNSELING_REQUEST,
  COUNSELING_SUCCESS,
  COUNSELING_FAIL,
  COUNSELING_ACCEPT_REQUEST,
  COUNSELING_ACCEPT_SUCCESS,
  COUNSELING_ACCEPT_FAIL,
  COUNSELING_UP_REQUEST,
  COUNSELING_UP_SUCCESS,
  COUNSELING_UP_FAIL,
  EXPORT_REQUEST,
  EXPORT_SUCCESS,
  EXPORT_FAIL
} from '../constants/counselorConstant';

export const counselorAuthReducer = (state = { counselor: {} }, action) => {
  switch (action.type) {
    case COUNSELOR_LOGIN_REQUEST:
    case COUNSELOR_LOAD_USER_REQUEST:
    case COUNSELOR_REG_REQUEST:
      return {
        loading: true,
        isAuthenticatedCounselor: false
      }
    case COUNSELOR_LOGIN_SUCCESS:
    case COUNSELOR_LOAD_USER_SUCCESS:
    case COUNSELOR_REG_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticatedCounselor: true,
        counselor: action.payload
      }
    case COUNSELOR_LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticatedCounselor: false,
        counselor: null
      }
    case COUNSELOR_LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticatedCounselor: false,
        counselor: null,
        error: action.payload
      }
    case COUNSELOR_REG_FAIL:
    case COUNSELOR_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticatedCounselor: false,
        counselor: null,
        error: action.payload
      }
    case COUNSELOR_LOGOUT_USER_FAIL:
      return {
        ...state,
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

export const counselorReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNSELOR_UPDATE_PROFILE_REQUEST:
    case COUNSELOR_UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COUNSELOR_UPDATE_PROFILE_SUCCESS:
    case COUNSELOR_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case COUNSELOR_UPDATE_PROFILE_FAIL:
    case COUNSELOR_UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
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

export const counselingRequestReducer = (state = {requests:{},}, action) => {
  switch (action.type) {
    case COUNSELING_REQUEST:
      return {
        ...state,
        loading: true
      }
   
    case COUNSELING_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload
      }
    case COUNSELING_FAIL:
      return {
        ...state,
        loading: false,
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

export const counselingAcceptReducer = (state = {requests:{},}, action) => {
  switch (action.type) {
    case COUNSELING_ACCEPT_REQUEST:
      return {
        ...state,
        loading: true
      }
   
    case COUNSELING_ACCEPT_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload
      }
    case COUNSELING_ACCEPT_FAIL:
      return {
        ...state,
        loading: false,
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

export const counselingUnderProcessReducer = (state = {requests:{},}, action) => {
  switch (action.type) {
    case COUNSELING_UP_REQUEST:
      return {
        ...state,
        loading: true
      }
   
    case COUNSELING_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload
      }
    case COUNSELING_UP_FAIL:
      return {
        ...state,
        loading: false,
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

  export const exportData = (state = {data:{}}, action) => {
    switch (action.type) {
      case EXPORT_REQUEST:
        return {
          ...state,
          loading: true
        }
     
      case EXPORT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload
        }
      case EXPORT_FAIL:
        return {
          ...state,
          loading: false,
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