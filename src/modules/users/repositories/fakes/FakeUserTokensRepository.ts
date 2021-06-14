import { uuid } from 'uuidv4';
import IUserTokensRepositoty from '@modules/users/repositories/IUserTokensRepositoty';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepositoty implements IUserTokensRepositoty {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(u => u.token === token);

    return userToken;
  }
}

export default FakeUserTokensRepositoty;
