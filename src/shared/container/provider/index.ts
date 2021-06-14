import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/provider/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/provider/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
