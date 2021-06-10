import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageRepository from '@shared/container/provider/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

describe('CreateUser', () => {
  it('should be able to upload a new avatar image', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageRepository = new FakeStorageRepository();

    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    const uploadUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    );

    await uploadUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageRepository = new FakeStorageRepository();

    const uploadUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    );

    expect(
      uploadUserAvatar.execute({
        user_id: 'no-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updaing new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageRepository = new FakeStorageRepository();

    const deleteFile = jest.spyOn(fakeStorageRepository, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    const uploadUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    );

    await uploadUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await uploadUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
