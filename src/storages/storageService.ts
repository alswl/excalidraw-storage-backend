export interface StorageService {
  save(id: string, data: Buffer): Promise<boolean>;

  load(id: string): Promise<Buffer | false>;
}
