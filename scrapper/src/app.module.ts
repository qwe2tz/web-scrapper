import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './modules/apartment/entities/apartment.entity';
import { ApartmentModule } from './modules/apartment/apartment.module';
import { ScrapperModule } from './modules/scrapper/scrapper.module';
import { ScrapperService } from './modules/scrapper/scrapper.service';
import { ApartmentService } from './modules/apartment/apartment.service';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

// TODO: Maybe I wanna switch to Redis
// import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      password: process.env.POSTGRES_USER,
      username: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Apartment],
      synchronize: true,
      logging: true,
    }),
    // Queue
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    ApartmentModule,
    ScrapperModule,
  ],

  controllers: [AppController],
  providers: [AppService, ScrapperService, ApartmentService],
})
export class AppModule {}
