import path from 'path';
import express from 'express';
import { Router } from 'express';

export function staticsRouter() {
  const router = Router();

  const staticsPath = path.join(process.cwd(), 'dist', 'statics');

  // All the assets are in "statics" folder (Done by Webpack during the build phase)
  router.use('/statics', express.static(staticsPath));

  return router;
}
