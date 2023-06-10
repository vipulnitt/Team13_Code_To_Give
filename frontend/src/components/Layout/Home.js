import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/adminAction';
import LoginCorner from './LoginCorner';



const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {isAuthenticated,error, loading}= useSelector(state=>state.auth);
  const {isAuthenticatedCounselor}= useSelector(state=>state.Counselor);
  useEffect(()=>{
    if(isAuthenticatedCounselor)
    {
      navigate('/counselor');
    }
  },[]);
  useEffect(()=>{
      if(isAuthenticated) {
        navigate('/admin');
      }
      if(isAuthenticatedCounselor)
      {
        navigate('/counselor');
      }
      if(error){
        
          dispatch(clearErrors());
          
      }
  },[dispatch,isAuthenticated,error]);
  
  return (
    <Fragment>
      <br/>
      
       <MetaData title={'Team13_Code_To_Give'}/> 
      <div className='gifContainer'>
        <img src="images/giphy.gif" className='gif' /> 
      
      <div className="opt">
        <h3>Lets Communicate Over...</h3>     
        <a href="/user" className="bt bt-color bt-animation-1"><img src="images/site.png" alt="" /> Site</a> 
        <a href="#" className="bt bt-color bt-animation-1"><img src="images/telegram.png" alt="" /> Telegram</a>
      </div>
      
      </div>
    </Fragment>

  )
}

export default Home