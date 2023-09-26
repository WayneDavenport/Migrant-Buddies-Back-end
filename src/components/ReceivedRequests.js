import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AcceptRequestButton from './AcceptRequest';

function ReceivedRequests() {
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
  
    if (token && uid) {
      // Send a GET request to retrieve requestsReceived for the current user
       axios.get(`http://localhost:7070/auth/requests-received/${uid}`, {
      headers: {
        'auth-token': token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setRequestsReceived(response.data.requestsReceived);

        // Initialize an empty array to hold all profiles
        let allProfiles = [];

        // Use map instead of forEach to return an array of promises
        const profilePromises = response.data.requestsReceived.map((uid) => {
          return axios.get(`http://localhost:7070/auth/users/${uid}`, {
            headers: {
              'auth-token': token,
            },
          })
          .then((profileResponse) => {
            if (profileResponse.status === 200) {
              allProfiles.push({
                uid,
                name: `${profileResponse.data.firstName} ${profileResponse.data.lastName}`,
                email: profileResponse.data.email,
              });
            } else {
              console.error(`Error fetching profile for UID: ${uid}`);
            }
          })
          .catch((error) => {
            console.error(`Error fetching profile for UID: ${uid}`, error);
          });
        });

        // Use Promise.all to wait for all profile requests to complete
        Promise.all(profilePromises).then(() => {
          // Update the state once with all profiles
          setProfiles(allProfiles);
        });
      } else {
        console.error('Error fetching requests received');
      }
    })
    .catch((error) => {
      console.error('Error fetching requests received', error);
    });
  }
}, []);

  return (
    <div>
      <h2>Requests Received</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.uid}>
            Name: {profile.name}, BID:{profile.uid} Email: {profile.email}
            <AcceptRequestButton selectedBuddyId={profile.uid}/>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReceivedRequests;
