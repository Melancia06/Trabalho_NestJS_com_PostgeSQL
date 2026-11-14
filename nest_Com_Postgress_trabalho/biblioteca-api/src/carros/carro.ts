import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carros')
export class Carro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column({ unique: true })
  placa: string;
}
