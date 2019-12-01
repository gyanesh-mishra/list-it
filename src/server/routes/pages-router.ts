import { Router } from 'express';
import { getManifest } from './manifest-manager';

/*
Router definition for any requests not caught by API or webpack manifest.
Send all requests to react router as the application is a Single page app.
*/

export function pagesRouter() {
  const router = Router();

  router.get(`/**`, async (_, res) => {
    const manifest = await getManifest();
    res.render('page.ejs', { manifest });
  });

  return router;
}
