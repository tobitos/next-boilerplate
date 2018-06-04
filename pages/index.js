import * as React from 'react';
import { bindActionCreators } from 'redux';
import { startClock, addCount, serverRenderClock } from '../store';
import { connect } from 'react-redux';
import ConnectedComp from '../components/ConnectedComp';
import pageWithIntl from '../components/PageWithIntl';
import { FormattedMessage, FormattedNumber, defineMessages } from 'react-intl';
import Head from 'next/head';

class Home extends React.Component {
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
        <FormattedMessage id="title" /> <FormattedNumber value={2000} />
        <ConnectedComp
          title={this.props.intl.formatMessage({ id: 'greeting' })}
          linkTo="/other"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default pageWithIntl(connect(null, mapDispatchToProps)(Home));