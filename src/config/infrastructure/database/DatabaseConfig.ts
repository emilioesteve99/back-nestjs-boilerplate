import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig {
  public readonly database: string;
  public readonly host: string;
  public readonly password: string;
  public readonly port: number;
  public readonly user: string;

  public constructor() {
    this.database = process.env.DB_DATABASE as string;
    this.host = process.env.DB_HOST as string;
    this.password = process.env.DB_PASSWORD as string;
    this.port = parseInt(process.env.DB_PORT ?? '5432', 10);
    this.user = process.env.DB_USER as string;
  }
}
