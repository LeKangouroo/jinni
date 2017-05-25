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
        title: 'Hello World',
        metas: {
          twitter: {
            isEnabled: true
          }
        }
      }
    };
  }
  render()
  {
    return (
      <DefaultLayout env={this.state.env} page={this.state.page}>
        <p>foobarlaand</p>
      </DefaultLayout>
    );
  }
}

export default Page;
