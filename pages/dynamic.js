// @flow strict
import * as React from 'react';

import Dynamic from '../containers/Dynamic';

const articles = [
  { id: 'hello-world', title: 'Hello world' },
  { id: 'blubbi', title: 'Something else' }
];

type Props = {
  article: ?{ id: string, title: string }
};

class DynamicPage extends React.Component<Props> {
  static getInitialProps({
    query,
    res
  }: {
    query: { id?: string },
    res: { statusCode: number }
  }) {
    const article = articles.find(article => article.id === query.id);

    if (!article && res) {
      res.statusCode = 404;
    }

    return { article };
  }

  render() {
    return <Dynamic article={this.props.article} />;
  }
}

export default DynamicPage;
