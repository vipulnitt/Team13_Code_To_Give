import axios from "axios";
import { QUESTION_REQUEST,
    QUESTION_SUCCESS,
    QUESTION_FAIL
} from '../constants/questionConstant';

export const getQuestion = (id) => async (dispatch) => {
    try {
      dispatch({
        type: QUESTION_REQUEST,
      });
      const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
      const json= {"id":id};
      console.log(JSON.stringify(json));
      const { data } = await axios.post('/api/v1/fetchquestion', {id}, config);
      console.log(data);
      dispatch({
        type: QUESTION_SUCCESS,
        payload: data.question
      });
    } catch (error) {
      dispatch({
        type: QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };