import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

class MyApp extends App {
    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;
        const description = 'The best tech companies and startups in the Greater Des Moines area.';

        return (
            <Container>
                <Head>
                    <title>{`dsmtech - ${description}`}</title>
                    <meta charSet="utf-8" />
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link href="/static/logo.ico" rel="shortcut icon" />
                    <meta content={description} name="description" />
                    <meta content="follow, index" name="robots" />
                    <meta property="og:title" content={`DSM Tech - ${description}`} />
                    <meta property="og:image" content="/static/imgs/banner.jpg" />
                    <meta content="en_US" property="og:locale" />
                    <meta content={`dsmtech - ${description}`} property="og:title" />
                    <meta content={description} property="og:description" />
                    <meta content="https://dsmtech.io" property="og:url" />
                </Head>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default withGA('UA-130602814-1', Router)(MyApp);
