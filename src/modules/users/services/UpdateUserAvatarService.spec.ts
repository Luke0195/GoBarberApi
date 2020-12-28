import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StoragedProvider/fakes/FakeStorageProvider';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarimage', () => {
  it('should be to create a new user', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProvider
    );

    const user = fakeRepository.create({
      email: 'dev_lucas.santoS@hotmail.com.br',
      name: 'Lucas Santos',
      password: '303030',
    });

    await updateUserAvatar.execute({
      user_id: (await user).id,
      avatarFilename: 'avatar.jpg',
    });

    expect((await user).avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar fom non existing user', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProvider
    );

    updateUserAvatar.execute({
      user_id: 'non-exists-user',
      avatarFilename: 'avatar.jpg',
    });

    expect(
      updateUserAvatar.execute({
        user_id: 'non-exists-user',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  /* it('should delete old avatar when updating new one', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProvider
    );

    const user = fakeRepository.create({
      email: 'dev_lucas.santoS@hotmail.com.br',
      name: 'Lucas Santos',
      password: '303030',
    });

    await updateUserAvatar.execute({
      user_id: (await user).id,
      avatarFilename: 'avatar.jpg',
    });
    await updateUserAvatar.execute({
      user_id: (await user).id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  //  expect((await user).avatar).toBe('avatar.jpg');
  }); */
});
