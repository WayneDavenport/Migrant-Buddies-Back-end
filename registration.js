import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [language, setLanguage] = useState('');
  const [bio, setBio] = useState('');
  const [locationCity, setLocationCity] = useState('');
  


  const handleRegistration = async (e) => {
    e.preventDefault();  

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const response = await axios.post('http://localhost:7070/auth/register', {
        email: user.email,
        password: user.password,
        firstName: firstName,
        lastName: lastName,
        language: language,
        bio: bio,
        locationCity: locationCity,
        uid: user.uid
                
      }/*, userInfoJson*/);
      if (response.status === 200) {
        alert('Profile created!');
        // Registration success, handle next steps (e.g., redirect to profile page)
      }
      alert('Profile created!')
      // Registration success, handle next steps (e.g., redirect to profile page)
    } catch (error) {
      // Handle registration error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <p>first</p>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <p>last</p>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <p>email</p>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>PW</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>Lng</p>
      <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
      <p>BIO</p>
      <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
      <p>city</p>
      <input type="text" value={locationCity} onChange={(e) => setLocationCity(e.target.value)} />
      <button type="submit">Register</button>
    </form>
)};

export default Registration;
