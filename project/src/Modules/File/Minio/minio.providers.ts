import * as Minio from 'minio';
import { ConfigService } from '../../Config/config.service';
export const miniProviders = [
  {
    provide: 'MinioToken',
    useFactory: (config: ConfigService) => {
      return new Minio.Client({
        endPoint: config.get('MINIO_END_POINT'),
        port: config.get('MINIO_PORT'),
        useSSL: config.get('MINIO_USE_SSL'),
        accessKey: config.get('MINIO_ACCESS_KEY'),
        secretKey: config.get('MINIO_SECRET_KEY'),
      });
    },
    inject: [ConfigService],
  },
];
