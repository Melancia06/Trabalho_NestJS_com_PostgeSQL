import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Locacao } from 'src/locacoes/locacao';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente,Locacao])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
