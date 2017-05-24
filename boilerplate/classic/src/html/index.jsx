import DefaultLayout from './_react/layouts/default.jsx';
import React, { Component } from 'react';

class Page extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (
      <DefaultLayout title="Accueil">
        <p>foobarlaand</p>
      </DefaultLayout>
    );
  }
}

export default <Page/>;
