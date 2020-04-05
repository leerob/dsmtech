import App from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import React from 'react';

import { GlobalStyle } from '../components/utils';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const title =
      'dsmtech - The best tech companies and startups in the Greater Des Moines area.';
    const description =
      'Discover 40+ of the best tech companies and startups in Des Moines with direct links to their careers pages.';

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link href="/logo.ico" rel="shortcut icon" />
          <meta name="description" content={description} />
          <meta name="robots" content="follow, index" />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:image" content="/imgs/banner.jpg" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:url" content="https://dsmtech.io" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}

export default CustomApp;
