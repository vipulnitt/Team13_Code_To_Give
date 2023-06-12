import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCounselorById } from '../../actions/adminAction';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../Loader';

export const CounselorProfile = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        console.log(id);
         dispatch(getCounselorById(id));
    },[])
    const [counselor,setCounselor]= useState(null);
    
    const {selectedCounselor} = useSelector(state=>state.data);
    useEffect(()=>{
             if(selectedCounselor)
             {
                setCounselor(selectedCounselor.counselor);
             }
    },[selectedCounselor]);

  return (
    <Fragment>
          <div className="container mt-5">
      <div className="card">
        <div className="card-body linkcorner text-left ml-4">
            {counselor?(<> <h2 className="card-title">Counselor Profile</h2>
          <p className="card-text"><b>Name:</b> {counselor.name}</p>
          <p className="card-text"><b>Email: </b>{counselor.email}</p>
         
          <p className="card-text"><b>Mobile Number:</b> {counselor.mobileNumber}</p>
          <p className="card-text"><b>Experience:</b> {counselor.experience} year(s)</p>
          <p className="card-text"><b>Expertise:</b> {counselor.expertise.join(', ')}</p>
          <p className="card-text"><b>Approved: </b>{counselor.approved ? 'Yes' : 'No'}</p>
          <p className="card-text"><b>Created At: </b>{new Date(counselor.createAt).toLocaleString()}</p>
        
        </>):<Loader/>}
        </div>
         
      </div>
    </div>
    </Fragment>
  )
}
