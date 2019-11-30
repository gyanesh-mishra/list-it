import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ListItem } from '../listItem/ListItem'
import React from 'react';
import { IListDTO } from '../../../shared/typings/IListDTO';

interface IProps {
  list: IListDTO;
}

export const List: React.FunctionComponent<IProps> = ({ list }) => (
  <Card>
    <CardContent>
    {list.items.map(listItem => (
        <ListItem listItem={listItem} />
    ))}
    </CardContent>
  </Card>
);
