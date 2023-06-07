import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    expertise: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonFormat = JSON.stringify(formData);
    console.log(jsonFormat);
    // You can send the jsonFormat to your backend or perform any desired action.
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
                <label>
                  Expertise:
                  <br />
                  <input
                    type="checkbox"
                    name="expertise"
                    value="porn"
                    checked={formData.expertise.includes('porn')}
                    onChange={handleCheckboxChange}
                  />
                  Porn<br/>
                  <input
                    type="checkbox"
                    name="expertise"
                    value="porn"
                    checked={formData.expertise.includes('porn')}
                    onChange={handleCheckboxChange}
                  />Drug <br/>
                   <input
                    type="checkbox"
                    name="expertise"
                    value="porn"
                    checked={formData.expertise.includes('porn')}
                    onChange={handleCheckboxChange}
                  />Social Media

                </label>
              </div>
              <button className="btn btn-block py-3" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>
        {`
        .form-group {
          margin-bottom: 1px;
        }
        `}
      </style>
    </Fragment>
  );
};

export default Register;
