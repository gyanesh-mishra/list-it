import bodyParser from 'body-parser';
import { Router } from 'express';
import { getListById } from '../db';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get('/api/list', (req, res) => {
    res.json(getListById("!"));
  });

  router.get('/api/list/:listId', (req, res) => {
    const listId = req.params.listId;
    res.json(getListById(listId));
  });

  router.post('/api/set-user', (req, res) => {
    res.send(`ok`);
  });

  return router;
}
