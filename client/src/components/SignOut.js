import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import Swal from 'sweetalert2';

const Signout = () => {
  const navigate = useNavigate();
  const client = useApolloClient();

  sessionStorage.removeItem('sessionToken');


  // if (sessionCheck) {
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Signed out successfully!',
    // });
    window.location.href = 'http://localhost:3000/';
    //window.location.reload();
    // navigate('/', { replace: true });
  // }
  // else {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Unable to Logout!',
  // });
  // navigate('/', { replace: true });  
  // }

};

export default Signout;
