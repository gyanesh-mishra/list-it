import fs from 'fs';
import path from 'path';
import { IS_DEV } from '../config';

export async function getManifest() {
  let manifestStr: string;

  // read from file system
  manifestStr = fs.readFileSync(path.join(process.cwd(), 'dist', 'statics', 'manifest.json'), 'utf-8').toString();

  const manifest = JSON.parse(manifestStr);
  return manifest;
}
