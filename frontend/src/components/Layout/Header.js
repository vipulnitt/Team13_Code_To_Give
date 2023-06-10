import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadUser, logout } from '../../actions/adminAction';
import Swal from 'sweetalert2';
import { counselorLogout } from '../../actions/counselorAction';
const Header = () => {
  const {admin,loading} =  useSelector(state=>state.auth);
  const {counselor} = useSelector(state=>state.Counselor);
  const navigate= useNavigate();
  let location = useLocation();
  useEffect(()=>{},[location]);
  const dispatch = useDispatch();
    
  const logoutHandler = ()=>{
    dispatch(logout());
    Swal.fire({
      icon: 'success',
      title: 'Admin',
      text: `Logout Successfully.`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/');
    }
    const logoutCounselorHandler = ()=>{
      dispatch(counselorLogout());
      Swal.fire({
        icon: 'success',
        title: 'Counselor',
        text: `Logout Successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
      
      navigate('/');
    }
  return (
    <Fragment>
      <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark my-0">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src="images/logo.png" alt="abc" style={{ width:"20%"}}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav " style={{marginLeft:"10%"}}>
                <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/"><strong style={{fontSize:"1.1rem"}}>Home</strong> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/articles"?"active":""}`} aria-current="page" to="/articles"><strong style={{fontSize:"1.1rem"}}>Articles</strong> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/faqs"?"active":""}`} to="/faqs"><strong style={{fontSize:"1.1rem"}}>FAQs</strong> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about"><strong style={{fontSize:"1.1rem"}}>About</strong> </Link>
                    </li>
                    {!admin&&!counselor?(  <li className={`nav-item dropdown mx-1`}>
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <strong style={{fontSize:"1.1rem"}}>Login</strong>
                      </a>
                      <ul className="dropdown-menu my-3 show" style={{backgroundColor: "#DDE6ED"}}>
                        <Link className="dropdown-item" to='/admin/login'>Admin</Link>
                        <Link className="dropdown-item" to='/counselor/login'>Counselor</Link>  
                      </ul>
                    </li>):(<></>)}

                   
                    <li className="nav-item bg-dark">
                    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      {admin? (
                      <div className="dropdown">
                        <Link to="/admin" className='dropbtn' 
                        type="button" id = "dropDownMenuButton" data-toggle="dropdown" 
                        aria-haspopup="true"  aria-expanded="false">
                          <figure className='avatar avatar-nav'>
                            <img src ="images/avatar.png"
                            alt="abc"
                            className='rounded-circle'/>
                          </figure>
                          <span>{admin?admin.name:''}</span>
                          </Link>
                      
                          <div className="dropdown-content" aria-labelledby="dropDownMenuButton">
                          <Link  to='/profile'>Profile</Link>
                          {<Link to='/admin/counselors'>Counselors</Link>}
                            {<Link to='/admin/pendingRequest'>Pending Request</Link>}
                            {<Link to='/admin/response'>Responses</Link>}
                            <Link  to='/' onClick={logoutHandler}>Logout</Link>
                            </div>

                      </div>
        ):(<></>)}
       {counselor? (
                      <div className="dropdown ">
                        <Link to="/admin" className='dropbtn' 
                        type="button" id = "dropDownMenuButton" data-toggle="dropdown" 
                        aria-haspopup="true"  aria-expanded="false">
                          <figure className='avatar avatar-nav'>
                            <img src ="images/avatar.png"
                            alt="abc"
                            className='rounded-circle'/>
                          </figure>
                          <span>{counselor?counselor.name:''}</span>
                          </Link>
                      
                          <div className="dropdown-content " aria-labelledby="dropDownMenuButton">
                          <Link  to='/counselor/underprocess'>Under Process</Link>
                            <Link  to='/' onClick={logoutCounselorHandler}>Logout</Link>
                            </div>

                      </div>
        ):(<></>)}
      
        
      </div>
                    </li>
                
                </ul>
                
                </div>
            </div>
        </nav>
        

       
    </div>
      
      
      
      
      </>
   </Fragment>
  )
}

export default Header