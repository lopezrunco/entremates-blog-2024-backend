import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose, { mongo } from 'mongoose';
import firebaseAdmin from 'firebase-admin';

import userRoutes from './routes/user';

const router = express();

// Handle server
const httpServer = http.createServer(router);

// Connect to Firebase admin and authenticates the token provided by the client side
let serviceAccountKey = require('./config/serviceAccountKey.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey)
});

// Connect to database
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
        logging.info('Mongo connected');
    })
    .catch((error) => {
        logging.error(error);
    });

// Log requests middleware
router.use((req, res, next) => {
    logging.info(`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`);
    res.on('finish', () => {
        logging.info(`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`);
    });
    next();
});

// Parse the body of the request
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// API access policies
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // We can acces this API from anywhere
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Headers allowed

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Routes
router.use('/users', userRoutes);

// Handle errors
router.use((req, res, next) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});

// Listen for requests
httpServer.listen(config.server.port, () => {
    logging.info(`Server running at ${config.server.host}:${config.server.port}.`);
});
