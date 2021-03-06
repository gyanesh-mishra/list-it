import React from 'react';

/*
Home is the landing page of the site and provides users with some useful information.
*/
export class Home extends React.Component<any> {
  public render = () => {
    return (
      <div>
        <h2>Welcome!</h2>
        <p>
          This is the home of best List makers. <br /> To go to your list, remember the ID and go to your browser and
          type the URL.
          <br /> For e.g. if your ID was 'winston234', the URL would be http://this-site/list/winston234.
          <br /> Yeah we can't afford hosting ¯\_(ツ)_/¯, BUT... only you can access your data!
          <br />
          How cool is that? Definitely a feature.
        </p>
      </div>
    );
  };
}
