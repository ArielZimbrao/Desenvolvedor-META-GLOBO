import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
require('dotenv').config();

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  logging: false,
  migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
