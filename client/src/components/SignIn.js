import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignIn = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loginUser, { loading, error, data }] = useMutation(queries.LOGIN, {
    onCompleted: async (response) => {
      console.log(response);
      console.log('User exists');
      sessionStorage.setItem('sessionToken',JSON.stringify(response));
      window.location.href = 'http://localhost:3000/';

    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Either the username or password is incorrect',
      });
      console.log('User does not exist');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData;
    if(!username || !password) {
      console.log('Username or password is empty');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Either the username or password is empty',
      });
    } else{
      loginUser({ variables: { username, password } });
    }
    
  };

  return (
    <div class="col-md-4  offset-4 align-items-center ">
      <div className="wsk-cp-matches " >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className='teamname'>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='teamname'>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default SignIn
