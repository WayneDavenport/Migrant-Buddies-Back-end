import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuddyRequestButton = ({ selectedUserId }) => {
  const [currentUserUid, setCurrentUserUid] = useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    // Get the current user's UID from local storage
    const uid = localStorage.getItem('uid');
    if (uid) {
      setCurrentUserUid(uid);
    }
  }, []);

  const handleSendBuddyRequest = () => {
    // Check if both UIDs are available
    if (currentUserUid && selectedUserId) {
      // Send a friend request
      axios
        .post('http://localhost:7070/auth/send-buddy-request', {
          senderUid: currentUserUid,
          selectedUid: selectedUserId,
        })
        .then((response) => {
          // Handle success, e.g., display a success message
          setIsRequestSent(true);
        })
        .catch((error) => {
          // Handle error, e.g., display an error message
          console.error('Error sending friend request: ', error);
        });
    }
  };

  return (
    <div>
      {isRequestSent ? (
        <p>Buddy request sent!</p>
      ) : (
        <button onClick={handleSendBuddyRequest}>Send Buddy Request</button>
      )}
    </div>
  );
};

export default BuddyRequestButton;
