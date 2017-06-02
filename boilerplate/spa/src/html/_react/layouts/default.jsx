import merge from 'lodash/merge';
import React from 'react';

class DefaultLayout extends React.Component
{
  constructor(props)
  {
    super(props);

    const defaultOptions = {
      page: {
        title: '[NO TITLE]'
      }
    };

    this.state = {
      env: props.env,
      page: merge({}, defaultOptions.page, props.page),
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
              <title>{this.state.page.title}</title>
            ) : (
              <title>[@@ENV] {this.state.page.title}</title>
            )
          }
          <link rel="icon" type="image/png" href={`assets/images/metadata/favicon.png?bust=${this.state.timestamp}`}/>
          <link rel="stylesheet" href={`css/main.css?bust=${this.state.timestamp}`}/>
          <script src={`js/common.js?bust=${this.state.timestamp}`}></script>
          <script src={`js/main.js?bust=${this.state.timestamp}`}></script>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    );
  }
}

export default DefaultLayout;
