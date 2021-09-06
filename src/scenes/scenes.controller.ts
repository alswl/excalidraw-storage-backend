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
import { MemoryService } from 'src/storages/memory.service';
import { hash, hexadecimalToDecimal } from 'src/utils';
import { Readable } from 'stream';

@Controller()
export class ScenesController {
  constructor(private storageService: MemoryService) {}
  @Get(':id')
  @Header('content-type', 'application/octet-stream')
  async findOne(@Param() params, @Res() res: Response): Promise<void> {
    const data = await this.storageService.load(params.id);

    const stream = new Readable();
    stream.push(data);
    stream.push(null);
    stream.pipe(res);
  }

  @Post()
  async create(@Body() payload: Buffer) {

    const drawingHash = hash(payload);
    const id = hexadecimalToDecimal(drawingHash);

    await this.storageService.save(id, payload);

    return {
      id,
      data: `http://localhost:8080/api/v2/${id}`,
    };
  }
}
