import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carro } from './carro';

export type CriarCarroDto = Pick<Carro, 'marca' | 'modelo' | 'ano' | 'placa'>;
export type AtualizarCarroDto = Partial<CriarCarroDto>;

@Injectable()
export class CarrosService {
  constructor(
    @InjectRepository(Carro)
    private readonly repositorio: Repository<Carro>,
  ) {}

  listar(): Promise<Carro[]> {
    return this.repositorio.find();
  }

  async buscar(id: number): Promise<Carro> {
    const carro = await this.repositorio.findOneBy({ id });
    if (!carro) {
      throw new NotFoundException(`Carro ${id} não existe`);
    }
    return carro;
  }
}