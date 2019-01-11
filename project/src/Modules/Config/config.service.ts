import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
export interface EnvConfig {
  [key: string]: string;
}
export class ConfigService {
  private readonly envConfig: EnvConfig;
  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      // default
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(3000),
      // db
      DATABASE_URL: Joi.string().default('mongod://localhost:27107'),
      DATABASE_USER: Joi.string().default('root'),
      DATABASE_PASSWORD: Joi.string().default('password'),
      DATABASE_NAME: Joi.string().default('demo'),
      // minio
      MINIO_END_POINT: Joi.string().default('minio'),
      MINIO_PORT: Joi.number().default(9000),
      MINIO_USE_SSL: Joi.bool().default(false),
      MINIO_ACCESS_KEY: Joi.string().default('access_key'),
      MINIO_SECRET_KEY: Joi.string().default('secret_key'),
      // redis
      REDIS_HOST: Joi.string().default('localhost'),
      REDIS_PORT: Joi.number().default(6379),
    });
    const { error, value: validateEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validateEnvConfig;
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
