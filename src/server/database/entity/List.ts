import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IListDTO } from '../../../shared/typings/IListDTO';

@Entity()
export class List implements IListDTO {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text', array: true, nullable: true })
  items: string[];
}
