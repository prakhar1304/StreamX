import { Router } from 'express';
import {
  resigertuser,
  loginUser,
  logOutuser,
} from '../controller/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

const router = Router();
//adding  middleware -->  jate  hua  mujhhe  milka  jan
router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'coverImage',
      maxCount: 1,
    },
  ]),
  resigertuser
);


router.route('/login').post(loginUser);
router.route('/logout').post(verifyUser, logOutuser);

export default router;
