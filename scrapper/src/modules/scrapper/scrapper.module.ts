import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { FlatModule } from '../flat/flat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from '../flat/entities/flat.entity';

@Module({
  imports: [FlatModule, TypeOrmModule.forFeature([Flat])],
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
