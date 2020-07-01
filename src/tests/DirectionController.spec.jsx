import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup } from '@testing-library/react';

import { sphericalState } from '@/reducers/sphericalReducer';
import * as actions from '@/actions/sphericalActions';
import DirectionController from '@/components/DirectionController/DirectionController';

const mockStore = configureStore([]);
const basicStore = mockStore({ sphericalReducer: sphericalState });

describe('<DirectionController /> ', () => {
  beforeEach(() => {
    jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
    basicStore.dispatch = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should get value from coordinates on isDetecting true', () => {
    const coordinates = { percent: { x: 20, y: 20 } };
    const { container } = render(
      <Provider store={basicStore}>
        <DirectionController isDetecting coordinates={coordinates} />
      </Provider>,
    );
    const inner = container.querySelector('.direction_controller__inner');
    expect(inner.style.left).toEqual('-30%');
  });

  test('should dispatch correct positive booleans from coordinates if isDetecting', () => {
    const coordinates = { percent: { x: -100, y: -100 } };
    render(
      <Provider store={basicStore}>
        <DirectionController isDetecting coordinates={coordinates} />
      </Provider>,
    );
    expect(basicStore.dispatch).toHaveBeenCalledWith(actions.setLeft(true));
  });

  test('should dispatch correct positive booleans from coordinates if isDetecting', () => {
    const coordinates = { percent: { x: 100, y: 100 } };
    render(
      <Provider store={basicStore}>
        <DirectionController isDetecting coordinates={coordinates} />
      </Provider>,
    );
    expect(basicStore.dispatch).toHaveBeenCalledWith(actions.setLeft(false));
  });

  test('should dispatch correct booleans from coordinates if isDetecting false', () => {
    const coordinates = { percent: { x: -100, y: -100 } };
    render(
      <Provider store={basicStore}>
        <DirectionController coordinates={coordinates} />
      </Provider>,
    );
    expect(basicStore.dispatch).toHaveBeenCalledWith(actions.setLeft(false));
  });
});
