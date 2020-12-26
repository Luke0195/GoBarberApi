import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/uploads';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import usersController from '../controllers/UsersControllers';
import userAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', usersController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);
export default usersRoutes;
