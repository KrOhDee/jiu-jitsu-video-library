import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  // Use state to keep track of the user's authentication status
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Use effect to watch for changes in the user's authentication status
  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // Update the user state with the current user's authentication status
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Define a function to handle user logout
  const handleLogout = async () => {
    try {
      // Use the signOut function from the firebase/auth module to log the user out
      await signOut(auth);
      navigate('/');
    } catch (error) {
      // If an error occurs, show an alert with the error message
      alert('Error logging out:', error.message);
    }
  };

  return (
    <nav className="navbar-container">
      <h1 className="navbar-title">
        JitsuCavern{' '}
        <img
          src="https://static.thenounproject.com/png/643352-200.png"
          alt="JitsuCavern logo"
          className="navbar-logo"
        />
      </h1>

      <ul className="navbar-links">
        <li>
          <NavLink to="/" index="true">
            Home
          </NavLink>
        </li>
        {/* Check if the user is authenticated */}
        {user ? (
          // If the user is authenticated, show the playlist and logout links
          <>
            <li>
              <NavLink to="/playlist">Playlist</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          // If the user is not authenticated, show the signin and signup links
          <>
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
