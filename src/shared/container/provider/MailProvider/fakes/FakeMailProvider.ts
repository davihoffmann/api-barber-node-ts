import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/provider/MailProvider/dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
