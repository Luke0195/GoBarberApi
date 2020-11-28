import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default usersRoutes;
