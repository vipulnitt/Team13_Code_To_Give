import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { counselorRegister } from '../../actions/counselorAction';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    expertise: [],
    experience: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'experience' ? parseInt(value) : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          expertise: [...prevData.expertise, value],
        };
      } else {
        return {
          ...prevData,
          expertise: prevData.expertise.filter((exp) => exp !== value),
        };
      }
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //const jsonFormat = JSON.stringify(formData);
    dispatch(counselorRegister(formData));
    
    Swal.fire({
      icon: 'success',
      title: 'Registed',
      text: "Successfully ",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/counselor');
  };

  return (
    <Fragment>
      <div className="container container-fluid" style={{ marginLeft: '7%' }}>
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-5 text-center">Register</h1>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber"
                  className="form-control"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience"
                />
                <label htmlFor="expertise">Expertise</label>
                <br />
                <input
                  type="checkbox"
                  name="expertise_Drugs"
                  value="Drugs"
                  style={{ transform: "scale(1.5)" }}
                  checked={formData.expertise.includes('Drugs')}
                  onChange={handleCheckboxChange}
                />
                <b>Drugs</b>
                <input
                  type="checkbox"
                  name="expertise_Porn"
                  value="Porn"
                  className="ml-3"
                  style={{ transform: "scale(1.5)" }}
                  checked={formData.expertise.includes('Porn')}
                  onChange={handleCheckboxChange}
                />
                <b>Porn</b>
                <input
                  type="checkbox"
                  name="expertise_Smoking"
                  value="Smoking"
                  className="ml-3"
                  style={{ transform: "scale(1.5)" }}
                  checked={formData.expertise.includes('Smoking')}
                  onChange={handleCheckboxChange}
                />
               <b>Smoking</b> 
                <input
                  type="checkbox"
                  name="expertise_Alcohol"
                  value="Alcohol"
                  className="ml-3"
                  style={{ transform: "scale(1.5)" }}
                  checked={formData.expertise.includes('Alcohol')}
                  onChange={handleCheckboxChange}
                />
                <b>Alcohol</b>
                <input
                  type="checkbox"
                  name="expertise_Mobile"
                  value="Mobile"
                  className="ml-3"
                  style={{ transform: "scale(1.5)" }}
                  checked={formData.expertise.includes('Mobile')}
                  onChange={handleCheckboxChange}
                />
              <b>  Mobile </b>
              </div>
              <Link to="/counselor/login" className="float-right mb-4">
                Login?
              </Link>
              <button className="btn btn-block py-3" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
