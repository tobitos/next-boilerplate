// @flow strict
import styled from 'styled-components';
import * as React from 'react';

type WrapperProps = {
  light: boolean
};

const Wrapper = styled.div`
  padding: 15px;
  display: inline-block;
  color: #82fa58;
  font: 50px menlo, monaco, monospace;
  background-color: ${(props: WrapperProps) => (props.light ? '#999' : '#000')};
`;

type Props = {
  light: boolean,
  lastUpdate: number
};

export default ({ lastUpdate, light }: Props) => {
  return <Wrapper light={light}>{format(new Date(lastUpdate))}</Wrapper>;
};

const format = t =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;

const pad = n => (n < 10 ? `0${n}` : n);
