import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carro } from '../carros/carro';
import { Cliente } from '../clientes/cliente';

@Entity('locacoes')
export class Locacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carro, { nullable: false })
  @JoinColumn({ name: 'carro_id' })
  carro: Carro;

  @ManyToOne(() => Cliente, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'date' })
  dataInicio: string;

  @Column({ type: 'date' })
  dataFim: string;

  @Column({ default: 'ativa' })
  status: string;
}
