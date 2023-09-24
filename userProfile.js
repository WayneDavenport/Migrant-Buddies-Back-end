const mongoose = require('mongoose');

    
const userProfileSchema = new mongoose.Schema({   
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: String, // Optional   
    email: { type: String, required: true },   
    language: { type: String, required: false },
    locationCity: { type: String, required: false },
    student: { type: Boolean, default: false },
    bio: { type: String, max: 200 }, // 200 character max
    uid: { type: String },
    requestsSent: [{ type: String }],
    requestsReceived: [{ type: String }],
    buddiesAccepted: [{ type: String }] 
});



module.exports = mongoose.model('UserProfile', userProfileSchema);