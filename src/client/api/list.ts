import axios from 'axios';
import { IListDTO } from '../../shared/typings/IListDTO';

const LIST_API_BASE_URL = '/api/list';

export function getListById(id: string) {
  return axios
    .get(`${LIST_API_BASE_URL}/${id}`)
    .then(res => {
      return res.data as IListDTO;
    })
    .catch(err => {
      // Return null if the error is 404, so a new object can be created
      if (err.response.status === 404) {
        return null;
      }
      return err;
    });
}

export function createList(id: string, items: string[]) {
  const reqBody = { items: items };
  return axios
    .post(`${LIST_API_BASE_URL}/${id}`, reqBody)
    .then(res => res.data as IListDTO)
    .catch(err => {});
}

export function updateList(id: string, items: string[]) {
  const reqBody = { items: items };
  return axios.put(`${LIST_API_BASE_URL}/${id}`, reqBody).then(res => res.data as IListDTO);
}
