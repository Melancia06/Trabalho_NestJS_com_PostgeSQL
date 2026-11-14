import {Controller,Get,Param,ParseIntPipe,} from '@nestjs/common';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  listar(): Promise<Cliente[]> {
    return this.clientesService.listar();
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clientesService.buscar(id);
  }

}
