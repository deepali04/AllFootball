import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import '../App.css';



// add redis session
const Navigation = () => {

  const sessionToken = sessionStorage.getItem('sessionToken');
  console.log(sessionToken);

  if (sessionToken) {
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
   
        <NavLink className='nav-links' to='/game'>
          Game
        </NavLink>
  
        <NavLink className='nav-links' to='/score'>
          Score
        </NavLink>

        <NavLink className='nav-links' to='/following'>
          My Followings
        </NavLink>
  
        <NavLink className='nav-links' to='/signout'>
          SignOut
        </NavLink>
  
         {/* <NavLink className='nav-links' to='/signup'>
          SignUp
        </NavLink>  */}
      </nav>
    );
    
  } else {
    // the user is not logged in
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
        {/* <NavLink className='nav-links' to='/game'>
          Game
        </NavLink>
  
        <NavLink className='nav-links' to='/score'>
          Score
        </NavLink> */}
  
        <NavLink className='nav-links' to='/signin'>
          LogIn
        </NavLink>
  
        <NavLink className='nav-links' to='/signup'>
          SignUp
        </NavLink>
      </nav>
    );
  }

}


const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <Link className='nav-links' to='/'>
        Home
      </Link>

      <Link className='nav-links' to='/signin'>
        LogIn
      </Link>

      <Link className='nav-links' to='/signup'>
        SignUp
      </Link>
    </nav>
  );
};

export default Navigation;
