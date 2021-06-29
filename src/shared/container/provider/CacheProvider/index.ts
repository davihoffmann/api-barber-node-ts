import { container } from 'tsyringe';

import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/container/provider/CacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
