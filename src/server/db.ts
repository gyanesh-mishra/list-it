import { IListDTO } from '../shared/typings/IListDTO';

export const list: IListDTO = {
  id: "0101",
  items : [
  "Best 1st List in API",
  "Best second List in API",
  "Best thIRd List in API"
]
};

export function getListById(id : string): IListDTO {
  return list
}
