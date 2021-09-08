import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StorageNamespace, StorageService } from 'src/storage/storage.service';
import { hash, hexadecimalToDecimal } from 'src/utils';
import { Readable } from 'stream';

@Controller()
export class ScenesController {
  namespace = StorageNamespace.SCENES;

  constructor(private storageService: StorageService) {}
  @Get(':id')
  @Header('content-type', 'application/octet-stream')
  async findOne(@Param() params, @Res() res: Response): Promise<void> {
    const data = await this.storageService.get(params.id, this.namespace);

    const stream = new Readable();
    stream.push(data);
    stream.push(null);
    stream.pipe(res);
  }

  @Post()
  async create(@Body() payload: Buffer) {
    const drawingHash = hash(payload);
    const id = hexadecimalToDecimal(drawingHash);

    await this.storageService.set(id, payload, this.namespace);

    return {
      id,
      data: `http://localhost:8080/api/v2/${id}`,
    };
  }
}
