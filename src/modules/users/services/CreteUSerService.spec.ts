import AppError from '@shared/errors/AppError';
import FakeRepository from '../repositories/fakes/UserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeRepository = new FakeRepository();
    const createUser = new CreateUserService(fakeRepository);

    const user = await createUser.execute({
      name: 'Lucas Santos',
      email: 'dev_lucas.santoS@hotmail.com',
      password: '3030303',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with same email', async () => {
    const fakeRepository = new FakeRepository();
    const createUser = new CreateUserService(fakeRepository);

    const user = await createUser.execute({
      name: 'Lucas Santos',
      email: 'dev_lucas.santoS@hotmail.com',
      password: '3030303',
    });

    expect(
      createUser.execute({
        name: 'Lucas Santos',
        email: 'dev_lucas.santoS@hotmail.com',
        password: '3030303',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
