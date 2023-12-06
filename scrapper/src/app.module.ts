import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './modules/flat/entities/flat.entity';
import { FlatModule } from './modules/flat/flat.module';
import { ScrapperModule } from './modules/scrapper/scrapper.module';
import { ScrapperService } from './modules/scrapper/scrapper.service';
import { FlatService } from './modules/flat/flat.service';
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
      entities: [Flat],
      database: 'flats',
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
    FlatModule,
    ScrapperModule,
  ],

  controllers: [AppController],
  providers: [AppService, ScrapperService, FlatService],
})
export class AppModule {}
