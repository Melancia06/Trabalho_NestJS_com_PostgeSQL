import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carro } from './carro';
import { CarrosController } from './carro.controller';
import { CarrosService } from './carro.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carro])],
  controllers: [CarrosController],
  providers: [CarrosService],
})
export class CarrosModule {}
