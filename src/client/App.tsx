import Grid from '@material-ui/core/Grid';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import { Home } from './components/Home';
import { ListView } from './components/List';
import { NotFound } from './components/NotFound';

export const App = () => (
  <BrowserRouter>
    <Grid container spacing={2}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/list/:listId?' component={ListView} />
        <Route component={NotFound} />
      </Switch>
    </Grid>
  </BrowserRouter>
);
