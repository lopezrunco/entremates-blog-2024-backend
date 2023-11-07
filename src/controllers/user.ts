import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import User from '../models/user';

const validate = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Token validated, returning user...');
    let firebase = res.locals.firebase;

    return User.findOne({ uid: firebase.uid })
        .then((user) => {
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Logging in user...');
    let { uid } = req.body;
    let fire_token = res.locals.fire_token;

    return User.findOne({ uid })
        .then((user) => {
            if (user) {
                logging.info(`User ${uid} found, signing in...`);
                return res.status(200).json({
                    user,
                    fire_token
                });
            } else {
                logging.info(`User ${uid} not found.`);
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.userID;
    logging.info(`Incoming read for ${_id}...`);

    return User.findById(_id)
        .then((user) => {
            if (user) {
                return res.status(200).json({ user });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Incoming read all users...');

    return User.find()
        .exec()
        .then((users) => {
            return res.status(200).json({
                count: users.length,
                users
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export default {
    validate,
    login,
    read,
    readAll
};
