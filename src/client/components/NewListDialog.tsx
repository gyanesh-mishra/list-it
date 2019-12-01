import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@material-ui/core';
import React from 'react';

/*
NewListDialog component is an informative dialog to be displayed when a new list is created.
*/

interface IState {
  open: boolean;
}

export class NewListDialog extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  private handleButtonClick = () => {
    this.setState({ open: false });
  };

  public render = () => {
    // TODO : Add copy-url button
    return (
      <Dialog aria-labelledby='customized-dialog-title' open={this.state.open}>
        <DialogTitle id='customized-dialog-title'>New List Created!</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Hi! Thanks for using this List making app! We couldn't find an existing List with the URL ID you entered, so
            we created a new one for you. Come back to this list anytime using the URL you just entered! Happy Listing!
            :)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleButtonClick} autoFocus color='primary'>
            Thanks!
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}
