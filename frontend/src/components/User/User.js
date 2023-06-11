import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion } from '../../actions/questionAction';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { submitData } from '../../actions/acceptDataAction';
import MetaData from '../Layout/MetaData';

const User = () => {
    const dispatch = useDispatch();
    const {question} = useSelector(state => state.question);
    const [questionId,setQuestionId] = useState('BASE0');
    const [optionId,setOptionId] = useState(null);
    const [responses, setResponses] = useState([]);
    const [ans, setAns] = useState("");
    const [addictionType, setAddictionType] = useState("");
    const navigate = useNavigate();
   // console.log(optionId);
    useEffect(() => {
        dispatch(getQuestion(questionId));
      }, []); 
   
    useEffect(()=>{
     dispatch(getQuestion(questionId));
     setOptionId(null);
    },[questionId]);

    if(optionId&&optionId.substring(1)==="notBooked")
    {
            const data ={ 
                userId:"NotProvided",
                email:"NotProvided", 
                Counseling:true,
                addictionType:addictionType,
                questions:responses
               };
               dispatch(submitData(data));
            
               Swal.fire({
                icon: 'success',
                title: 'Thanks for Sharing information!',
                text: "Your information valuable for us",
                showConfirmButton: false,
                timer: 10000,
              });
              setOptionId(null);
               navigate('/');
    }
   
    const handleNextQuestion = () => {
        if(!optionId&&ans===""){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Please provide answer for this question",
                showConfirmButton: false,
                timer: 1000,
              });
              return;
        }
        if(questionId==="booked")
    {
        const data ={ 
            userId:ans,
            email:ans, 
            Counseling:true,
            addictionType:addictionType,
            questions:responses
           };
           dispatch(submitData(data));
        
           Swal.fire({
            icon: 'success',
            title: 'Thanks for booking appointment!',
            text: "Counselor will contact you soon",
            showConfirmButton: false,
            timer: 10000,
          });
      //    setOptionId(null);
           navigate('/');
          
          }else
          {
            if(question.isText)
            {
                const a = {
                    q_id: questionId,
                    statement: question.statement,
                    ans: ans 
                  };
            
                  setResponses(prevResponses => [...prevResponses, a]);
                  setQuestionId(question.isText.childId);
                  setAns('');
            }else
            {
                const res= question.options.find(item => item.childId === optionId.substring(1)).option;
                const a = {
                    q_id: questionId,
                    statement: question.statement,
                    ans:res
                  };
                  if(questionId==="BASE2")
                  {
                     setAddictionType(res);
                  }
                  setResponses(prevResponses => [...prevResponses, a]);
                  setQuestionId(optionId.substring(1));
            }
        
          }
      
            
        
      
      };
  
  return (
    <Fragment>
        
        <MetaData title={'Dream Beyond Drugs'}/>
<br/>
<div className="d-flex justify-content-center align-items-center">
<div className="col-md-6 h-100 ">
  <div className="card bg-dark">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Questions
                        </span>
                    </div>  
                       {question?<Fragment>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                             <b>{question.statement}</b>
                            </div>
                        </div>
                        </div>
                        {question.isText?<Fragment>
                            <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <input type="text" className="form-control" value={ans} onChange={(e)=>setAns(e.target.value)} placeholder="Enter your answer"></input>
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <button style={{ backgroundColor: "#fa9c23",color:"#000" }} onClick={handleNextQuestion}>Next</button>
                            </div>
                        </div>
                        </div>
                           
                           
                        </Fragment>:<Fragment>
                            {question.options&&question.options.map((c,index)=>(
                                <Fragment key={index}>

                                 <div onClick={()=> setOptionId(index+c.childId)} key ={index} className={`card mb-0 ${optionId===index+c.childId?'bg-success':''}`} >
                                 <div key={index+"x"} className={`card-header card-header-inner`} data-toggle="collapse"
                                     data-parent="#accordion">
                                     <div className={`linkcorner`}>
                                     {c.option}
                                     </div>
                                 </div>
                                 </div>
                                
                                 </Fragment>
                                    
                            ))}
                             <div className="card mb-0">
                                 <div className="card-header card-header-inner" data-toggle="collapse"
                                     data-parent="#accordion" href="#applicant_login">
                                     <div className="linkcorner">
                                     <button style={{ backgroundColor: "#fa9c23" ,color:"#000"}} onClick={handleNextQuestion}>Next</button>
                                     </div>
                                 </div>
                                 </div>
                            </Fragment>}

                            
                       </Fragment>:<></>}
                       
                       
                        </div>
                        </div>
                        </div>
    </Fragment>
  )
}

export default User