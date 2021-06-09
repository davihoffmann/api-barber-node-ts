import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('davi@email.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    expect(
      createUserService.execute({
        name: 'Davi Prada Hoffmann',
        email: 'davi@email.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
