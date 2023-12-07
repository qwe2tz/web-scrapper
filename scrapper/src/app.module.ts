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
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Apartment],
      database: 'apartments',
      synchronize: true,
      logging: true,
    }),
    // Queue
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ApartmentModule,
    ScrapperModule,
  ],

  controllers: [AppController],
  providers: [AppService, ScrapperService, ApartmentService],
})
export class AppModule {}
