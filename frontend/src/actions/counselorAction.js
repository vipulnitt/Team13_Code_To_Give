import axios from "axios";
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
  COUNSELING_REQUEST,
  COUNSELING_SUCCESS,
  COUNSELING_FAIL,
  EXPORT_REQUEST,
  EXPORT_SUCCESS,
  EXPORT_FAIL,
  COUNSELING_ACCEPT_REQUEST,
  COUNSELING_ACCEPT_SUCCESS,
  COUNSELING_ACCEPT_FAIL,
  COUNSELING_UP_REQUEST,
  COUNSELING_UP_SUCCESS,
  COUNSELING_UP_FAIL,
  CLEAR_ERRORS,
} from '../constants/counselorConstant';



export const counselorLogin = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: COUNSELOR_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/v1/counselor/login', { email, password }, config);
      dispatch({
        type: COUNSELOR_LOGIN_SUCCESS,
        payload: data.counselor,
      });
    } catch (error) {
      dispatch({
        type: COUNSELOR_LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const counselorRegister = (userData) => async (dispatch) => {
    try {
      dispatch({
        type: COUNSELOR_REG_REQUEST,
      });
    //  console.log(JSON.stringify(userData));
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      };
      const { data } = await axios.post('/api/v1/counselor/register', userData, config);
      dispatch({
        type: COUNSELOR_REG_SUCCESS,
        payload: data.counselor,
      });
    } catch (error) {
      dispatch({
        type: COUNSELOR_REG_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const counselorLoadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: COUNSELOR_LOAD_USER_REQUEST,
      });
      const { data } = await axios.get('/api/v1/counselor/profile');
      dispatch({
        type: COUNSELOR_LOAD_USER_SUCCESS,
        payload: data.counselor,
      });
    } catch (error) {
      dispatch({
        type: COUNSELOR_LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const counselorLogout = () => async (dispatch) => {
    try {
      await axios.get('/api/v1/counselor/logout');
      dispatch({
        type: COUNSELOR_LOGOUT_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: COUNSELOR_LOGOUT_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  
  
  export const counselorUpdateProfile = (userData) => async (dispatch) => {
      try {
        dispatch({
          type: COUNSELOR_UPDATE_PROFILE_REQUEST,
        });
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        const { data } = await axios.put('/api/v1/counselor/profile/update', userData, config);
        dispatch({
          type: COUNSELOR_UPDATE_PROFILE_SUCCESS,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: COUNSELOR_UPDATE_PROFILE_FAIL,
          payload: error.response.data.message,
        });
      }
    };
    
  
  // Update Password
  
  export const counselorUpdatePassword = (counselorPasswords) => async (dispatch) => {
    try {
      dispatch({
        type: COUNSELOR_UPDATE_PASSWORD_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/form-data',
        },
      };
      const { data } = await axios.put('/api/v1/counselor/updatepassword', counselorPasswords, config);
      dispatch({
        type: COUNSELOR_UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: COUNSELOR_UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

 export const counselingRequests= (currentPage=1) => async (dispatch) =>{
  try {
    dispatch({
      type: COUNSELING_REQUEST,
    });
    const { data } = await axios.get('/api/v1/counselor/counselingrequest?page='+currentPage);
    dispatch({
      type: COUNSELING_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: COUNSELING_FAIL,
      payload: error.response.data.message,
    });
  }
 }

 export const acceptRequests= (s_id) => async (dispatch) =>{
  try {
    dispatch({
      type: COUNSELING_REQUEST,
    });
    const config = {
      headers: {
        'content-type': 'application/json'
      },
    };
   
    const { data } = await axios.put('/api/v1/counselor/acceptcounseling',{"id":s_id},config);

    console.log(data);
    dispatch({
      type: COUNSELING_SUCCESS,
      payload: data.response
    });
    
  } catch (error) {
    dispatch({
      type: COUNSELING_FAIL,
      payload: error.response.data.message,
    });
  }
 }

 export const underProcess= () => async (dispatch) =>{
  try {
    dispatch({
      type: COUNSELING_UP_REQUEST,
    });
    const { data } = await axios.get('/api/v1/counselor/underprocess');
    dispatch({
      type: COUNSELING_UP_SUCCESS,
      payload: data.response
    });
  } catch (error) {
    dispatch({
      type: COUNSELING_UP_FAIL,
      payload: error.response.data.message,
    });
  }
 }

 export const completed= (req) => async (dispatch) =>{
  try {
    dispatch({
      type: COUNSELING_ACCEPT_REQUEST,
    });
    const config = {
      headers: {
        'content-type': 'application/json'
      },
    };

    const { data } = await axios.put('/api/v1/counselor/finishedcounseling',req,config);
    dispatch({
      type: COUNSELING_ACCEPT_SUCCESS,
      payload: data.response
    });
  } catch (error) {
    dispatch({
      type: COUNSELING_ACCEPT_FAIL,
      payload: error.response.data.message,
    });
  }
 }

 export const getFinishedCounseling= () => async (dispatch) =>{
  try {
    dispatch({
      type: EXPORT_REQUEST,
    });
  

    const { data } = await axios.get('/api/v1/counselor/closedcounseling');
    dispatch({
      type: EXPORT_SUCCESS,
      payload: data.response
    });
  } catch (error) {
    dispatch({
      type: EXPORT_FAIL,
      payload: error.response.data.message,
    });
  }
 }

 