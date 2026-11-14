import { DataSource } from 'typeorm';
import { Carro } from './carros/carro';
import { Cliente } from './clientes/cliente';
import { opcoesBanco } from './banco';
import { Locacao } from './locacoes/locacao';

const banco = new DataSource(opcoesBanco);

async function seed(): Promise<void> {
  await banco.initialize();
  try {
    const carrosRepositorio = banco.getRepository(Carro);
    const clientesRepositorio = banco.getRepository(Cliente);
    const locacoesRepositorio = banco.getRepository(Locacao);

    const carrosExemplo = [
      { marca: 'Toyota', modelo: 'Corolla', ano: 2024, placa: 'ABC1D23' },
      { marca: 'Honda', modelo: 'Civic', ano: 2023, placa: 'DEF4G56' },
      { marca: 'Chevrolet', modelo: 'Onix', ano: 2022, placa: 'HIJ7K89' },
    ];
    const carros: Carro[] = [];
    for (const dados of carrosExemplo) {
      const carro =
        (await carrosRepositorio.findOneBy({ placa: dados.placa })) ??
        (await carrosRepositorio.save(carrosRepositorio.create(dados)));
      carros.push(carro);
    }

    const clientesExemplo = [
      { nome: 'Ana Souza', email: 'ana@example.com', cnh: '12345678901' },
      { nome: 'Bruno Lima', email: 'bruno@example.com', cnh: '23456789012' },
      { nome: 'Carla Mendes', email: 'carla@example.com', cnh: '34567890123' },
    ];
    const clientes: Cliente[] = [];
    for (const dados of clientesExemplo) {
      const cliente =
        (await clientesRepositorio.findOneBy({ email: dados.email })) ??
        (await clientesRepositorio.save(clientesRepositorio.create(dados)));
      clientes.push(cliente);
    }

    const locacoesExemplo: Array<{
      carro: Carro;
      cliente: Cliente;
      dataInicio: string;
      dataFim: string;
    }> = [
      {
        carro: carros[0],
        cliente: clientes[0],
        dataInicio: '2026-01-10',
        dataFim: '2026-01-15',
      },
      {
        carro: carros[1],
        cliente: clientes[1],
        dataInicio: '2026-02-01',
        dataFim: '2026-02-05',
      },
      {
        carro: carros[2],
        cliente: clientes[2],
        dataInicio: '2026-03-12',
        dataFim: '2026-03-18',
      },
    ];
    for (const dados of locacoesExemplo) {
      const existente = await locacoesRepositorio.findOne({
        where: {
          carro: { id: dados.carro.id },
          cliente: { id: dados.cliente.id },
          dataInicio: dados.dataInicio,
        },
      });
      if (!existente) {
        await locacoesRepositorio.save(locacoesRepositorio.create(dados));
      }
    }

    console.log('Seed concluído: carros, clientes e locações cadastrados.');
  } finally {
    await banco.destroy();
  }
}

seed().catch((erro: unknown) => {
  console.error('Falha ao executar o seed:', erro);
  process.exitCode = 1;
});
