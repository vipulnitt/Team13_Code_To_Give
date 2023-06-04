import React ,{Fragment, useEffect, useState}from 'react'
import MetaData from '../Layout/MetaData';
import Loader from '../../Loader.js'
import { Link, useNavigate } from 'react-router-dom';
import {login, clearErrors} from '../../actions/adminAction'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const Login =()  => {
  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const {isAuthenticated,error, loading}= useSelector(state=>state.auth);
  useEffect(()=>{
    if(isAuthenticated) {
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/admin');
    }
    if(error){
      
        if(error){
          
          Swal.fire({
            icon: 'error',
            title: 'OOPS!',
            text: error,
            showConfirmButton: false,
            timer: 1500,
          });
            dispatch(clearErrors());
        }
        dispatch(clearErrors());
    }
},[dispatch,isAuthenticated,error]);
 const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email,password));
    }
  return (
    <Fragment>
        {loading?<Loader/>:<Fragment>
        <MetaData title={'Login'}/>
            <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

          </form>
		  </div>
    </div>
</div>
            </Fragment>}
    </Fragment>
  )
}

export default Login