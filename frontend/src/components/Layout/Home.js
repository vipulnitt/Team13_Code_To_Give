import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/adminAction';



const Home = () => {
  const navigate = useNavigate();
  
  const submitHandler = () =>
  {
    navigate('/admin/login');
  }
  const dispatch = useDispatch();
  const {isAuthenticated,error, loading}= useSelector(state=>state.auth);
  useEffect(()=>{
      if(isAuthenticated) {
        navigate('/admin');
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
    <button type="button" className="btn btn-primary " onClick={submitHandler}>Admin Login</button>
  </div>
  
  <br/>
  <hr/>
    </Fragment>

  )
}

export default Home