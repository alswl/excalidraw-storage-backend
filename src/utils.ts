import { createHash } from 'crypto';

export function hash(buffer): string {
  return createHash(`sha256`).update(buffer).digest(`hex`);
}

// Copied from https://github.com/NMinhNguyen/excalidraw-json
export function hexadecimalToDecimal(hexadecimal: string) {
  // See https://stackoverflow.com/a/53751162
  const bigInt = BigInt(`0x${hexadecimal}`);
  return bigInt.toString(10);
}
