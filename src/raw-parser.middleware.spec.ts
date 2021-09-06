import { RawParserMiddleware } from './raw-parser.middleware';

describe('RawParserMiddleware', () => {
  it('should be defined', () => {
    expect(new RawParserMiddleware()).toBeDefined();
  });
});
