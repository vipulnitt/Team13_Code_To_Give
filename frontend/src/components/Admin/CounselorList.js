import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubmissions, getBarData, getCounselorList, getPieData } from '../../actions/adminAction';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const CounselorList = () => {
  const [currentPage,setCurrentPage] = useState(1);
  const [list,setList] = useState(null); 
  const [count,setCount] = useState(0);
  const [resPerPage,setResPerPage] = useState(0);
  const {counselorList } = useSelector(state=>state.data);
   
  const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getCounselorList(currentPage));
},[dispatch,currentPage]);
useEffect(()=>{
    if(counselorList)
    {
        setList(counselorList.counselors);
        setCount(counselorList.count)
        setResPerPage(counselorList.resPerPage)
    }

},[counselorList])


 
  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

    
  return (
    <Fragment>
      <div className='d-flex justify-content-center align-items-center'>
        <div className="mt-3 col-md-6" >
    <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100 "  >
  <div className="card bg-dark">
                    <div className="card-header cardHead cardbg1">
                        
                       <span className="text-white notification cardHeadText">
                
                            <i className="fa fa-user"></i>Counselors
                        </span>
                    </div>
                    {list&&list.map((counselor)=>(
                        <div className="card mb-0 ">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner text-left ml-4">
                            <p><b>Name:</b> {counselor.name}</p>
                         <p><b>Email: </b>{counselor.email}</p>
                         <p><b>Expertise:</b> {counselor.expertise.join(', ')}</p>
                         <p><Link to={'/admin/counselor?id='+counselor._id}>See Profile</Link></p>
                            </div>
                        </div>
                        </div>
                    ))}
                    <div className="card mb-0">
                        <div className="card-header card-header-inner" data-toggle="collapse"
                            data-parent="#accordion" href="#applicant_login">
                            <div className="linkcorner">
                            <div className="d-flex justify-content-center mt-5">
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
                  

                    </div>
                    </div>
                    </div>
    </Fragment>
  );
};

export default CounselorList;
