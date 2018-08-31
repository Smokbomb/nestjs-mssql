import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column('text')
  isPublished: string;
}