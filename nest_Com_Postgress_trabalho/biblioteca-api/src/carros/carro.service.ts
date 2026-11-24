import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carro } from './carro';
import { Locacao } from 'src/locacoes/locacao';

export type CriarCarroDto = Pick<Carro, 'marca' | 'modelo' | 'ano' | 'placa'>;
export type AtualizarCarroDto = Partial<CriarCarroDto>;

@Injectable()
export class CarrosService {
  constructor(
    @InjectRepository(Carro)
    private readonly repositorio: Repository<Carro>,
    @InjectRepository(Locacao)
    private readonly locacoesRepositorio: Repository<Locacao>,
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
    async remover(id: number): Promise<void> {
    const carro = await this.buscar(id);
    const locacoes = await this.locacoesRepositorio.count({
      where: { carro: { id } },
    });
    if (locacoes > 0) {
      throw new ConflictException(
        `Não é possível remover o carro ${id}: existem locações vinculadas`,
      );
    }

    await this.repositorio.remove(carro);
  }
}