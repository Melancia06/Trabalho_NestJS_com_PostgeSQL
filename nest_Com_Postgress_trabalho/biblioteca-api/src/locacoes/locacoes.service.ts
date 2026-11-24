import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carro } from '../carros/carro';
import { Cliente } from '../clientes/cliente';
import { Locacao } from './locacao';

export interface CriarLocacaoDto {
  carroId: number;
  clienteId: number;
  dataInicio: string;
  dataFim: string;
}

export interface AtualizarLocacaoDto {
  status: string;
}

@Injectable()
export class LocacoesService {
  constructor(
    @InjectRepository(Locacao)
    private readonly repositorio: Repository<Locacao>,
    @InjectRepository(Carro)
    private readonly carrosRepositorio: Repository<Carro>,
    @InjectRepository(Cliente)
    private readonly clientesRepositorio: Repository<Cliente>,
  ) {}

  listar(): Promise<Locacao[]> {
    return this.repositorio.find({ relations: { carro: true, cliente: true } });
  }

  async buscar(id: number): Promise<Locacao> {
    const locacao = await this.repositorio.findOne({
      where: { id },
      relations: { carro: true, cliente: true },
    });
    if (!locacao) {
      throw new NotFoundException(`Locação ${id} não existe`);
    }
    return locacao;
  }
   async remover(id: number): Promise<void> {
    const resultado = await this.repositorio.delete(id);
    if (!resultado.affected) {
      throw new NotFoundException(`Locação ${id} não existe`);
    }
  }

}
