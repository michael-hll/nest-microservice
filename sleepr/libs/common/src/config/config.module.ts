import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // make the env variables from sub modules
      //ignoreEnvFile: true, // disable load .env file
      envFilePath: ['.env'],
      expandVariables: true, // this will make you can use existing env key into other keys
      //ignoreEnvFile: true, // set this to true is needed when deploy to production
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_NAME: Joi.required(),
        DATABASE_USER: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        JWT_SECRET: Joi.required(),
        JWT_TOKEN_AUDIENCE: Joi.required(),
        JWT_TOKEN_ISSUER: Joi.required(),
        JWT_ACCESS_TOKEN_TTL: Joi.required(),
        JWT_REFRESH_TOKEN_TTL: Joi.required(),
        REDIS_HOST: Joi.required(),
        REDIS_PORT: Joi.required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
