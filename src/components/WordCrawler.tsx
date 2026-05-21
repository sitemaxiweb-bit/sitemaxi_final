import { useState, useEffect } from 'react';

const CRAWL_WORDS = ['Leads', 'Sales'];

export function WordCrawler() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % CRAWL_WORDS.length);
        setAnimating(false);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'middle',
        lineHeight: 'inherit',
        height: '1em',
        position: 'relative',
        top: '-0.12em',
      }}
    >
      <span
        key={index}
        style={{
          display: 'inline-block',
          transform: animating ? 'translateY(-110%)' : 'translateY(0)',
          opacity: animating ? 0 : 1,
          transition: animating
            ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease'
            : 'none',
          lineHeight: 1,
        }}
      >
        {CRAWL_WORDS[index]}
      </span>
    </span>
  );
}
