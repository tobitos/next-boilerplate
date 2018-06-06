// @flow strict
import * as React from 'react';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';

import ConnectedComp from '../components/ConnectedComp';

import { startClock, addCount, serverRenderClock } from '../store';
import type { Action } from '../store';

type Props = {
  startClock: () => IntervalID,
  intl: IntlShape
};

class OtherPage extends React.Component<Props> {
  timer: IntervalID;

  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());
    return { isServer };
  }

  componentDidMount() {
    this.timer = this.props.startClock();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <ConnectedComp
        title={this.props.intl.formatMessage({ id: 'otherPage' })}
        linkTo="/dynamic/hello-world"
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default injectIntl(connect(null, mapDispatchToProps)(OtherPage));
