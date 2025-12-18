export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractHeadings(html: string): Array<{ level: number; text: string; id: string }> {
  const div = document.createElement('div');
  div.innerHTML = html;

  const headings = Array.from(div.querySelectorAll('h1, h2, h3, h4, h5, h6'));

  return headings.map((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent || '';
    const id = `heading-${index}-${text.toLowerCase().replace(/[^\w]+/g, '-')}`;

    return { level, text, id };
  });
}

export function addHeadingIds(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;

  const headings = div.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((heading, index) => {
    const text = heading.textContent || '';
    const id = `heading-${index}-${text.toLowerCase().replace(/[^\w]+/g, '-')}`;
    heading.setAttribute('id', id);
  });

  return div.innerHTML;
}