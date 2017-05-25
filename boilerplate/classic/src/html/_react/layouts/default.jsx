import merge from 'lodash/merge';
import React, { Component } from 'react';

class DefaultLayout extends Component
{
  constructor(props)
  {
    super(props);

    const defaultOptions = {
      page: {
        title: '[NO TITLE]',
        metas: {
          organic: {
            description: '',
            keywords: ''
          },
          og: {
            description: '',
            image: '@@HTTP_ROOT_DIR/assets/images/socials/facebook/share.jpg',
            imageType: 'image/jpeg',
            isEnabled: false,
            locale: 'fr_FR',
            siteName: '',
            title: '',
            type: 'website',
            url: '@@HTTP_ROOT_DIR'
          },
          twitter: {
            card: 'summary',
            description: '',
            image: '@@HTTP_ROOT_DIR/assets/images/socials/twitter/share.jpg',
            isEnabled: false,
            title: '',
            url: '@@HTTP_ROOT_DIR'
          }
        }
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
          <meta name="description" content={this.state.page.metas.organic.description}/>
          <meta name="keywords" content={this.state.page.metas.organic.keywords}/>
          {this.state.page.metas.og.isEnabled && (
            [
              <meta key={0} property="og:description" content={this.state.page.metas.og.description}/>,
              <meta key={1} property="og:image:type" content={this.state.page.metas.og.imageType}/>,
              <meta key={2} property="og:image" content={this.state.page.metas.og.image}/>,
              <meta key={3} property="og:locale" content={this.state.page.metas.og.locale}/>,
              <meta key={4} property="og:site_name" content={this.state.page.metas.og.siteName}/>,
              <meta key={5} property="og:title" content={this.state.page.metas.og.title}/>,
              <meta key={6} property="og:type" content={this.state.page.metas.og.type}/>,
              <meta key={7} property="og:url" content={this.state.page.metas.og.url}/>
            ]
          )}
          {this.state.page.metas.twitter.isEnabled && (
            [
              <meta key={0} name="twitter:card" content={this.state.page.metas.twitter.card}/>,
              <meta key={1} name="twitter:description" content={this.state.page.metas.twitter.description}/>,
              <meta key={2} name="twitter:image" content={this.state.page.metas.twitter.image}/>,
              <meta key={3} name="twitter:title" content={this.state.page.metas.twitter.title}/>,
              <meta key={4} name="twitter:url" content={this.state.page.metas.twitter.url}/>
            ]
          )}
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
