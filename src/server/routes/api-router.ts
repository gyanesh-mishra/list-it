import bodyParser from 'body-parser';
import { Router } from 'express';
import { handleGET, handlePOST, handlePUT } from './api/handler/list';

const LIST_API_PATH = '/api/list/:listId';
const HEALTH_API_PATH = '/api/health';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get(LIST_API_PATH, handleGET);
  router.post(LIST_API_PATH, handlePOST);
  router.put(LIST_API_PATH, handlePUT);

  router.get(HEALTH_API_PATH, (req, res) => {
    res.json({ success: true });
  });

  return router;
}
