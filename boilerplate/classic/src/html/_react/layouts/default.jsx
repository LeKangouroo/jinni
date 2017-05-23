import React, { Component } from 'react';

class DefaultLayout extends Component
{
  render()
  {
    return (
      <html>
        <head>
          <meta charSet="UTF-8"/>
          <meta name="robots" content="index,follow"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <title>Foobar</title>
          <link rel="icon" type="image/png" href="assets/images/metadata/favicon.png?bust=@@CACHE_BUST"/>
          <link rel="stylesheet" href="css/main.css?bust=@@CACHE_BUST"/>
          <script src="js/common.js?bust=@@CACHE_BUST"></script>
          <script src="js/main.js?bust=@@CACHE_BUST"></script>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}

export default DefaultLayout;
