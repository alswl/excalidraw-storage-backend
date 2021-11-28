import {
  Body,
  Controller,
  Get,
  Header,
  Logger,
  NotFoundException,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StorageNamespace, StorageService } from 'src/storage/storage.service';
import { Readable } from 'stream';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);
  namespace = StorageNamespace.FILES;

  constructor(private storageService: StorageService) {}

  @Get(':id')
  @Header('content-type', 'application/octet-stream')
  async findOne(@Param() params, @Res() res: Response): Promise<void> {
    const data = await this.storageService.get(params.id, this.namespace);
    this.logger.debug(`Get image ${params.id}`);

    if (!data) {
      throw new NotFoundException();
    }

    const stream = new Readable();
    stream.push(data);
    stream.push(null);
    stream.pipe(res);
  }

  @Put(':id')
  async create(@Param() params, @Body() payload: Buffer) {
    const id = params.id;
    await this.storageService.set(id, payload, this.namespace);
    this.logger.debug(`Created image ${id}`);

    return {
      id,
    };
  }
}
