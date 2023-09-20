const express = require('express');
const jwt = require('jsonwebtoken');
const UserProfile = require('./userProfile');
const router = express.Router();
//const { check, validationResult } = require('express-validator')

router.use(express.json());
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

router.post('/search-profiles', async (req, res) => {
  try {
    // Extract submitted information from the request body
    const { language, locationCity, } = req.body;

    // Construct a query object based on the submitted information
    const query = {};

    if (language) {
      query.language = language;
    }

    if (locationCity) {
      query.locationCity = locationCity;
    }

      // Use the query object to find matching profiles in the database
    const profiles = await UserProfile.find(query).exec();

    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  


  module.exports = router;