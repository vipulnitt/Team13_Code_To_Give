import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    REG_REQUEST,
    REG_SUCCESS,
    REG_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
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
    VOLUNTEER_DATA_SUCCESS,
    VOLUNTEER_DATA_FAIL
} from '../constants/adminConstant';

export const  login = (email, password)=> async(dispatch)=>{
    try{
    dispatch({
        type: LOGIN_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/v1/login',{email,password},config);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data.admin
    })

    } catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  register = (userData)=> async(dispatch)=>{
    try{
    dispatch({
        type: REG_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'multipart/form-data'
        }
    }
    const {data} = await axios.post('/api/v1/register',userData,config);
    dispatch({
        type: REG_SUCCESS,
        payload: data.admin
    })

    } catch(error){
        dispatch({
            type:REG_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  loadUser = ()=> async(dispatch)=>{
    try{
    dispatch({
        type: LOAD_USER_REQUEST
    })
   
    const {data} = await axios.get('/api/v1/profile');
    dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.admin
    })

    } catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const  logout = ()=> async(dispatch)=>{
    try{
   
     await axios.get('/api/v1/logout');
    dispatch({
        type: LOGOUT_USER_SUCCESS,

    })

    } catch(error){
        dispatch({
            type:LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors =()=> async (dispatch)=>{
    dispatch({
    type: CLEAR_ERRORS
    });
}

//Update Profile

export const  updateProfile = (userData)=> async(dispatch)=>{
    try{
    dispatch({
        type: UPDATE_PROFILE_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'multipart/form-data'
        }
    }
    const {data} = await axios.put('/api/v1/profile/update',userData,config);
    dispatch({
        type:UPDATE_PROFILE_SUCCESS,
        payload: data.success
    })

    } catch(error){
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
    
}

//update Password

export const  updatePassword = (passwords)=> async(dispatch)=>{
    try{
    dispatch({
        type: UPDATE_PASSWORD_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/form-data'
        }
    }
    const {data} = await axios.put('/api/v1/password/update',passwords,config);
    dispatch({
        type:UPDATE_PASSWORD_SUCCESS,
        payload: data.success
    })

    } catch(error){
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
    
}

export const  forgotPassword = (email)=> async(dispatch)=>{
    try{
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/v1/password/forgot',email,config);
    dispatch({
        type:FORGOT_PASSWORD_SUCCESS,
        payload: data.message
        
    })

    } catch(error){
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
    
}
export const  resetPassword = (token,passwords)=> async(dispatch)=>{
    try{
    dispatch({
        type: NEW_PASSWORD_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.put(`/api/v1/password/reset/${token}` ,passwords,config);
    dispatch({
        type:NEW_PASSWORD_SUCCESS,
        payload: data.success
        
    })

    } catch(error){
        dispatch({
            type:NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
    
}

export const pendingRequest =()=>async(dispatch)=>{
    try{
        dispatch({
            type: PENDING_REQUEST
        })
        
        const {data} = await axios.get('/api/v1/getpendingcounselor');
        dispatch({
            type:PENDING_SUCCESS,
            payload: data.counselors
            
        })
    
        } catch(error){
            dispatch({
                type:PENDING_FAIL,
                payload: error.response.data.message
            })
        }
}

export const AcceptRequest =(id)=>async(dispatch)=>{
    try{
        dispatch({
            type: PENDING_REQUEST
        })
        const config = {
            headers:{
                'content-type': 'application/json'
            }
        }
        
        const {d} = await axios.put('/api/v1/acceptCounselorRequest',id,config);
        const {data} = await axios.get('/api/v1/getpendingcounselor');
        dispatch({
            type:PENDING_SUCCESS,
            payload: data.counselors
            
        })
    
        } catch(error){
            dispatch({
                type:PENDING_FAIL,
                payload: error.response.data.message
            })
        }
}

export const getPieData =(id)=>async(dispatch)=>{
    try{
        dispatch({
            type: PIE_DATA_REQUEST
        })
      
        const {data} = await axios.get('/api/v1/addiction');
        dispatch({
            type:PIE_DATA_SUCCESS,
            payload: data.results
            
        })
    
        } catch(error){
            dispatch({
                type:PIE_DATA_FAIL,
                payload: error.response.data.message
            })
        }
}

export const getBarData =(id)=>async(dispatch)=>{
    try{
        dispatch({
            type: BAR_DATA_REQUEST
        })
      
        const {data} = await axios.get('/api/v1/agevsaddiction');
        dispatch({
            type:BAR_DATA_SUCCESS,
            payload: data
            
        })
    
        } catch(error){
            dispatch({
                type:BAR_DATA_FAIL,
                payload: error.response.data.message
            })
        }
}
export const getAllSubmissions =(currentPage=1)=>async(dispatch)=>{
    try{
        dispatch({
            type: ALL_DATA_REQUEST
        })
   //   console.log("xyz"+keyword);
        const {data} = await axios.get(`/api/v1/allsubmissions?page=${currentPage}`);
        dispatch({
            type:ALL_DATA_SUCCESS,
            payload: data
            
        })
    
        } catch(error){
            dispatch({
                type:ALL_DATA_FAIL,
                payload: error.response.data.message
            })
        }
}

export const getCounselorById =(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:  COUNSELOR_DATA_REQUEST
        })
        const config = {
            headers:{
                'content-type': 'application/json'
            }
        }
        const t ={"id":id};
        const {data} = await axios.post(`/api/v1/getcounselorbyid`,t,config);
        console.log("Hello"+JSON.stringify(data));
        dispatch({
            type:COUNSELOR_DATA_SUCCESS,
            payload: data
            
        })
    
        } catch(error){
            dispatch({
                type:COUNSELOR_DATA_FAIL,
                payload: error.response.data.message
            })
        }
}
export const getCounselorList =(currentPage=1)=>async(dispatch)=>{
    try{
        dispatch({
            type:  COUNSELORS_LIST_REQUEST
        })
    
        const {data} = await axios.get(`/api/v1/getcounselorslist?page=${currentPage}`);
        console.log(JSON.stringify(data));

        dispatch({
            type:COUNSELORS_LIST_SUCCESS,
            payload: data
            
        })
    
        } catch(error){
            dispatch({
                type:COUNSELORS_LIST_FAIL,
                payload: error.response.data.message
            })
        }
}

export const getAllVolunteers =(currentPage=1)=>async(dispatch)=>{
    try{
        dispatch({
            type: VOLUNTEER_DATA_REQUEST
        })
      
        const {data} = await axios.get(`/api/v1/getvolunteer?page=${currentPage}`);
        dispatch({
            type:VOLUNTEER_DATA_SUCCESS,
            payload: data
            
        })
    
        } catch(error){
            dispatch({
                type:VOLUNTEER_DATA_FAIL,
                payload: error.response.data.message
            })
        }
}