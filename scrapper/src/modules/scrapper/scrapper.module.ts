import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { ApartmentModule } from '../apartment/apartment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from '../apartment/entities/apartment.entity';
import { BullModule } from '@nestjs/bull';
import { ScrapperProcessor } from './scrapper.processor';
import { ApartmentService } from '../apartment/apartment.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scrapper',
    }),
    ApartmentModule,
    TypeOrmModule.forFeature([Apartment]),
  ],
  controllers: [ScrapperController],
  providers: [ApartmentService, ScrapperService, ScrapperProcessor],
})
export class ScrapperModule {}
