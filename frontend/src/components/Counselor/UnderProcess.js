import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptRequests, completed, underProcess } from '../../actions/counselorAction';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import Swal from 'sweetalert2';
const UnderProcess = () => {
const {counselor} = useSelector(state=>state.Counselor);
const { requests,loading} = useSelector(state=>state.counselingAccept);
const [currentSelect,setCurrentSelect] = useState(null); 
const [currentPage,setCurrentPage] = useState(0); 
const [remark,setRemark] = useState(''); 
const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(underProcess());
  },[dispatch]);
  const handleSubmit=(e)=>{
        e.preventDefault();
     
        Swal.fire({
            icon: 'success',
            title: 'Counseling',
            text: "Completed!",
            showConfirmButton: false,
            timer: 2000,
          });
          const data ={
            "id":currentSelect._id,
            "remark":remark
          }
          dispatch(completed(data));
          navigate('/');
          setCurrentSelect(null);
          setRemark('');
       
  }
  if(currentPage==="1")
  {
    return(<Fragment >
     <div>
     <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
  <div className="card bg-dark">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Selected 
                        </span>
                    </div>  
                   
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Email:</b> {currentSelect&&currentSelect.email}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Addiction Type:</b> {currentSelect&&currentSelect.addictionType}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Counseling Needed(System Test):</b> {currentSelect&&(currentSelect?<>Yes</>:<>No</>)} 
                            </div>
                        </div>
                        </div>
                        {currentSelect&&currentSelect.mobileNumber?(<div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Mobile Number:</b> {currentSelect&&currentSelect.mobileNumber}
                            </div>
                        </div>
                        </div>):(<></>)}
                   
                    {currentSelect?(currentSelect.questions.map((c)=>(
                  
                  <div className="card mb-0">
                  <div className="card-header card-header-inner" data-toggle="collapse"
                      data-parent="#accordion" href="#applicant_login">
                      <div className="linkcorner text-left ml-4">
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
             <button className="mt-3 ml-3" onClick={()=>navigate('/counselor')}>Request List</button>
            <div className="mt-3" style={{ display: 'flex' }}>
            <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
                 <div className="card bg-dark">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Under Process List
                        </span>
                    </div>
            
                    {loading?<Loader/>:<>
                    {Array.isArray(requests) && requests.map((c, index) => (
                         <div className="card mb-0" key={index}> 
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
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
  <div className="card bg-dark">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Selected
                        </span>
                    </div>  
                   
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Email:</b> {currentSelect&&currentSelect.email}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Addiction Type:</b> {currentSelect&&currentSelect.addictionType}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Counseling Needed(System Test):</b> {currentSelect&&(currentSelect?<>Yes</>:<>No</>)} 
                            </div>
                        </div>
                        </div>
                        {currentSelect&&currentSelect.mobileNumber?(<div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <b>Mobile Number:</b> {currentSelect&&currentSelect.mobileNumber}
                            </div>
                        </div>
                        </div>):(<></>)}
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            Remark: <input type="text" value={remark} onChange={(e)=>setRemark(e.target.value)}></input>
                            </div>
                        </div>
                        </div>
                        <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <button className="mr-5"onClick={()=>setCurrentPage("1")}>Show Response</button>
                           <button onClick={handleSubmit}>Finished</button>
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

export default UnderProcess