import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  size: string;

  @Column({ type: 'varchar', length: 100 })
  price: string;

  @Column({ type: 'varchar', length: 500 })
  image_url: string;
}
