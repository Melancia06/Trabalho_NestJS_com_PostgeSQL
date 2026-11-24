import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carro } from './carro';
import { CarrosController } from './carro.controller';
import { CarrosService } from './carro.service';
import { Locacao } from 'src/locacoes/locacao';

@Module({
  imports: [TypeOrmModule.forFeature([Carro,Locacao])],
  controllers: [CarrosController],
  providers: [CarrosService],
})
export class CarrosModule {}
