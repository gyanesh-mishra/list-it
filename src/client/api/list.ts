import axios from './CustomAxios';
import { IListDTO } from '../../shared/typings/IListDTO';

/*
API Calls to the List REST API
TODO: Improve error handling
*/

const LIST_API_BASE_URL = '/api/list';

// getList fetches a List object from the API by making a HTTP GET request
// If the API returns a not found, return null else return error
export function getList(id: string) {
  return axios
    .get(`${LIST_API_BASE_URL}/${id}`)
    .then(res => {
      return res.data as IListDTO;
    })
    .catch(err => {
      // Return null if the error is 404, so a new object can be created
      if (err.response && err.response.status === 404) {
        return null;
      }
      return err;
    });
}

// createList creates a new List object by making a HTTP POST request with List ID and body
export function createList(id: string, items: string[]) {
  const reqBody = { items: items };
  return axios
    .post(`${LIST_API_BASE_URL}/${id}`, reqBody)
    .then(res => res.data as IListDTO)
    .catch(err => {
      return err;
    });
}

// updateList updates an existing list by making an HTTP PUT request with the List ID and new Items
export function updateList(id: string, items: string[]) {
  const reqBody = { items: items };
  return axios
    .put(`${LIST_API_BASE_URL}/${id}`, reqBody)
    .then(res => res.data as IListDTO)
    .catch(err => {
      return err;
    });
}
