import { Injectable } from '@nestjs/common';
import { StorageService } from './storageService';

@Injectable()
export class MemoryService implements StorageService {

  scenesMap = new Map<string, Buffer>();

  async save(id: string, data: Buffer): Promise<boolean> {
    this.scenesMap.set(id, data);
    return true;
  }

  async load(id: string): Promise<false | Buffer> {
    return this.scenesMap.get(id);
  }
}
