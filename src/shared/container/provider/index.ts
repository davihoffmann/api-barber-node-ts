import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/provider/StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
