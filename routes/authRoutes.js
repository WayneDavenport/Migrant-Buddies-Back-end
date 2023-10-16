const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const cookieParser = require('cookie-parser')

router.use(express.json());
router.use(bodyParser.json());
router.use(cookieParser());

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

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users/:userId', verifyToken, userController.getUserProfile);
router.post('/search-profiles', userController.searchProfiles);
router.post('/send-buddy-request', userController.sendBuddyRequest);
router.post('/accept-buddy-request', userController.acceptBuddyRequest);
router.get('/requests-received/:currentUserUid', verifyToken, userController.getReceivedRequests);

module.exports = router;