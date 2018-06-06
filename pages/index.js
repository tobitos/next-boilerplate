// @flow strict
import * as React from 'react';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { startClock, addCount, serverRenderClock } from '../store';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import Head from 'next/head';
import styled from 'styled-components';

import type { Action } from '../store';

import ConnectedComp from '../components/ConnectedComp';

const Number = styled.h1`
  color: ${props => props.theme.specialFont};
  font-size: 4rem;
`;

type Props = {
  startClock: () => IntervalID,
  intl: IntlShape
};

class Home extends React.Component<Props> {
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
      <div>
        <Head>
          <meta
            name="description"
            content={this.props.intl.formatMessage({
              id: 'description'
            })}
          />
          <title>
            {this.props.intl.formatMessage({
              id: 'title'
            })}
          </title>
        </Head>
        <FormattedMessage id="title" />{' '}
        <Number>
          <FormattedNumber value={2000} />
        </Number>
        <ConnectedComp
          title={this.props.intl.formatMessage({ id: 'greeting' })}
          linkTo="/other"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default injectIntl(connect(null, mapDispatchToProps)(Home));
