import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente';
import { Locacao } from 'src/locacoes/locacao';
export type CriarClienteDto = Pick<Cliente, 'nome' | 'email' | 'cnh'>;
export type AtualizarClienteDto = Partial<CriarClienteDto>;

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repositorio: Repository<Cliente>,
    @InjectRepository(Locacao)
    private readonly locacoesRepositorio: Repository<Locacao>,
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

  
  async remover(id: number): Promise<void> {
    const cliente = await this.buscar(id);
    const locacoes = await this.locacoesRepositorio.count({
      where: { cliente: { id } },
    });
    if (locacoes > 0) {
      throw new ConflictException(
        `Não é possível remover o cliente ${id}: existem locações vinculadas`,
      );
    }

    await this.repositorio.remove(cliente);
  }

}
