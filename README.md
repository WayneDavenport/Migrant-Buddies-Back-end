# Migrant-Buddies
Group Project
Registration is a front end react component
Getting Started
Before using the API, make sure you have the following prerequisites installed:

Node.js
npm (Node Package Manager)
MongoDB 

API Endpoints


These are the packages currently required for the project:

Backend (Node.js Express API):  

express: Web framework for Node.js.  
jsonwebtoken: For handling JSON Web Tokens (JWT) for authentication.  
mongoose: MongoDB object modeling for Node.js.  
cors: Middleware for enabling Cross-Origin Resource Sharing.  
express-validator (or express-validation as mentioned in your package.json): For request validation in Express.  
bcrypt and bcryptjs: Libraries for password hashing.  
dotenv: For loading environment variables from a .env file.  

Frontend (React Web App):  

axios: For making HTTP requests from the frontend.   
react: JavaScript library for building user interfaces.   
react-dom: React DOM library for rendering React components.   
react-router-dom: React router library for handling client-side routing.   
firebase: Firebase JavaScript SDK for integrating Firebase services.   

Configuration
You need to configure the API by setting your JWT secret key in the verifyToken middleware and configuring your MongoDB connection in the mongoose.connect() method.
// Replace 'your_jwt_secret_key' with your actual JWT secret key
const jwtSecretKey = 'your_jwt_secret_key';

// Configure your MongoDB connection here
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
___________________________________________
API Endpoints
1. Register a New User

Endpoint: POST /register
Description: Create a new user profile.

Request Body:
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "A brief bio about the user",
  "language": "English",
  "locationCity": "New York",
  "uid": "unique-user-id created by firebase"
}

2. Login an Existing User
Endpoint: POST /login

Description: Login an existing user and receive an authentication token.
Email & Password are authenticated with firebase and a user id (UID) is made available with:

const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      const uid = user.id
      

Request Body:
{
  "uid": "unique-user-id"
}


3. Fetch User Profile
Endpoint: GET /users/:userId

Description: Fetch a user's profile by providing their uid.

4. Search for User Profiles
Endpoint: POST /search-profiles

Description: Search for user profiles based on language and location city (will add more parameters later).

Request Body:
{
  "language": "English",
  "locationCity": "New York"
}



