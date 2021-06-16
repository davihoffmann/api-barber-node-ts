import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Davi Prada Hoffmann',
      email: 'davi@email.com',
      password: '123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Davi Prada Hoffmann');
    expect(profile.email).toBe('davi@email.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
