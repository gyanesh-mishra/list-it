import React from 'react';
import { Link } from 'react-router-dom';

/*
NotFound is the 404 page.
*/

export class NotFound extends React.Component<any> {
  public render = () => {
    return (
      <div>
        <p>Seem a little lost there, buddy.</p>
        <Link to='/'>Wanna go home?</Link>
      </div>
    );
  };
}
