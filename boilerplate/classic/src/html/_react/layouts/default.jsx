import React, { Component } from 'react';

class DefaultLayout extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      env: 'dev',
      timestamp: Date.now()
    };
  }
  render()
  {
    return (
      <html>
        <head>
          <meta charSet="UTF-8"/>
          <meta name="robots" content="index,follow"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          {this.state.env === 'production' ?
            (
              <title>{this.props.title}</title>
            ) : (
              <title>[{this.state.env}] {this.props.title}</title>
            )
          }
          <title>Foobar</title>
          <link rel="icon" type="image/png" href={`assets/images/metadata/favicon.png?bust=${this.state.timestamp}`}/>
          <link rel="stylesheet" href={`css/main.css?bust=${this.state.timestamp}`}/>
          <script src={`js/common.js?bust=${this.state.timestamp}`}></script>
          <script src={`js/main.js?bust=${this.state.timestamp}`}></script>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}

export default DefaultLayout;
