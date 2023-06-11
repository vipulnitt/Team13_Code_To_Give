import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REG_REQUEST,
    REG_SUCCESS,
    REG_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    PENDING_REQUEST,
    PENDING_SUCCESS,
    PENDING_FAIL,
    PIE_DATA_REQUEST,
    PIE_DATA_SUCCESS,
    PIE_DATA_FAIL,
    BAR_DATA_REQUEST,
    BAR_DATA_SUCCESS,
    BAR_DATA_FAIL,
    ALL_DATA_REQUEST,
    ALL_DATA_SUCCESS,
    ALL_DATA_FAIL,
    COUNSELOR_DATA_REQUEST,
    COUNSELOR_DATA_SUCCESS,
    COUNSELOR_DATA_FAIL,
    COUNSELORS_LIST_REQUEST,
    COUNSELORS_LIST_SUCCESS,
    COUNSELORS_LIST_FAIL,
    CLEAR_ERRORS,
    VOLUNTEER_DATA_REQUEST,
    VOLUNTEER_DATA_FAIL,
    VOLUNTEER_DATA_SUCCESS
} from '../constants/adminConstant';

export const authReducer = (state ={admin:{}},action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case REG_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case REG_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                admin: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated:false,
                admin:null
            }
        case LOAD_USER_FAIL:
                return{
                    loading:false,
                    isAuthenticated:false,
                    admin:null,
                    error: action.payload
                }
        case REG_FAIL:
        case LOGIN_FAIL:
            return{
                ...state,
                loading:false, 
                isAuthenticated:false,
                admin: null,
                error: action.payload
            }
        case LOGOUT_USER_FAIL:
            return{
                ...state,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
         default:
            return state;
    }

}
export const adminReducer =(state={},action)=>{
    switch(action.type){
       case UPDATE_PROFILE_REQUEST:
       case UPDATE_PASSWORD_REQUEST:
       return{
            ...state,
            loading:true
       }
       case UPDATE_PROFILE_SUCCESS:
       case UPDATE_PASSWORD_SUCCESS:
        return {
            ...state,
            loading:false,
            isUpdated:action.payload
        }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated:false
                
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
       default:
        return state;
    }
}

export const forgotPasswordReducer =(state={},action)=>{
    switch(action.type){
      
       case FORGOT_PASSWORD_REQUEST:  
       case NEW_PASSWORD_REQUEST:
       return{
            ...state,
            loading:true,
            error:null
       }
       case FORGOT_PASSWORD_SUCCESS:
        return {
            ...state,
            loading:false,
           message:action.payload
        }
       case NEW_PASSWORD_SUCCESS:
        return{
            ...state,
            success: action.payload
        }
        case NEW_PASSWORD_FAIL:
        case FORGOT_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
       default:
        return state;
    }
}


export const CounselorReducer = (state ={counselors:{}},action)=>{
        switch(action.type){
            case PENDING_REQUEST:
                return{
                    ...state,
                    loading:true
               }
            case PENDING_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    counselors: action.payload
                }
            case PENDING_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null
                    }
           default:
            return state;
        }
}
export const graphReducer= (state ={pie:{},bar:{}},action)=>{

    switch(action.type){

        case BAR_DATA_REQUEST:
        case PIE_DATA_REQUEST:
            return{
                ...state,
                loading:true
           }
        case PIE_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                pie: action.payload
            }
        case BAR_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                bar: action.payload
            }
        case BAR_DATA_FAIL:
        case PIE_DATA_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
       default:
        return state;
    }

}
export const Data= (state ={all:{},selectedCounselor:{},counselorList:{}, volunteerList:{}},action)=>{

    switch(action.type){
        case ALL_DATA_REQUEST:
        case VOLUNTEER_DATA_REQUEST:
        case COUNSELOR_DATA_REQUEST:
        case COUNSELORS_LIST_REQUEST:
            return{
                ...state,
                loading:true
           }
        case ALL_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                all: action.payload
            }
        case COUNSELOR_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                selectedCounselor: action.payload
            }
       case COUNSELORS_LIST_SUCCESS:
            return {
                ...state,
                loading:false,
                counselorList: action.payload
            }
        case VOLUNTEER_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                volunteerList: action.payload
            }
        case ALL_DATA_FAIL:
        case VOLUNTEER_DATA_FAIL:
        case COUNSELOR_DATA_FAIL:
        case COUNSELORS_LIST_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        
  
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
       default:
        return state;
    }

}