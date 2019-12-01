import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<any> {
  public render = () => {
    return (
      <div>
        <h2>Welcome!</h2>
        <p>
          This is the home of best List makers. To go to your list, remember the ID and go to your browser and type: For
          e.g. if your ID was 'winston234' http://localhost:3000/list/winston234 Yeah we can't afford hosting
          ¯\_(ツ)_/¯, BUT... only you can access your data! How cool is that? Definitely a feature.
        </p>
      </div>
    );
  };
}
