import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { IListDTO } from '../../../shared/typings/IListDTO';
import { getListById } from '../../api/list';

interface IState {
  list: IListDTO;
  isLoading: boolean;
}

export class Home extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: {items: []} as IListDTO,
      isLoading: true,
    };
  }

  public render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='List View' />
            <CardContent>
              <List>
                {this.state.list.items.map(listItem => (
                  <ListItem>
                      {listItem.content}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }

  public async componentDidMount() {
    const list = await getListById("1");
    this.setState({ list, isLoading: false });
  }
}
