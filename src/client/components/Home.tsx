import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<any> {
  public render = () => {
    return (
      <div>
        <h2>Welcome!</h2>
        <p>
          This is the home of best List makers. <br /> To go to your list, remember the ID and go to your browser and
          type the URL.
          <br /> For e.g. if your ID was 'winston234', the URL would be http://localhost:3000/list/winston234.
          <br /> Yeah we can't afford hosting ¯\_(ツ)_/¯, BUT... only you can access your data!
          <br />
          How cool is that? Definitely a feature.
        </p>
      </div>
    );
  };
}
