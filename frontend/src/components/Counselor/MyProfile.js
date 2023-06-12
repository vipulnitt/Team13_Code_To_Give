import React, { Fragment, useEffect, useState } from 'react'

import Loader from '../../Loader';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    
    const {counselor} = useSelector(state=>state.Counselor);
    const[user,setUser] =useState(null);
    useEffect(()=>{
             setUser(counselor);
    },[counselor])

  return (
    <Fragment>
        <h1>My Profile</h1>
          <div className="container mt-5">
      <div className="card">
        <div className="card-body linkcorner text-left ml-4">
            {user?(<> <h2 className="card-title">Counselor Profile</h2>
          <p className="card-text"><b>Name:</b> {user.name}</p>
          <p className="card-text"><b>Email: </b>{user.email}</p>
         
          <p className="card-text"><b>Mobile Number:</b> {user.mobileNumber}</p>
          <p className="card-text"><b>Experience:</b> {user.experience} year(s)</p>
          <p className="card-text"><b>Expertise:</b> {user.expertise.join(', ')}</p>
          <p className="card-text"><b>Approved: </b>{user.approved ? 'Yes' : 'No'}</p>
          <p className="card-text"><b>Created At: </b>{new Date(counselor.createAt).toLocaleString()}</p>
        
        </>):<Loader/>}
        </div>
         
      </div>
    </div>
    </Fragment>
  )
};
export default MyProfile;