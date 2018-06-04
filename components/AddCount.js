// @flow strict
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { addCount } from '../store';
import type { Action } from '../store';

type Props = {
  addCount: () => void,
  count: number
};

class AddCount extends React.Component<Props> {
  add = () => {
    this.props.addCount();
  };

  render() {
    const { count } = this.props;
    return (
      <div>
        <h1>
          AddCount: <span>{count}</span>
        </h1>
        <button onClick={this.add}>Add To Count</button>
      </div>
    );
  }
}

const mapStateToProps = ({ count }) => ({ count });

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    addCount: bindActionCreators(addCount, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCount);
