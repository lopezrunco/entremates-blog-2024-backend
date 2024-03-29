import express from 'express';

import controller from '../controllers/user';
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.post('/login', extractFirebaseInfo, controller.login);
router.get('/validate', extractFirebaseInfo, controller.validate);
router.get('/read/:userID', controller.read);
router.get('/', controller.readAll);

export = router;
