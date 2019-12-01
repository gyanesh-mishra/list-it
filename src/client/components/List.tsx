import { Paper, Grid, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { IListDTO } from '../../shared/typings/IListDTO';
import * as ListAPI from '../api/list';
import { NewListDialog } from './NewListDialog';
import { ListItems } from './ListItems';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface IState {
  list: IListDTO;
  newList: boolean;
  userInput: string;
  isLoading: boolean;
}

export class ListView extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      newList: false,
      userInput: '',
      isLoading: true,
    };
  }

  public componentDidMount = async () => {
    // Grab ListID from the URL
    const listId = this.props.match.params.listId;

    // Fetch the list from the API
    let list = await ListAPI.getListById(listId);
    let newList = this.state.newList;

    // If List doesn't exist on the API, create a new one and show prompt
    if (list === null) {
      newList = true;
      list = await ListAPI.createList(listId, []);
    }

    // Show the list
    this.setState({ list: list, isLoading: false, newList: newList });
  };

  private deleteItemFromList = async event => {
    const indexToDelete = parseInt(event.currentTarget.value);
    const list = this.state.list;
    list.items.splice(indexToDelete, 1);
    ListAPI.updateList(this.state.list.id, list.items);
    this.setState({ list: list });
  };

  private addItemToList = async () => {
    const list = this.state.list;
    list.items.push(this.state.userInput);
    ListAPI.updateList(this.state.list.id, list.items);
    this.setState({ list: list, userInput: '' });
  };

  private updateListItems = async items => {
    const list = this.state.list;
    list.items = items;

    ListAPI.updateList(this.state.list.id, list.items);
    this.setState({ list: list });
  };

  private handleUserInput = async input => {
    this.setState({ userInput: input.target.value });
  };

  private renderListView = () => {
    return (
      <Paper style={{ width: '90%', margin: 16, padding: 16 }}>
        {this.state.newList && <NewListDialog />}
        <Grid container>
          <Grid xs={10} md={11} item>
            <TextField
              onChange={this.handleUserInput}
              value={this.state.userInput}
              placeholder='Add Todo'
              style={{ width: '80%' }}
              fullWidth
            />
          </Grid>
          <Grid xs={2} md={1} item>
            <IconButton onClick={this.addItemToList} type='submit' aria-label='add-circle'>
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
        <ListItems
          list={this.state.list}
          deleteItemFromList={this.deleteItemFromList}
          updateListItems={this.updateListItems}
        />
      </Paper>
    );
  };

  public render = () => {
    // Show loading while the List is being fetched
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    // Render ListView on successful fetch
    if (this.state.list) {
      return this.renderListView();
    }
  };
}
