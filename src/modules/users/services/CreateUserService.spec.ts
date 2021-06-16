import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('davi@email.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    await expect(
      createUserService.execute({
        name: 'Davi Prada Hoffmann',
        email: 'davi@email.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
