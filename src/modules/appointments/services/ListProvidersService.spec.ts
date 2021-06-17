import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the provides', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Davi Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'João Afonso',
      email: 'joao@email.com',
      password: '123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Marcio Huggs',
      email: 'marcio@email.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
