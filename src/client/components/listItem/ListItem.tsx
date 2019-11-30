import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IListItemDTO } from '../../../shared/typings/IListItemDTO';

interface IProps {
  listItem: IListItemDTO;
}

export const ListItem: React.FunctionComponent<IProps> = ({ listItem }) => (
  <Card>
    <CardContent>
      <Typography>{listItem.content}</Typography>
    </CardContent>
  </Card>
);
