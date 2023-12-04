import { Module } from '@nestjs/common';
import { FlatService } from './flat.service';
import { FlatController } from './flat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './entities/flat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flat])],
  controllers: [FlatController],
  providers: [FlatService],
  exports: [FlatService, TypeOrmModule.forFeature([Flat])],
})
export class FlatModule {}
