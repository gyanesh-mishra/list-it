import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { List } from '../../../database/entity/List';

/*
API Handler for the the /api/list/<LIST_ID> router.
*/

// Handles incoming GET Requests
// Given a valid LIST_ID return the object or return not found.
export async function handleGET(req: Request, res: Response) {
  const listRepository = getRepository(List);
  const listId = req.params.listId;

  if (listId === undefined || listId === null) {
    res.status(400).json({ message: 'Please provide a valid list ID' });
  }

  try {
    const list: List = await listRepository.findOneOrFail(listId);
    res.json(list);
  } catch (error) {
    res.status(404).json({ message: 'List not found' });
  }
}

// Handles incoming POST Requests
// Given a valid LIST_ID and body return the newly created object or throw an error if it already exists.
export async function handlePOST(req: Request, res: Response) {
  const listRepository = getRepository(List);
  const listId = req.params.listId;

  if (listId === undefined || listId === null) {
    res.status(400).json({ message: 'Please provide a valid list ID' });
  }

  const listItems = req.body.items;
  const newList = new List();
  newList.id = listId;
  newList.items = listItems;

  try {
    await listRepository.save(newList);
  } catch (e) {
    res.status(409).json({ message: 'List already exists' });
    return;
  }

  // Success
  res.status(201).json(newList);
}

// Handles incoming PUT Requests
// Given a valid LIST_ID and body, return the updated list object or throw an error.
export async function handlePUT(req: Request, res: Response) {
  const listRepository = getRepository(List);
  const listId = req.params.listId;
  const listItems = req.body.items;

  if (listId === undefined || listId === null) {
    res.status(400).json({ message: 'Please provide a valid list ID' });
  }

  let list: List;

  // Look for the list in the database
  try {
    list = await listRepository.findOneOrFail(listId);
  } catch (error) {
    res.status(500).json({ message: 'Could not find list' });
  }

  // Update the list items
  try {
    list.items = listItems;
    await listRepository.save(list);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error while updating list' });
  }

  // Success
  res.json(list);
}
