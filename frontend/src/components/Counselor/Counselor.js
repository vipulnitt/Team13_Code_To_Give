import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { counselingRequests } from '../../actions/counselorAction';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import Popup from 'reactjs-popup';
const Counselor = () => {
  const {counselor} = useSelector(state=>state.Counselor);
const { requests,loading} = useSelector(state=>state.counselingRequest);
const [currentSelect,setCurrentSelect] = useState(null); 
const [currentPage,setCurrentPage] = useState(0); 
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(counselingRequests());
  },[dispatch]);
  const handleAccept=()=>{
  }
  if(currentPage==="1")
  {
    return(<Fragment >
     <div>
     <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
  <div className="card bg-primary">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Selected Counselor
                        </span>
                    </div>  
                   
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Email:</b> {currentSelect&&currentSelect.email}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Addiction Type:</b> {currentSelect&&currentSelect.addictionType}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Counseling Needed(System Test):</b> {currentSelect&&(currentSelect?<>Yes</>:<>No</>)} 
                            </div>
                        </div>
                        </div>
                        {currentSelect&&currentSelect.mobileNumber?(<div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Mobile Number:</b> {currentSelect&&currentSelect.mobileNumber}
                            </div>
                        </div>
                        </div>):(<></>)}
                   
                    {currentSelect?(currentSelect.questions.map((c)=>(
                  
                  <div className="card mb-0">
                  <div className="card-header card-header-inner" data-toggle="collapse"
                      data-parent="#accordion" href="#applicant_login">
                      <div className="linkcorner">
                      <b>{c.statement}</b> <br/>
                      {c.ans}
                      </div>
                  </div>
                  </div>
              ))):<></>}
                    </div>
 
                  </div>
     </div>
    <button className="bg-success text-white ml-3 mt-3" onClick={()=>setCurrentPage("0")} ><i  className="bi bi-arrow-return-left"></i>Back</button> 
    </Fragment>)
  }
  return (
    <Fragment>
         {counselor&&counselor.approved?(
         <Fragment>
            <div className="mt-3" style={{ display: 'flex' }}>
            <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
                 <div className="card bg-primary">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Pending Requests
                        </span>
                    </div>
            
                    {loading?<Loader/>:<>
                    {Array.isArray(requests) && requests.map((c) =>(
                        <div className="card mb-0">
                        <div className="card-header Array.isArray(requests) &&card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                               <Link onClick={()=>setCurrentSelect(c)}>
                               <b>Type:</b>{c.addictionType}   <b>Email:</b> {c.email}
                                </Link>
                            </div>
                        </div>
                        </div>
                    ))}
                    </>}         
                    </div>
 
           </div>

           <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
  <div className="card bg-primary">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Selected Counselor
                        </span>
                    </div>  
                   
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Email:</b> {currentSelect&&currentSelect.email}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Addiction Type:</b> {currentSelect&&currentSelect.addictionType}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Counseling Needed(System Test):</b> {currentSelect&&(currentSelect?<>Yes</>:<>No</>)} 
                            </div>
                        </div>
                        </div>
                        {currentSelect&&currentSelect.mobileNumber?(<div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <b>Mobile Number:</b> {currentSelect&&currentSelect.mobileNumber}
                            </div>
                        </div>
                        </div>):(<></>)}
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <button className="mr-5"onClick={()=>setCurrentPage("1")}>Show Response</button>
                           <button onClick={handleAccept}>Accept</button>
                            </div>
                        </div>
                        </div>

                    </div>
 
                  </div>
        </div>


         </Fragment>
         ):(
         <Fragment>
            Please wait your form is under process....
         </Fragment>)}
    </Fragment>
   

  )
}

export default Counselor