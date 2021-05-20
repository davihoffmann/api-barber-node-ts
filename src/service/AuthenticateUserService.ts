import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

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

    const { secreat, expiresIn } = authConfig.jwt;

    // 1 - PAYLOAD, 2 - SECREAT, 3 - config do token
    const token = sign({}, secreat, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
