import React from 'react';
import { fireEvent, createEvent } from '@testing-library/dom';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { videoState } from '@/reducers/videoReducer';
import { switchIsPlayed } from '@/actions/videoActions';
import PlayButton from './PlayButton';

const mockStore = configureStore([]);
const basicStore = mockStore({ videoReducer: videoState });

describe('<PlayButton />', () => {
  beforeEach(() => {
    basicStore.dispatch = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should dispatch setPlay on click', () => {
    const { container } = render(
      <Provider store={basicStore}>
        <PlayButton />
      </Provider>,
    );
    const button = container.querySelector('button');
    const event = createEvent.click(button, {});
    fireEvent(button, event);
    expect(basicStore.dispatch).toHaveBeenCalledWith(switchIsPlayed());
  });

  test('should contain correct class on store played', () => {
    const state = mockStore({ videoReducer: { ...videoState, isPlayed: true } });
    const { container } = render(
      <Provider store={state}>
        <PlayButton />
      </Provider>,
    );
    const button = container.querySelector('button');
    expect(button.classList).toContain('play_button--pause');
  });

  test('should contain correct class on store paused', () => {
    const state = mockStore({ videoReducer: { ...videoState, isPlayed: false } });
    const { container } = render(
      <Provider store={state}>
        <PlayButton />
      </Provider>,
    );
    const button = container.querySelector('button');
    expect(button.classList).toContain('play_button--play');
  });
});
