import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/uploads';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file);
    response.json({ message: 'Rota de imagem' });
  }
);
export default usersRoutes;
