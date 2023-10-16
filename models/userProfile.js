const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

    
const userProfileSchema = new mongoose.Schema({   
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: String, // Optional   
    email: { type: String, required: true },
    password: { type: String, required: true },   
    language: { type: String, required: false },
    locationCity: { type: String, required: false },
    student: { type: Boolean, default: false },
    bio: { type: String, max: 200 }, // 200 character max
    uid: { type: String },
    requestsSent: [{ type: String }],
    requestsReceived: [{ type: String }],
    buddiesAccepted: [{ type: String }] 
});

userProfileSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            
            user.password = hash;
            next();
        });
    });
});



module.exports = mongoose.model('UserProfile', userProfileSchema);