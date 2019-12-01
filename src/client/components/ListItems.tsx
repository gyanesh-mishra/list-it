import { List, ListItem, ListItemSecondaryAction, ListItemText, RootRef } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// TODO: Add Proptypes validation
export class ListItems extends React.Component<any> {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(this.props.list.items, result.source.index, result.destination.index);
    this.props.updateListItems(reorderedItems);
  }

  public render = () => {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List>
                {this.props.list.items.map((listItem, listItemIndex) => (
                  <Draggable
                    key={listItemIndex.toString()}
                    draggableId={listItemIndex.toString()}
                    index={listItemIndex}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ContainerComponent='li'
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        divider
                        key={listItemIndex.toString()}
                      >
                        <ListItemText primary={listItem} />
                        <ListItemSecondaryAction>
                          <IconButton value={listItemIndex} onClick={this.props.deleteItemFromList} aria-label='delete'>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    );
  };
}
