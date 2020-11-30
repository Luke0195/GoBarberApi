import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;
    response.json({ user, token });
  } catch (error) {
    response.status(error.statusCode).json({ error: error.message });
  }
});

export default sessionsRoutes;
