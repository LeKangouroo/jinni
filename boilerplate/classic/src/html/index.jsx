import DefaultLayout from './_react/layouts/default.jsx';
import React, { Component } from 'react';

class Page extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      env: props.env,
      page: {
        title: 'Accueil'
      }
    };
  }
  render()
  {
    return (
      <DefaultLayout env={this.state.env} page={this.state.page}>
        <h1>Page d'accueil</h1>
      </DefaultLayout>
    );
  }
}

export default Page;
