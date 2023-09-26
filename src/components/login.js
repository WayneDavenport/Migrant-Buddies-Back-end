import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import Profile from './profile';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;

      // Now that the user is signed in with Firebase, make a request to your server
      axios
        .post('http://localhost:7070/auth/login', { uid: user.uid })
        .then((response) => {
          const token = response.data.token; // Change this to response.data.token          
          // Store the JWT and uid in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('uid', user.uid);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      // The user could not be signed in, display an error message
      alert('Login failed');
      console.error(error);
    }
  };

  if (isLoggedIn) {
    return <Profile />; // Render the profile component if the user is logged in
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
