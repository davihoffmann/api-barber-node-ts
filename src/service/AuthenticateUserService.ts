import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    if (!user.password) {
      throw new Error('Incorrect email/password combination.');
    }

    // USA O AWAIT ANTES DA CHAMA DA FUNÇÃO POIS ELA RETORN UMA PROMISE
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // 1 - PAYLOAD, 2 - SECREAT, 3 - config do token
    // 8435c53e5c963b90f5dc2ed32ffa9e87
    const token = sign({}, '', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
