import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ENV } from './app.config';
import { Logger } from '@nestjs/common';

const baseConfig = getEnv('base.env');
const envConfig = getEnv(`${ENV}.env`);
const senvConfig = Object.assign(baseConfig, envConfig);

console.log(`env:'${ENV}'`, 'loadConfig');

function getEnv(filePath: string): { [key: string]: string } {
  return dotenv.parse(fs.readFileSync(path.resolve('./.env/', filePath))) || {};
}

export class Config {
  public static getConf(key: string): string {
    return senvConfig[key];
  }
}
