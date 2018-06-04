// @flow strict
import Link from 'next/link';
import * as React from 'react';
import { connect } from 'react-redux';
import Clock from './Clock';
import AddCount from './AddCount';
import { FormattedMessage } from 'react-intl';
import type { State } from '../store';

type Props = {
  title: string,
  linkTo: string,
  lastUpdate: number,
  light: boolean,
  count: number
};

export default connect((state: State) => state)(
  ({ title, linkTo, lastUpdate, light }: Props) => {
    return (
      <div>
        <h1>{title}</h1>
        <Clock lastUpdate={lastUpdate} light={light} />
        <AddCount />
        <nav>
          <Link href={linkTo}>
            <a>
              <FormattedMessage id="navigate" />
            </a>
          </Link>
        </nav>
      </div>
    );
  }
);
