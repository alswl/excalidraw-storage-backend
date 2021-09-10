import {
  Body,
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StorageNamespace, StorageService } from 'src/storage/storage.service';
import { Readable } from 'stream';
import { nanoid } from 'nanoid';

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
    const id = nanoid();

    // Nanoid has similar collision probability as uuid v4, so the following should *never* happen
    if (await this.storageService.get(id, this.namespace)) {
      throw new InternalServerErrorException();
    }

    await this.storageService.set(id, payload, this.namespace);

    return {
      id,
    };
  }
}
