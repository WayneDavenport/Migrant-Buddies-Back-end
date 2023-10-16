const jwt = require('jsonwebtoken');
const UserProfile = require('../models/userProfile');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');


// Create a New User
exports.registerUser = async (req, res) => {
    const { email, password, firstName, lastName, bio, language, locationCity } = req.body;
    
    
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new UserProfile({
      email,
      password: hashedPassword, 
      firstName,
      lastName,
      bio,
      language,
      locationCity,
    });
  
    await user.save();
    console.log('User registered successfully');
    res.send('User registered successfully');
  };

// Login an existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserProfile.findOne({ email });
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
  
        res.cookie('token', token, { httpOnly: true }); 
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(404).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Fetch user profile from database  
exports.getUserProfile = async (req, res) => {
    const userEmail = req.params.userEmail;

    try {
      // Find the user by Email in your database
      const user = await UserProfile.findOne({ email: userEmail });
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

// Search profiles
exports.searchProfiles = async (req, res) => {
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
};

// Send a friend request
exports.sendBuddyRequest = async (req, res) => {
    try {
        const { senderEmail, selectedEmail } = req.body;
    
        // Find the sender's profile
        const senderProfile = await UserProfile.findOne({ email: senderEmail });
    
        // Find the selected user's profile
        const selectedProfile = await UserProfile.findOne({ uid: selectedEmail });
    
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
};

// Accept a friend request
exports.acceptBuddyRequest = async (req, res) => {
    try {
        const { currentUserEmail, acceptedEmail } = req.body;
    
        // Find the current user's profile
        const currentUserProfile = await UserProfile.findOne({ email: currentUserEmail });
    
        // Find the accepted user's profile
        const acceptedUserProfile = await UserProfile.findOne({ email: acceptedEmail });
    
        if (!currentUserProfile || !acceptedUserProfile) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Remove accepted user's email from the current user's requestsReceived array
        currentUserProfile.requestsReceived = currentUserProfile.requestsReceived.filter(email => email !== acceptedEmail);
    
        // Add accepted user's email to the current user's buddiesAccepted array
        currentUserProfile.buddiesAccepted.push(acceptedEmail);
    
        // Remove current user's email from the accepted user's requestsSent array
        acceptedUserProfile.requestsSent = acceptedUserProfile.requestsSent.filter(email => email !== currentUserEmail);
    
        // Add current user's email to the accepted user's buddiesAccepted array
        acceptedUserProfile.buddiesAccepted.push(currentUserEmail);
    
        // Save changes to both profiles
        await currentUserProfile.save();
        await acceptedUserProfile.save();
    
        res.status(200).json({ message: 'Buddy request accepted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

// Get buddy requests received for the current user
exports.getReceivedRequests = async (req, res) => {
  try {
    const currentUserEmail = req.params.currentUserEmail; // Get the UID from the route parameter

    // Find the user's profile by UID and retrieve the requestsReceived array
    const user = await UserProfile.findOne({ email: currentUserEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ requestsReceived: user.requestsReceived });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
