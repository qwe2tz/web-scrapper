import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './modules/flat/entities/flat.entity';
import { FlatModule } from './modules/flat/flat.module';

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
      // migrationsTableName: 'migration',
      // migrations: ['src/migration/*.ts'],
    }),
    FlatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
