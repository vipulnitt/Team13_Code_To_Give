import React ,{Fragment, useEffect, useState}from 'react'
import MetaData from '../Layout/MetaData';
import Loader from '../../Loader.js'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { counselorLogin,clearErrors } from '../../actions/counselorAction';
const Login =()  => {
  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const {isAuthenticatedCounselor,error, loading}= useSelector(state=>state.Counselor);
  useEffect(()=>{

    if(isAuthenticatedCounselor) {
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/counselor');

    } if(error&&error!="Login first to access this resource."){
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'OOPS!',
          text: error,
          showConfirmButton: false,
          timer: 1500,
        });
          dispatch(clearErrors());
      
  }
},[dispatch,isAuthenticatedCounselor,error]);
 const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(counselorLogin(email,password));
    }
  return (
    <Fragment>
        {loading?<Loader/>:<Fragment>
        <MetaData title={'Counselor Login'}/>
            <div className="container container-fluid" style={{marginLeft:"7%"}}>
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Counselor Login</h1>
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

            <Link to="/counselor/register" className="float-right mb-4">Register?</Link>
  
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