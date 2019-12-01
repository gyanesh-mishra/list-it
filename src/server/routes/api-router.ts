import bodyParser from 'body-parser';
import { Router } from 'express';
import { handleGET, handlePOST, handlePUT } from './api/handler/list';

/*
Router definition for /api/list/<LIST_ID> endpoint.
*/

const LIST_API_PATH = '/api/list/:listId';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get(LIST_API_PATH, handleGET);
  router.post(LIST_API_PATH, handlePOST);
  router.put(LIST_API_PATH, handlePUT);

  return router;
}
