// @flow strict
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import type { Dispatch } from 'redux';

export type State = {
  lastUpdate: number,
  light: boolean,
  count: number
};

export type Action =
  | {|
      type: 'TICK',
      ts: number,
      light: boolean
    |}
  | {|
      type: 'ADD'
    |};

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
};

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK'
};

// REDUCERS
export const reducer = (state: State = exampleInitialState, action: Action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      });
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = (isServer: boolean) => (
  dispatch: Dispatch<Action>
) => dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });

export const startClock = () => (dispatch: Dispatch<Action>) =>
  setInterval(
    () => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }),
    1000
  );

export const addCount = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: actionTypes.ADD });

export const initStore = (initialState: State = exampleInitialState) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
