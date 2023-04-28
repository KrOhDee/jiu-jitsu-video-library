import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <h1 className="navbar-title">JitsuCavern</h1>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" index="true">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlist">Playlist</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Sign In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
