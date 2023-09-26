import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptRequestButton = ({ selectedBuddyId }) => {
  const [currentUserUid, setCurrentUserUid] = useState('');
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);

  useEffect(() => {
    // Get the current user's UID from local storage
    const uid = localStorage.getItem('uid');
    if (uid) {
      setCurrentUserUid(uid);
    }
  }, []);

  const handleAcceptBuddyRequest = () => {
    // Check if both UIDs are available
    if (currentUserUid && selectedBuddyId) {
      // Accept a buddy request
      axios
        .post('http://localhost:7070/auth/accept-buddy-request', {
          currentUserUid: currentUserUid,
          acceptedUid: selectedBuddyId,
        })
        .then((response) => {
          // Handle success, e.g., display a success message
          setIsRequestAccepted(true);
        })
        .catch((error) => {
          // Handle error, e.g., display an error message
          console.error('Error accepting buddy request: ', error);
        });
    }
  };

  return (
    <div>
      {isRequestAccepted ? (
        <p>Buddy Accepted!</p>
      ) : (
        <button onClick={handleAcceptBuddyRequest}>Accept Buddy Request</button>
      )}
    </div>
  );
};

export default AcceptRequestButton;
