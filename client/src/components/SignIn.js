import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignIn = ({ title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

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
      <br></br><br></br><br></br>
      <div className="wsk-cp-matches " >
        <h5>Login</h5>
        <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.5}}/>
        <br></br>
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
            <br></br>
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
          <br></br><br></br>
        </form>
      </div>
    </div>
    
  );
};

export default SignIn
