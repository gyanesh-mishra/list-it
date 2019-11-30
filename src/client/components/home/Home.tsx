import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { IListDTO } from '../../../shared/typings/IListDTO';
import { getListById, updateList } from '../../api/list';

import InputBase from '@material-ui/core/InputBase';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface IState {
  list: IListDTO;
  userInput: string;
  isLoading: boolean;
}

export class Home extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      userInput: '',
      isLoading: true,
    };
  }

  public componentDidMount = async () => {
    const listId = this.props.match.params.listId;
    if (listId) {
      const list = await getListById(listId);
      this.setState({ list: list, isLoading: false });
    }
  };

  private deleteItemFromList = async event => {
    const indexToDelete = parseInt(event.currentTarget.value);
    const list = this.state.list;
    list.items.splice(indexToDelete, 1);
    updateList(this.state.list.id, list.items);
    this.setState({ list: list });
  };

  private addItemToList = async () => {
    const list = this.state.list;
    list.items.push(this.state.userInput);
    updateList(this.state.list.id, list.items);
    this.setState({ list: list, userInput: '' });
  };

  private handleUserInput = async input => {
    this.setState({ userInput: input.target.value });
  };

  private renderListView = () => {
    return (
      <Grid justify='center' alignItems='center'>
        <InputBase onChange={this.handleUserInput} value={this.state.userInput} placeholder='Add Todo' />
        <IconButton onClick={this.addItemToList} type='submit' aria-label='add-circle'>
          <AddCircleOutlineIcon />
        </IconButton>
        <Card>
          <CardHeader title='List View' />
          <CardContent>
            <List>
              {this.state.list.items.map((listItem, listItemIndex) => (
                <ListItem key={listItemIndex}>
                  <ListItemText primary={listItem} />
                  <ListItemSecondaryAction>
                    <IconButton value={listItemIndex} onClick={this.deleteItemFromList} edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  public render = () => {
    // If no list id is in the path, tell user to pass one
    if (!this.props.match.params.listId) {
      return <div>Supply list ID please</div>;
    }

    // If a user ID is passed, show loading till the list is being fetched
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    // Show List if found
    if (this.state.list) {
      return this.renderListView();
    }
  };
}
