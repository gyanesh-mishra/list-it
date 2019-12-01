import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IListDTO } from '../../../shared/typings/IListDTO';

/*
Defines the List database table as a class required by TypeORM.
The class implements the shared List type defined under shared/typing/List.ts
*/

@Entity()
export class List implements IListDTO {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  items: string[];
}
