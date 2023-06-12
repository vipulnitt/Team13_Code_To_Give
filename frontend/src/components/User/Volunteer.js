import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { submitData, submitVolunteerData } from '../../actions/acceptDataAction';
import MetaData from '../Layout/MetaData';

const Volunteer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [addictionType, setAddictionType] = useState('');
  const [details, setDetails] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create the JSON object
    const formData = {
      email,
      addictionType,
      questions: [
        {
          statement: 'Details',
          ans: details,
        },
        {
            statement: 'Suggetions',
            ans: suggestions,
          }

      ],
    };

    dispatch(submitVolunteerData(formData));

    Swal.fire({
      icon: 'success',
      title: 'Thanks for submitting the form!',
      text: 'Your data has been submitted successfully.',
      showConfirmButton: false,
      timer: 2000,
    });

    // Reset the form fields
    setEmail('');
    setAddictionType('');
    setSuggestions('');
    setDetails('');
  
    // Redirect to the desired page
    navigate('/');
  };

  return (
    <Fragment>
      <MetaData title={'Dream Beyond Drugs'} />
      <br />
      <div className="d-flex justify-content-center align-items-center">
<div className="col-md-6 h-100 ">
  <div className="card bg-dark">
          <div className="card-header cardHead cardbg1">
            <span className="text-white notification cardHeadText">
              <i className="fa fa-user"></i>Details
            </span>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="card mb-0">
              <div
                className="card-header card-header-inner"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#applicant_login"
              >
                <div className="linkcorner">
                  <b>Email:</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="card mb-0">
              <div
                className="card-header card-header-inner"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#applicant_login"
              >
                <div className="linkcorner">
                  <b>Addiction Type:</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter addiction type"
                    value={addictionType}
                    onChange={(e) => setAddictionType(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card mb-0">
              <div
                className="card-header card-header-inner"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#applicant_login"
              >
                <div className="linkcorner">
                  <b>Share the details:</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter answer"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card mb-0">
              <div
                className="card-header card-header-inner"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#applicant_login"
              >
                <div className="linkcorner">
                  <b>Suggestions:</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter answer"
                    value={suggestions} 
                    onChange={(e) => {setSuggestions(e.target.value)}}
                  />
                </div>
              </div>
            </div>

            <div className="card mb-0">
              <div
                className="card-header card-header-inner"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#applicant_login"
              >
                <div className="linkcorner">
                  <button  style={{ backgroundColor: "#fa9c23" ,color:"#000"}} type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Volunteer;
