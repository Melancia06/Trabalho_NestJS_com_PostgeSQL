import {
  Controller,Get,Param,
  ParseIntPipe,} from '@nestjs/common';
import { Carro } from './carro';
import { CarrosService } from './carro.service';
@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) {}

  @Get()
  listar(): Promise<Carro[]> {
    return this.carrosService.listar();
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number): Promise<Carro> {
    return this.carrosService.buscar(id);
  }

}
