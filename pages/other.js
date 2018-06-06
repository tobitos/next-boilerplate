// @flow strict
import * as React from 'react';
import { bindActionCreators } from 'redux';
import type { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Other from '../containers/Other';

import { addCount, serverRenderClock } from '../store';
import type { Action } from '../store';

class OtherPage extends React.Component<{ isServer: boolean }> {
  timer: IntervalID;

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
    return <Other />;
  }
}

export default OtherPage;
