import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import Hotspot from '@/components/Hotspot';
import '@/style/HotspotBar.scss';

const HotspotBar = memo(() => {
  const hotspots = useSelector(({ envReducer }) => envReducer.hotspots);
  const duration = useSelector(({ videoReducer }) => videoReducer.duration);

  return (
    <div className="hotspot_bar">
      { hotspots && hotspots.map((el) => {
        const margin = (el.time / duration) * 100;

        return (
          <div className="hotspot__outer" key={el.time} style={{ left: `${margin}%` }}>
            <Hotspot
              time={el.time}
              title={el.title}
              description={el.description}
              image={el.imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
});

export default HotspotBar;
