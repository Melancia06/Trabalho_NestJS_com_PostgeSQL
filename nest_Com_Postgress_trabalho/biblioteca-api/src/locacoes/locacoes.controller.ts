import {Controller,Get,Param,ParseIntPipe,} from '@nestjs/common';
import { Locacao } from './locacao';
import { LocacoesService } from './locacoes.service';
import type { AtualizarLocacaoDto, CriarLocacaoDto } from './locacoes.service';

@Controller('locacoes')
export class LocacoesController {
  constructor(private readonly locacoesService: LocacoesService) {}

  @Get()
  listar(): Promise<Locacao[]> {
    return this.locacoesService.listar();
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number): Promise<Locacao> {
    return this.locacoesService.buscar(id);
  }

}
