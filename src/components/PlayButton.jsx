import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { switchIsPlayed } from '@/actions/videoActions';

import '@/style/PlayButton.scss';

const PlayButton = memo(() => {
  const [classValue, setClassValue] = useState('play_button');

  const { isPlayed } = useSelector(({ videoReducer }) => videoReducer);

  const dispatch = useDispatch();
  const dispatchPlayed = () => dispatch(switchIsPlayed());

  useEffect(() => {
    const playedClass = isPlayed ? 'play_button--pause' : 'play_button--play';
    const classes = classNames('play_button', playedClass);
    setClassValue(classes);
  }, [isPlayed]);

  return (
    <button
      onClick={dispatchPlayed}
      className={classValue}
      type="button"
    >
      <span className="play_button__inner" />
    </button>
  );
});

export default PlayButton;
