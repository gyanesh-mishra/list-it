import { Paper, CircularProgress, Button } from '@material-ui/core';
import { Backup, Delete, Event } from '@material-ui/icons';
import React from 'react';
import { IListDTO } from '../../shared/typings/IListDTO';
import * as ListAPI from '../api/list';
import { NewListDialog } from './NewListDialog';
import { ListItems } from './ListItems';
import { AddListItem } from './AddListItem';

/*
List component is the main parent component of the of the application to handle all operations
related to CRUD-ing a list.
*/

interface IState {
  list: IListDTO;
  newList: boolean;
  updating: boolean;
  userInput: string;
  isLoading: boolean;
}

export class ListView extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      newList: false,
      updating: false,
      userInput: '',
      isLoading: true,
    };
  }

  public componentDidMount = async () => {
    // Grab ListID from the URL
    const listId = this.props.match.params.listId;

    // Fetch the list from the API
    let response = await ListAPI.getList(listId);
    let newList = false;

    // If List doesn't exist on the API, create a new one and show prompt
    if (response === null) {
      newList = true;
      response = await ListAPI.createList(listId, []);
    }

    // If there are no items, uncaught error etc. Don't do anything
    if (response.items === undefined) {
      return;
    }

    // Show the result
    this.setState({ list: response, isLoading: false, newList: newList });
  };

  // deleteItemFromList deletes an item from the list when the button is clicked.
  private deleteItemFromList = async event => {
    // Fetch index of the element on the list
    const indexToDelete = parseInt(event.currentTarget.value);

    // Delete from the list and issue update on the API and state
    const list = this.state.list;
    list.items.splice(indexToDelete, 1);
    this.updateListItems(list.items);
  };

  // addItemToList adds an item to the bottom of the list when the Add button is clicked.
  private addItemToList = async () => {
    // Add the item from the input and update the API and state
    if (this.state.userInput.trim().length === 0) {
      return;
    }
    const list = this.state.list;
    list.items.push(this.state.userInput);
    this.updateListItems(list.items);

    // Reset the input box to be an empty string
    this.setState({ userInput: '' });
  };

  // resetList removes all items from the list when the reset button is clicked.
  private resetList = async () => {
    // Add the item from the input and update the API and state
    const list = this.state.list;
    list.items = [];
    this.updateListItems(list.items);
  };

  // updateListItems updates the state and API and displays a loading icon on top right of screen.
  private updateListItems = async items => {
    this.setState({ updating: true });
    const list = this.state.list;
    list.items = items;

    const response = await ListAPI.updateList(this.state.list.id, list.items);

    // If there are no items, uncaught error etc. Don't do anything
    if (response.items === undefined) {
      return;
    }
    this.setState({ list: list, updating: false });
  };

  // handleInputChange takes the current Input box input and stores it in the state for future use.
  private handleInputChange = async event => {
    this.setState({ userInput: event.target.value });
  };

  private renderListView = () => {
    return (
      <Paper style={{ width: '90%', margin: 16, padding: 16 }}>
        {this.state.newList && <NewListDialog />}
        <AddListItem
          value={this.state.userInput}
          handleAddListItem={this.addItemToList}
          handleInputChange={this.handleInputChange}
        />
        {this.state.updating && <Backup style={{ position: 'absolute', top: 10, right: 10 }} />}
        <ListItems
          list={this.state.list}
          deleteItemFromList={this.deleteItemFromList}
          updateListItems={this.updateListItems}
        />
        <Button onClick={this.resetList} variant='contained' color='secondary' startIcon={<Delete />}>
          Reset
        </Button>
      </Paper>
    );
  };

  public render = () => {
    // Show loading while the List is being fetched
    if (this.state.isLoading) {
      return <CircularProgress />;
    }

    // Render ListView on successful fetch
    if (this.state.list) {
      return this.renderListView();
    }
  };
}
