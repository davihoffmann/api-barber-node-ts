import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersrepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersrepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedidod de recupração de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
