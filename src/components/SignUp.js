import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/SignIn.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Sign up function to handle form submission
  const signUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigates to the home page after successful signup
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="sign-in-title">Sign Up</h1>
      <form onSubmit={signUp}>
        <input
          className="sign-in-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="sign-in-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="sign-in-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
