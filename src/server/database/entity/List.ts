import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { IListDTO } from '../../../shared/typings/IListDTO';

@Entity()
export class List implements IListDTO {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'text', array: true, nullable: true })
    items: string[];
}