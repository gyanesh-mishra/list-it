import bodyParser from 'body-parser';
import { Router } from 'express';
import { handleGET } from './api/handler/list';

const LIST_API_PATH = '/api/list/:listId';
const HEALTH_API_PATH = '/api/health';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get(LIST_API_PATH, handleGET);

  router.post(HEALTH_API_PATH, (req, res) => {
    res.json({ success: true });
  });

  return router;
}
