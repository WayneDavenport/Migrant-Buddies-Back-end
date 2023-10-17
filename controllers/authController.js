const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const {promisify} = require("util");

const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
   
    user.password = undefined; //prevent showing password in the output

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {

    const existedUser = await User.findOne({email: req.body.email})
    if(existedUser) {
        res.status(200).json({
            message: 'User exists',
            data: existedUser
        })

        return;
    }

    const newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });

    createSendToken(newUser, 201, res);
    }
);

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;  //req.body.email
 
     // 1) Check if email and password exist
     if(!email || !password) {
         return next(new AppError('Please provide email and password!', 400));
     }
 
     // 2) Check if user exists and password is correct
     const user = await User.findOne({ email }).select('+password'); //{ email: email } .select('+password') - to show password which is not normally shown
     if(!user || !await user.correctPassword(password, user.password)) {
         return next(new AppError('Incorrect email or password', 401));
     }
 
     // 3) Send token to the client if everything is ok
     createSendToken(user, 200, res);
 });
 
 exports.protect = catchAsync(async (req, res, next) => {
    // 1)   Getting token and check if it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1] //  { authorization: 'Bearer fddsfdsfgdgsdfgsdf' }
    }

    // if(req.cookies.token) {
    //     token = req.cookies.token 
    // }

    if(!token) {
        return next(new AppError('You are not logged in!', 401));
    }

    // 2)   Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //verified token

    // 3)   Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser) {
        return next(new AppError('The user doesnt exist', 401));
    }

    // 4)   Check if user changed password after token was issued
    if(freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently chnaged password! Please login again', 401));
    }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = freshUser;

    next();
});

// Restricting to admin only
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have a permission', 403));
        }
        next();
    }
};

 



