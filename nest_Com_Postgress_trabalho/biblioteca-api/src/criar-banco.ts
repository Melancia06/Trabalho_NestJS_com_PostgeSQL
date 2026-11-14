import { DataSource } from 'typeorm';
import { opcoesBanco } from './banco';
import { Carro } from './carros/carro';

async function criarBanco() {
  const servidor = new DataSource({ ...opcoesBanco, database: 'postgres' });
  await servidor.initialize();
  try {
    await servidor.createQueryRunner().createDatabase('biblioteca', true);
  } finally {
    await servidor.destroy();
  }

  const banco = new DataSource(opcoesBanco);
  await banco.initialize();
  try {
    const repositorio = banco.getRepository(Carro);
    if ((await repositorio.count()) > 0) {
      console.log('A tabela carros já tem dados');
      return;
    }

    await repositorio.save([
      { marca: 'Toyota', modelo: 'Corolla', ano: 2024, placa: 'ABC1D23' },
      { marca: 'Honda', modelo: 'Civic', ano: 2023, placa: 'DEF4G56' },
      { marca: 'Chevrolet', modelo: 'Onix', ano: 2022, placa: 'HIJ7K89' },
    ]);
    console.log('3 carros cadastrados');
  } finally {
    await banco.destroy();
  }
}

criarBanco().catch((erro: unknown) => {
  console.error('Falha ao criar o banco:', erro);
  process.exitCode = 1;
});
