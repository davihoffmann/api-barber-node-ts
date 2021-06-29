import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/provider/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/provider/MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from '@shared/container/provider/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/provider/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import './CacheProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
