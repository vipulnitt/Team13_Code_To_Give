import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const LoginCorner = () => {
  return (
    <Fragment>
        <div className="container d-flex justify-content-center mt-5">
  
        <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
      <div className="card bg-dark">
                        <div className="card-header cardHead cardbg1">
                            
                           <span className="text-white notification cardHeadText">
                    
                                <i className="fa fa-user"></i> Login Corner
                            </span>
                        </div>
                        <div className="card mb-0">
                                    <div className="card-header card-header-inner" data-toggle="collapse"
                                        data-parent="#accordion" href="#applicant_login">
                                        <div className="linkcorner">
                                           <Link to='/admin/login'>
                                              Admin
                                            </Link>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="card mb-0">
                                    <div className="card-header card-header-inner" data-toggle="collapse"
                                        data-parent="#accordion" href="#applicant_login">
                                        <div className="linkcorner">
                                           <Link to='/counselor/login'>
                                              Counselor
                                            </Link>
                                        </div>
                                    </div>
                                    </div>
                                  
                        </div>
     
    </div>
    </div>
        </Fragment>
  )
}

export default LoginCorner