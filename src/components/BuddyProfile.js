import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuddyRequestButton from './BuddyRequest';

const BuddyProfile = ({ userId }) => {
    const [userProfile, setUserProfile] = useState({
      email: '',
      firstName: '',
      lastName: '',
      language: '',
      bio: '',
      locationCity: '',
    });
    const [isLoading, setIsLoading] = useState(true); // Initially set to true
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token && userId) { // Use the passed userId
        axios
          .get(`http://localhost:7070/auth/users/${userId}`, {
            headers: {
              'auth-token': token
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
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
            setIsLoading(false); // Loading is complete, but there was an error
          });
      } else {
        setIsLoading(false); // Loading is complete, but no token or UID found
      }
    }, [userId]); // Include userId in the dependency array
  
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
  
    return (
      <div>
        <h2>Email: {userProfile.email}</h2>
        <h2>First Name: {userProfile.firstName}</h2>
        <h2>Last Name: {userProfile.lastName}</h2>
        <h2>Language: {userProfile.language}</h2>
        <h2>Bio: {userProfile.bio}</h2>
        <h2>City: {userProfile.locationCity}</h2>
        <BuddyRequestButton selectedUserId={userId}/>
      </div>
    );
  };

export default BuddyProfile;
