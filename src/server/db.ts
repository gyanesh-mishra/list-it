import { IListDTO } from '../shared/typings/IListDTO';

export const list: IListDTO = {
  items : [
    {content : "Best 1st List in API"},
    {content : "Best second List in API"},
    {content : "Best thIRd List in API"}
  ]
};

export function getListById(id : string): IListDTO {
  return list
}
