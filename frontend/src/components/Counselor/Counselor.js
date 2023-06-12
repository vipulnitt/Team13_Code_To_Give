import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptRequests, counselingRequests } from '../../actions/counselorAction';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
const Counselor = () => {

const navigate= useNavigate();
const dispatch = useDispatch();
const {counselor} = useSelector(state=>state.Counselor);
const { requests,loading} = useSelector(state=>state.counselingRequest);
const [currentSelect,setCurrentSelect] = useState(null); 
const [currentPages,setcurrentPages] = useState(0); 

const [currentPage,setCurrentPage] = useState(1);
const [list,setList] = useState(null); 
const [count,setCount] = useState(0);
const [resPerPage,setResPerPage] = useState(0);
useEffect(()=>{
    if(requests)
    {
        setList(requests.response);
        setCount(requests.count)
        setResPerPage(requests.resPerPage);
    
    }

},[requests]);
useEffect(()=>{
    dispatch(counselingRequests(currentPage));
},[dispatch,currentPage]);

  useEffect(()=>{
  dispatch(counselingRequests());
  },[dispatch]);
  const handleAccept=()=>{
        dispatch(acceptRequests(currentSelect._id));
        dispatch(counselingRequests());
        Swal.fire({
            icon: 'success',
            title: 'Counselor',
            text: "Accepted!",
            showConfirmButton: false,
            timer: 2000,
          });
          setCurrentSelect(null);
  }

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }
  if(currentPages==="1")
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
    <button className="bg-success text-white ml-3 mt-3" onClick={()=>setcurrentPages("0")} ><i  className="bi bi-arrow-return-left"></i>Back</button> 
    </Fragment>)
  }
  return (
    <Fragment>
         {counselor&&counselor.approved?(
         <Fragment>
             <button className="mt-3 ml-3" onClick={()=>navigate('/counselor/underprocess')}>Counseling Under Process</button>
            <div className="mt-3" style={{ display: 'flex' }}>
            <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
                 <div className="card bg-dark">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Pending list
                        </span>
                    </div>
            
                    {loading?<Loader/>:<>
                    {Array.isArray(list) && list.map((c, index) => (
                   <div className="card mb-0" key={index}>
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                               <Link onClick={()=>setCurrentSelect(c)}>
                               <b>Type:</b>{c.addictionType}   <b>Contact Details:</b> {c.email}
                                </Link>
                            </div>
                        </div>
                        </div>
                    ))}
                    </>}    

                      <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            
                            <Pagination activePage={currentPage} 
      itemsCountPerPage={resPerPage}
      totalItemsCount={count}
      onChange={setCurrentPageNo}
      nextPageText={'Next'}
      prevPageText={'Previous'}
      firstPageText={'First Page'}
      lastPageText={'Last Page'}
      itemClass='page-item'
      linkClass='page-link'/>
                            </div>
                        </div>
                        </div>     
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
                            <button className="mr-5"onClick={()=>setcurrentPages("1")}>Show Response</button>
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
           <h1>Please wait your form is under process....</h1> 
         </Fragment>)}
    </Fragment>
   

  )
}

export default Counselor