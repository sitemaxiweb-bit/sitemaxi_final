import { useEffect, useState } from 'react';
import { extractHeadings } from '../utils/blogHelpers';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Array<{ level: number; text: string; id: string }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.map(({ level, text, id }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`block text-left text-sm transition-colors ${
              activeId === id
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ paddingLeft: `${(level - 1) * 12}px` }}
          >
            {text}
          </button>
        ))}
      </nav>
    </div>
  );
}