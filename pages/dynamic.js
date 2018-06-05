// @flow strict
import * as React from 'react';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { startClock, addCount, serverRenderClock } from '../store';
import { connect } from 'react-redux';
import ConnectedComp from '../components/ConnectedComp';
import pageWithIntl from '../components/PageWithIntl';
import type { IntlShape } from 'react-intl';
import type { Action } from '../store';

const articles = [
  { id: 'hello-world', title: 'Hello world' },
  { id: 'blubbi', title: 'Something else' }
];

type Props = {
  intl: IntlShape,
  article: ?{ id: string, title: string }
};

class DynamicPage extends React.Component<Props> {
  timer: IntervalID;

  static getInitialProps({ query, res }) {
    const article = articles.find(article => article.id === query.id);

    if (!article && res) {
      res.statusCode = 404;
    }

    return { article };
  }

  render() {
    return (
      <ConnectedComp
        title={`Dynamic: ${(this.props.article && this.props.article.title) ||
          this.props.intl.formatMessage({ id: 'articleNotFound' })}`}
        linkTo="/"
      />
    );
  }
}

export default pageWithIntl(DynamicPage);
