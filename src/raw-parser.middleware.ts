import { Injectable, NestMiddleware } from '@nestjs/common';
import { raw } from 'express';
import { hasBody } from 'type-is';

// Excalidraw Front end doesn't send a Content Type Header
// so we tell raw parser to check if there is a body
const rawParserMiddleware = raw({
  type: hasBody,
  limit: process.env.BODY_LIMIT ?? '50mb',
});

@Injectable()
export class RawParserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    rawParserMiddleware(req, res, next);
  }
}
