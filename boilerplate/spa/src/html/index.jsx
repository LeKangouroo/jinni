import DefaultLayout from './_react/layouts/default.jsx';
import React from 'react';

class Page extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      env: props.env,
      page: {
        title: 'Hello World'
      }
    };
  }
  render()
  {
    return (
      <DefaultLayout env={this.state.env} page={this.state.page}/>
    );
  }
}

export default Page;
