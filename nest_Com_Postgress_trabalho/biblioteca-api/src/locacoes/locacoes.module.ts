import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carro } from '../carros/carro';
import { Cliente } from '../clientes/cliente';
import { Locacao } from './locacao';
import { LocacoesController } from './locacoes.controller';
import { LocacoesService } from './locacoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locacao, Carro, Cliente])],
  controllers: [LocacoesController],
  providers: [LocacoesService],
})
export class LocacoesModule {}
