import Grid from '@material-ui/core/Grid';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import { Home } from './components/home/Home';

export const App = () => (
  <BrowserRouter>
    <Grid container spacing={2}>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Grid>
  </BrowserRouter>
);
