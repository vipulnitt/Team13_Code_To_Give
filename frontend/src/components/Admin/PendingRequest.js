import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptRequest, pendingRequest } from '../../actions/adminAction';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import Swal from 'sweetalert2';
 
const PendingRequest = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
            dispatch(pendingRequest());
    },[dispatch]);
    const { counselors = [],loading }= useSelector(state=>state.Counselors);
    const [currentCounselor,setCurrentCounselor] = useState(null);
    const handleAccept =(e)=>{
        e.preventDefault();
        if(!currentCounselor)
        {
            
            Swal.fire({
                icon: 'error',
                title: 'Counselor',
                text: "Please Select Counselor First!",
                showConfirmButton: false,
                timer: 2000,
              });
        }else
        {
            const updatedData = { "id":currentCounselor._id};
            dispatch(AcceptRequest(updatedData));
            setCurrentCounselor(null);
            Swal.fire({
                icon: 'success',
                title: 'Counselor',
                text: "Accepted!",
                showConfirmButton: false,
                timer: 2000,
              });
        }
       

    }
  return (
    <Fragment>
    <div className="mt-3" style={{ display: 'flex' }}>
    <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100" >
  <div className="card bg-dark" style={{ display: 'flex', backgroundColor:"526D82" }}>
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Pending Requests
                        </span>
                    </div>
            
                    {loading?<Loader/>:<>
                    {Array.isArray(counselors) && counselors.map((c) =>(
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                               <Link onClick={()=>setCurrentCounselor(c)}>
                               <b>Name:</b>  {c.name}  <b>Email:</b> {c.email}
                                </Link>
                            </div>
                        </div>
                        </div>
                    ))}
                    </>}
                    
                            
                    </div>
 
</div>
<div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
  <div className="card bg-dark"  style={{ backgroundColor:"526D82"}}>
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Selected Counselor
                        </span>
                    </div>  
                    <div className="card mb-0 ">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4" >
                            <b>Name:</b> {currentCounselor&&currentCounselor.name}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Email:</b> {currentCounselor&&currentCounselor.email}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Expertise Domain:</b> {currentCounselor&&currentCounselor.expertise.join(', ')}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Experience:</b> {currentCounselor&&currentCounselor.experience} years
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Mobile Number:</b> {currentCounselor&&currentCounselor.mobileNumber}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                           <button onClick={handleAccept}>Accept</button>
                            </div>
                        </div>
                        </div>

                    </div>
 
</div>
    </div>
   
    </Fragment>
  )
}

export default PendingRequest