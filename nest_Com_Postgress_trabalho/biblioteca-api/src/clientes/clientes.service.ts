import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente';

export type CriarClienteDto = Pick<Cliente, 'nome' | 'email' | 'cnh'>;
export type AtualizarClienteDto = Partial<CriarClienteDto>;

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repositorio: Repository<Cliente>,
  ) {}

  listar(): Promise<Cliente[]> {
    return this.repositorio.find();
  }

  async buscar(id: number): Promise<Cliente> {
    const cliente = await this.repositorio.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${id} não existe`);
    }
    return cliente;
  }


}
