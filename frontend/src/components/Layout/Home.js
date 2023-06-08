import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/adminAction';
import LoginCorner from './LoginCorner';



const Home = () => {
  const navigate = useNavigate();
  
  const submitHandler = () =>
  {
    navigate('/admin/login');
  }
  const dispatch = useDispatch();
  const {isAuthenticated,error, loading}= useSelector(state=>state.auth);
  const {isAuthenticatedCounselor}= useSelector(state=>state.Counselor);
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
    
      
    
      <div className="container d-flex justify-content-center mt-5">
    <LoginCorner></LoginCorner>
  </div>
  
  <br/>
  <hr/>
    </Fragment>

  )
}

export default Home