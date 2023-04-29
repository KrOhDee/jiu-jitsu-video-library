import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      // Sign in user using email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect user to home page after successful sign in
      navigate('/');
    } catch (error) {
      // Show error message if sign in fails
      alert(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="sign-in-title">Sign In</h1>
      <form onSubmit={signIn}>
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
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
