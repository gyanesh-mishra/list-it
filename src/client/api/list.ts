import axios from 'axios';
import { IListDTO } from '../../shared/typings/IListDTO';

export function getListById(id: string) {

  return axios.get(`/api/list/${id}`).then(res => res.data as IListDTO);
}
