import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrosModule } from './carros/carro.module';
import { LocacoesModule } from './locacoes/locacoes.module';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { opcoesBanco } from './banco';

@Module({
  imports: [TypeOrmModule.forRoot(opcoesBanco), CarrosModule, 
  ClientesModule, LocacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
