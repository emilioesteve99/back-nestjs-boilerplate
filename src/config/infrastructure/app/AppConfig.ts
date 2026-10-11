import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  public readonly port: number;

  public constructor() {
    this.port = parseInt(process.env.NODE_PORT ?? '3000', 10);
  }
}
