const express = require('express');
const jwt = require('jsonwebtoken');
const UserProfile = require('./userProfile');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.use(express.json());
router.use(bodyParser.json());

//Define Middleware, Create Token

function verifyToken(req, res, next) {
  // Extract the JWT token from the request header
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  try {
    // Verify the token using your JWT secret key
    const verified = jwt.verify(token, 'your_jwt_secret_key');

    // Attach the verified user data to the request object
    req.user = verified;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid tokens
    return res.status(401).json({ error: 'Invalid Token' });
  }
};


// Create a New User Route
router.post('/register', async (req, res) => {
  const { email, firstName, lastName, bio, language, locationCity, uid } = req.body;
  const user = new UserProfile({
      email,      
      firstName,
      lastName,
      bio,
      language,
      locationCity,
      uid 
  });
  await user.save();
  console.log('User registered successfully');
  res.send('User registered successfully');
});

//Login an existing user.| To Do: Add Authentication Route
router.post('/login', async (req, res) => {
  const { uid } = req.body;

  try {
    // Find the user by UID in your database
    const user = await UserProfile.findOne({ uid: uid });

    if (user) {
      // Create a JWT token with the UID
      const token = jwt.sign({ uid: user.uid }, 'your_jwt_secret_key', { expiresIn: '1h' });

      // Set the JWT token in the response header
      res.header('auth-token', token);

      // Send a success response
      res.status(200).json({ message: 'Login successful', token });
    } else {
      // User not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch user profile from database  
router.get('/users/:userId', verifyToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by UID in your database
    const user = await UserProfile.findOne({ uid: userId });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//route to search
router.post('/search-profiles', async (req, res) => {
  try {
    // Get the submitted values from the client
    const { firstName, lastName, middleName, email, language, locationCity } = req.body;

    // Build a query object based on the submitted values
    const query = {};
    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;
    if (middleName) query.middleName = middleName;
    if (email) query.email = email;
    if (language) query.language = language;
    if (locationCity) query.locationCity = locationCity;
    console.log('Query:', query);

    // Execute the query to find matching profiles
    const profiles = await UserProfile.find(query);
    console.log('Matching Profiles:', profiles);

    // Send the filtered profiles to the front end
    res.json({ profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to send a friend request
router.post('/send-buddy-request', async (req, res) => {
  try {
    const { senderUid, selectedUid } = req.body;

    // Find the sender's profile
    const senderProfile = await UserProfile.findOne({ uid: senderUid });

    // Find the selected user's profile
    const selectedProfile = await UserProfile.findOne({ uid: selectedUid });

    if (!senderProfile || !selectedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add sender's UID to the selected user's friendRequests array
    selectedProfile.requestsReceived.push(senderUid);

    // Add selected user's UID to the sender's sentRequests array
    senderProfile.requestsSent.push(selectedUid);

    // Save changes to both profiles
    await selectedProfile.save();
    await senderProfile.save();

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Accept a friend request
router.post('/accept-buddy-request', async (req, res) => {
  try {
    const { currentUserUid, selectedUid } = req.body;

    // Find the current user's profile
    const currentUserProfile = await UserProfile.findOne({ uid: currentUserUid });

    // Find the selected user's profile
    const selectedProfile = await UserProfile.findOne({ uid: selectedUid });

    if (!currentUserProfile || !selectedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the UID from the current user's friendRequests array
    currentUserProfile.requestsReceived = currentUserProfile.requestsReceived.filter(
      (uid) => uid !== selectedUid
    );

    // Add selected user's UID to the current user's friends array
    currentUserProfile.buddiesAccepted.push(selectedUid);

    // Save changes to both profiles
    await currentUserProfile.save();
    await selectedProfile.save();

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get buddy requests received for the current user
router.get('/requests-received/:currentUserUid', verifyToken, async (req, res) => {
  try {
    const currentUserUid = req.params.currentUserUid; // Get the UID from the route parameter

    // Find the user's profile by UID and retrieve the requestsReceived array
    const user = await UserProfile.findOne({ uid: currentUserUid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ requestsReceived: user.requestsReceived });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  module.exports = router;