import * as Minio from 'minio';

export const miniProviders = [
  {
    provide: 'MinioToken',
    useFactory: () => {
      return new Minio.Client({
        endPoint: 'minio',
        port: 9000,
        useSSL: false,
        accessKey: 'caseywang',
        secretKey: 'wangyang_1991',
      });
    },
  },
];
