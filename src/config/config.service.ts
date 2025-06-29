import { Injectable } from '@nestjs/common';
import { ConfigService as NestCS } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private cs: NestCS) {}
  get<T>(key: string): T { return this.cs.get<T>(key, { infer: true }); }
}
