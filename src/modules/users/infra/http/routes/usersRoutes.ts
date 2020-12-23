import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploads';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService();
  const user = await createUserService.execute({ name, email, password });
  delete user.password;
  response.json(user);
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updatedUserAvatarService = new UpdateUserAvatarService();
    const user = await updatedUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;
    response.json(user);
  }
);
export default usersRoutes;
