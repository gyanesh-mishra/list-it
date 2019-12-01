import dotenv from 'dotenv';
import findUp from 'find-up';
import path from 'path';
import fs from 'fs';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const IS_DEV = process.env.NODE_ENV !== 'production';

if (IS_DEV) {
  dotenv.config({ path: findUp.sync('.env') });
}

const packageJsonPath = path.join(process.cwd(), 'package.json');
const rawPackageJson = fs.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);
const { version: VERSION } = PackageJson;

// database
const DB_CONFIG: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '0.0.0.0',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'listit',
  entities: [__dirname + '/database/entity/*.js'],
  synchronize: true,
  logging: IS_DEV,
};

// server
const SERVER_PORT = process.env.PORT || 3000;
const WEBPACK_PORT = process.env.WEBPACK_PORT || 8080;

export { IS_DEV, VERSION, SERVER_PORT, DB_CONFIG, WEBPACK_PORT };
