import { Connection } from 'mongoose';
import { GoodsSchema } from './Schemas/goods.schema';

export const goodsProviders = [
  {
    provide: 'GoodsModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Goods', GoodsSchema),
    inject: ['DbConnectionToken'],
  },
];
