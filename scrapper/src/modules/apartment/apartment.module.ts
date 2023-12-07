import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [ApartmentService, TypeOrmModule.forFeature([Apartment])],
})
export class ApartmentModule {}
