import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { List } from '../../../database/entity/List';

export async function handleGET(req: Request, res: Response) {
  const listRepository = getRepository(List);
  const listId = req.params.listId;

  try {
    const list: List = await listRepository.findOneOrFail(listId);
    res.json(list);
  } catch (id) {
    res.status(204).json({ message: 'List not found' });
  }
}

export async function handlePOST(req: Request, res: Response) {
  const listRepository = getRepository(List);
  const listId = req.params.listId;
  const listItems = req.body.items;
  const newList = new List();
  newList.id = listId;
  newList.items = listItems;

  try {
    await listRepository.save(newList);
  } catch (e) {
    res.status(409).send('list already in database');
    return;
  }

  res.status(201).json(newList);
}

export async function handlePUT(req: Request, res: Response) {
  const listRepository = getRepository(List);
  const listId = req.params.listId;
  const listItems = req.body.items;

  try {
    const list: List = await listRepository.findOneOrFail(listId);
    list.items = listItems;
    await listRepository.save(list);
    res.json(list);
  } catch (id) {
    res.status(204).json({ message: 'Cannot update list' });
  }
}
