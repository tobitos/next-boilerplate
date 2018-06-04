import React from 'react';
import { bindActionCreators } from 'redux';
import { startClock, addCount, serverRenderClock } from '../store';
import { connect } from 'react-redux';
import ConnectedComp from '../components/ConnectedComp';
import pageWithIntl from '../components/PageWithIntl';

class OtherPage extends React.Component {
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
        linkTo="/"
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default pageWithIntl(connect(null, mapDispatchToProps)(OtherPage));
