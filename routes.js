const express = require('express');
const jwt = require('jsonwebtoken');
const UserProfile = require('./userProfile');
const router = express.Router();
//const { check, validationResult } = require('express-validator')




// Define routes
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, bio, language, locationCity } = req.body;
  const user = new UserProfile({ email, password, firstName, lastName, bio, language, locationCity });
  await user.save();
  console.log('User registered successfully');
  res.send('User registered successfully');
});
  
     /* // Save user profile to MongoDB
      const { firstName, lastName, middleName, email, language, locationCity, student, bio } = req.body;
      const userProfile = new UserProfile({
        firstName,
        lastName,
        middleName,
        email,
        language,
        locationCity,
        student,
        bio,
      });
      userProfile.save()
        .then(() => {
          console.log('User profile created.');
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
          res.status(201).json({ message: 'User profile created successfully' });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Failed to create user profile' });
        });
   */

  module.exports = router;