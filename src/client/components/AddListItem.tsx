import { Grid, TextField, Button } from '@material-ui/core';
import React from 'react';
import { Add } from '@material-ui/icons';

export class AddListItem extends React.Component<any> {
  public render = () => {
    return (
      <Grid container>
        <Grid xs={10} md={11} item>
          <TextField
            onChange={this.props.handleInputChange}
            value={this.props.value}
            placeholder='Add Todo here! For e.g. Pickup your kid from the school. Unlike last time'
            style={{ width: '100%' }}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            onClick={this.props.handleAddListItem}
            type='submit'
            variant='contained'
            color='primary'
            startIcon={<Add />}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  };
}
