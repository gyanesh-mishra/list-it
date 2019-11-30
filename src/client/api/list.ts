import axios from 'axios';
import { IListDTO } from '../../shared/typings/IListDTO';

const LIST_API_BASE_URL = '/api/list'

export function getListById(id: string) {
  return axios.get(`${LIST_API_BASE_URL}/${id}`)
  .then(res =>
    res.data as IListDTO
  );
}

export function updateList(id: string, content: string[]) {
  console.log("Updated list : " + id + "content: " + content)
  return true
  // return axios.put(`${LIST_API_BASE_URL}/${id}`)
  // .then(res =>
  //   res.data as IListDTO
  // );
}
