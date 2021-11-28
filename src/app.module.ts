import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RawParserMiddleware } from './raw-parser.middleware';
import { ScenesController } from './scenes/scenes.controller';
import { StorageService } from './storage/storage.service';
import { RoomsController } from './rooms/rooms.controller';
import { FilesController } from './files/files.controller';

@Module({
  imports: [],
  controllers: [ScenesController, RoomsController, FilesController],
  providers: [StorageService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawParserMiddleware).forRoutes('**');
  }
}
