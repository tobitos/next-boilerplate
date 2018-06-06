// @flow strict
import * as React from 'react';
import type { Store } from 'redux';

import { startClock, addCount, serverRenderClock } from '../store';

import Home from '../containers/Home';

class HomePage extends React.Component<{}> {
  static getInitialProps({
    store,
    isServer
  }: {
    store: Store,
    isServer: boolean
  }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());
    return { isServer };
  }

  render() {
    return <Home />;
  }
}

export default HomePage;
