import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReceivedRequests from './ReceivedRequests';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    language: '',
    bio: '',
    locationCity: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    if (token && uid) {
      axios
        .get(`http://localhost:7070/auth/users/${uid}`, {
          headers: {
            'auth-token': token,
          },
        })
        .then((response) => {
          const user = response.data;          
          setUserProfile({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            language: user.language,
            bio: user.bio,
            locationCity: user.locationCity,
          });
          setIsLoading(false); // Loading is complete
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setIsLoading(false); // Loading is complete, but there was an error
        });
    } else {
      setIsLoading(false); // Loading is complete, but no token or UID found
    }
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isLoggedIn) {
    return <h2>Please log in to see this page.</h2>;
  }

  return (
    <div>
      <h2>Email: {userProfile.email}</h2>
      <h2>First Name: {userProfile.firstName}</h2>
      <h2>Last Name: {userProfile.lastName}</h2>
      <h2>Language: {userProfile.language}</h2>
      <h2>Bio: {userProfile.bio}</h2>
      <h2>City: {userProfile.locationCity}</h2>            
    </div>
  );
};

export default Profile;
