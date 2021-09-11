import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import SmallIcon from '../../assets/icon-square-small-slack.png';
import PropTypes from 'prop-types';
import { contributorsNotFound } from './404.js';

Contributors.propTypes = {
  contributors: PropTypes.array.isRequired,
};

Contributor.propTypes = {
  contributor: PropTypes.string.isRequired,
  inView: PropTypes.bool.isRequired,
};
function Contributor({ contributor, inView }) {
  return (
    <a key={contributor} href={`https://github.com/${contributor}`}>
      <img
        width={45}
        height={45}
        alt={contributor}
        title={contributor}
        className="w-full rounded-full shadow"
        src={
          inView ? `https://github.com/${contributor}.png?size=90` : SmallIcon
        }
      />
    </a>
  );
}

export default function Contributors({ contributors }) {
  const [inView, setInView] = useState(false);
  const handleInView = (inView) => {
    if (!inView) {
      return;
    }
    setInView(inView);
  };
  if (!contributors.length) {
    return <noscript />;
  }

  return (
    <VisibilitySensor
      delayedCall
      partialVisibility
      intervalDelay={300}
      onChange={handleInView}
    >
      <div>
        <div className="grid gap-[10px] lg:gap-[15px] grid-cols-contributors">
          {contributors
            .filter((c) => contributorsNotFound.includes(c) === false)
            .map((contributor) => (
              <Contributor
                key={contributor}
                contributor={contributor}
                inView={inView}
              />
            ))}
        </div>
      </div>
    </VisibilitySensor>
  );
}
