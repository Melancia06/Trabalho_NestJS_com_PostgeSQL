import { PostgresConnectionOptions }
from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Carro } from './carros/carro';
import { Cliente } from './clientes/cliente';
import { Locacao } from './locacoes/locacao';
export const opcoesBanco: PostgresConnectionOptions = {
type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'abc',
database: 'biblioteca',
entities: [Carro, Cliente, Locacao],
synchronize: true,
};
