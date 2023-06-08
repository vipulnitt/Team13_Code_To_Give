import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Counselor = () => {
  const {counselor} = useSelector(state=>state.Counselor);
  useEffect(()=>{

  },[])
  return (
    <Fragment>
         {counselor&&counselor.isApproved?<></>:(
         <Fragment>
            Please wait your form is under process....
         </Fragment>)}
    </Fragment>
   

  )
}

export default Counselor