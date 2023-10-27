import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validate: (values) => {
      let errors = {};

      if (!values.username) {
        errors.username = 'Please enter a username';
      } else if (values.username.length < 5) {
        errors.username = 'Name shouldn\'t be less than 5 characters';
      } else if (values.username.length > 25) {
        errors.username = 'Name shouldn\'t be more than 25 characters';
      }

      if (!values.email) {
        errors.email = 'Please enter an email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`http://localhost:8800/api/users/${params.id}`, values);
        setLoading(false);
        navigate('/portal/user-list');
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  // Fetch user data and set it in Formik initialValues
  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/users/${params.id}`);
      const { username, email } = response.data;
      myFormik.setValues({ username, email });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [params.id]);

  return (
    <>
      <h3><b>User Edit</b></h3>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Username</label>
              <input
                name="username"
                value={myFormik.values.username}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.username ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.username}</span>
            </div>
            <div className="col-lg-6">
              <label>Email</label>
              <input
                name="email"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                type="email"
                className={`form-control ${myFormik.errors.email ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.email}</span>
            </div>
            <div className="col-lg-6">
              <label>Phone</label>
              <input
                name="phone"
                value={myFormik.values.phone}
                onChange={myFormik.handleChange}
                type="number"
                className={`form-control ${myFormik.errors.phone ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.phone}</span>
            </div>
          </div>
          <div className="col-lg-4 mt-3">
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? 'Updating...' : 'Update'}
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default UserEdit;
