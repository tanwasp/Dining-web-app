const express = required('express');
const app = express();

const db = require('./config/firebase');
// Use db to interact with Firestore

require('dotenv').config();


const PORT = process.envPORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
});

const serviceAccount = require(process.env.FIRESTORE_SERVICE_ACCOUNT);

