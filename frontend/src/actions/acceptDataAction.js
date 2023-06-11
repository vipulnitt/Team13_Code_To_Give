import axios from "axios";
import {
    SUBMISSION_REQUEST,
    SUBMISSION_SUCCESS,
    SUBMISSION_FAIL
} from '../constants/questionConstant';

export const  submitData = (res)=> async(dispatch)=>{
    try{
    dispatch({
        type: SUBMISSION_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/v1/user/savedata',res,config);
    dispatch({
        type: SUBMISSION_SUCCESS,
        payload: data
    })

    } catch(error){
        dispatch({
            type:SUBMISSION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const  submitVolunteerData = (res)=> async(dispatch)=>{
    try{
    dispatch({
        type: SUBMISSION_REQUEST
    })
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    const {data} = await axios.post('/api/v1/volunteer/savedata',res,config);
    dispatch({
        type: SUBMISSION_SUCCESS,
        payload: data
    })

    } catch(error){
        dispatch({
            type:SUBMISSION_FAIL,
            payload: error.response.data.message
        })
    }
}