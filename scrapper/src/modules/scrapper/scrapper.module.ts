import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { FlatModule } from '../flat/flat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from '../flat/entities/flat.entity';
import { BullModule } from '@nestjs/bull';
import { ScrapperProcessor } from './scrapper.processor';
import { FlatService } from '../flat/flat.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scrapper',
    }),
    FlatModule,
    TypeOrmModule.forFeature([Flat]),
  ],
  controllers: [ScrapperController],
  providers: [FlatService, ScrapperService, ScrapperProcessor],
})
export class ScrapperModule {}
