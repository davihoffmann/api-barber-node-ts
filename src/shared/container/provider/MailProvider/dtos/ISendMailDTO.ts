import IParseMailTemplateDTO from '@shared/container/provider/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  nome: string;
  email: string;
}
export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
