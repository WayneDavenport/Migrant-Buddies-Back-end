const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

process.on("uncaughtException", err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

mongoose.connect(process.env.DATABASE, {}).then(() =>
    console.log('DB connection successful')).catch((err) => console.log('DB connection failed'));

    const port = process.env.PORT || 4000;

    const server = app.listen(port, () => {
        console.log(`App is running on port ${port}...`);
    });