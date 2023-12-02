import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  image_url: string;
}
