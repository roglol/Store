import App from 'next/app';
import Head from 'next/head'
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';


class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: {
                ...(Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {})
            }
        };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <>
                    <Head>
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"/>
                    </Head>
                    <Component {...pageProps} />
             </>
        );
    }
}

export default MyApp;