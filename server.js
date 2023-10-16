const express = require("express");
const cors = require("cors");
const router = require('./routes/authRoutes');

require('dotenv').config() // For .env

const app = express();

const mongoose = require('mongoose');

var corsOptions = {
  origin: "http://localhost:3000"
};

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas', err);
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to chat application." });
});

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
  console.log(`Server running up in port ${PORT} yo...`);
});
