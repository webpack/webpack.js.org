import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import SmallIcon from "../../assets/icon-square-small-slack.png";
import { contributorsNotFound } from "./404.js";

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

Contributor.propTypes = {
  contributor: PropTypes.string.isRequired,
  inView: PropTypes.bool.isRequired,
};

export default function Contributors({ contributors }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!contributors.length) {
    return <noscript />;
  }

  return (
    <div ref={ref}>
      <div className="grid gap-[10px] lg:gap-[15px] grid-cols-contributors">
        {contributors
          .filter(
            (contributor) =>
              contributorsNotFound.includes(contributor) === false,
          )
          .map((contributor) => (
            <Contributor
              key={contributor}
              contributor={contributor}
              inView={inView}
            />
          ))}
      </div>
    </div>
  );
}

Contributors.propTypes = {
  contributors: PropTypes.array.isRequired,
};
