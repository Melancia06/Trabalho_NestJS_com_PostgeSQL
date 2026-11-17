import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,} from '@nestjs/common';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import type { AtualizarClienteDto, CriarClienteDto } from './clientes.service';

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
  
  @Post()
  criar(@Body() dados: CriarClienteDto): Promise<Cliente> {
    return this.clientesService.criar(dados);
  }

  @Put(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarClienteDto,
  ): Promise<Cliente> {
    return this.clientesService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientesService.remover(id);
  }
}
