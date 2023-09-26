import React, { useState } from 'react';
import axios from 'axios';
import BuddyProfile from './BuddyProfile';

function ProfileSearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    language: '',
    locationCity: '',
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const handleResultClick = (userId) => {
    setSelectedUserId(userId); // Set the selected user's UID
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:7070/auth/search-profiles', searchCriteria);

      if (response.status === 200) {
        setSearchResults(response.data.profiles);
      } else {
        console.error('Error searching profiles');
      }
    } catch (error) {
      console.error('Error searching profiles', error);
    }
  };

  return (
    <div>
      <h2>Profile Search</h2>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={searchCriteria.firstName}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={searchCriteria.lastName}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={searchCriteria.language}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h3>Search Results</h3>
        <ul>
          {searchResults.map((profile) => (
            <li key={profile._id}>
              {profile.firstName} {profile.lastName}, {profile.email}, Language: {profile.language}
              <button onClick={() => handleResultClick(profile.uid)}>View Profile</button>
            </li>
          ))}
        </ul>
        {selectedUserId && <BuddyProfile userId={selectedUserId} />}
      </div>
    </div>
  );
}

export default ProfileSearch;
