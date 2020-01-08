import App from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import React from 'react';

import {GlobalStyle} from '../components/utils';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

class CustomApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        const description = 'The best tech companies and startups in the Greater Des Moines area.';

        return (
            <>
                <Head>
                    <title>{`dsmtech - ${description}`}</title>
                    <meta charSet="utf-8" />
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link href="/logo.ico" rel="shortcut icon" />
                    <meta content={description} name="description" />
                    <meta content="follow, index" name="robots" />
                    <meta property="og:title" content={`DSM Tech - ${description}`} />
                    <meta property="og:image" content="/imgs/banner.jpg" />
                    <meta content="en_US" property="og:locale" />
                    <meta content={`dsmtech - ${description}`} property="og:title" />
                    <meta content={description} property="og:description" />
                    <meta content="https://dsmtech.io" property="og:url" />
                </Head>
                <GlobalStyle />
                <Component {...pageProps} />
            </>
        );
    }
}

export default CustomApp;
