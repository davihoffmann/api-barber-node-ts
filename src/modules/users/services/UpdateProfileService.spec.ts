import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile of the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Davi Hoffmann',
      email: 'davi3@email.com',
    });

    expect(updatedUser.name).toBe('Davi Hoffmann');
    expect(updatedUser.email).toBe('davi3@email.com');
  });

  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Davi Hoffmann',
        email: 'davi@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Davi Hoffmann',
      email: 'davi3@email.com',
      old_password: '123',
      password: '123456',
    });

    expect(userUpdated.password).toBe('123456');
  });

  it('should not be able to update the password without inform the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Davi Hoffmann',
        email: 'davi3@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Davi Hoffmann',
        email: 'davi3@email.com',
        old_password: '1234',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'usuario_nao_existente',
        name: 'Davi Hoffmann',
        email: 'davi3@email.com',
        old_password: '1234',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
