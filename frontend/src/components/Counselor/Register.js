import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { counselorRegister } from '../../actions/counselorAction';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    expertise: [],
    experience: '',
  });

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
 const dispatch= useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonFormat = JSON.stringify(formData);
    console.log(jsonFormat);
    dispatch(counselorRegister(formData));
    
  };

  return (
    <Fragment>
        <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-3">Register</h1>
              <div className="form-group">
                <label htmlFor="name">
                  Name:
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email:
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password:
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber">
                  Mobile Number:
                  <input
                    type="tel"
                    name="mobileNumber"
                    id="mobileNumber"
                    className="form-control"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="experience">
                  Experience (year):
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Expertise:
                  <br />
                  <input
                    type="checkbox"
                    name="expertise"
                    value="drug"
                    checked={formData.expertise.includes('drug')}
                    onChange={handleCheckboxChange}
                  />
                  Drug
                  <br/>
                  <input
                    type="checkbox"
                    name="expertise"
                    value="porn"
                    checked={formData.expertise.includes('porn')}
                    onChange={handleCheckboxChange}
                  />
                  Porn
                </label>
              </div>
        
              <Link to="/counselor/login" className="float-right mb-4">Login?</Link>
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
