import ISendMailDTO from '@shared/container/provider/MailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
