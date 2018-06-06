// @flow strict
import * as React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { initStore } from '../store';
import type { Store } from 'redux';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

injectGlobal`
  body {
    background-color: #fffeef;
  }
`;

const theme = {
  specialFont: '#03536d'
};

type NextCtx = {
  res: {},
  req: {
    locale: string,
    messages: { [string]: string }
  },
  pathname: string, // e.g. /article
  query: { id?: string },
  asPath: string, // e.g. /article/5acc8ad21e00a17926c0b85e
  store: Store
};

type PageProps = {
  id?: string,
  locale: string,
  messages: { [string]: string },
  now: number
};

type Props = {
  Component: React.Element,
  pageProps: PageProps,
  pathname: string,
  store: Store,
  locale: string,
  messages: { [string]: string },
  now: number
};

class MyApp extends App {
  props: Props;

  static async getInitialProps({
    Component,
    ctx
  }: {
    Component: React.Element,
    ctx: NextCtx
  }) {
    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props.initialProps;

    // Always update the current time on page load/transition because the
    // <IntlProvider> will be a new instance even with pushState routing.
    const now = Date.now();

    const WrappedComponent = Component.getWrappedInstance
      ? Component.getWrappedInstance()
      : Component;

    return {
      locale,
      messages,
      now,
      pageProps: WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store, locale, messages, now } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <IntlProvider
              locale={locale}
              messages={messages}
              initialNow={now}
              textComponent={React.Fragment}
            >
              <Component {...pageProps} />
            </IntlProvider>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
