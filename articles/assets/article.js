(() => {
  const article = document.querySelector('article');
  if (!article) return;

  // Wrap in page container for stable layout
  if (!document.querySelector('.page')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'page';
    article.parentNode.insertBefore(wrapper, article);
    wrapper.appendChild(article);

    const foot = document.createElement('footer');
    foot.className = 'page-foot';
    foot.textContent = 'Published via GitHub Pages';
    wrapper.appendChild(foot);
  }

  // Turn first standalone strong paragraph into metadata line
  const firstPara = article.querySelector(':scope > p');
  if (firstPara && firstPara.children.length === 1 && firstPara.querySelector('strong')) {
    firstPara.classList.add('meta');
  }

  // Obsidian callout: > [!note] title
  article.querySelectorAll('blockquote').forEach((bq) => {
    const p = bq.querySelector('p');
    if (!p) return;

    const text = (p.textContent || '').trim();
    const m = text.match(/^\[!([a-zA-Z0-9_-]+)\]\s*(.*)$/);
    if (!m) return;

    const type = m[1].toLowerCase();
    const titleText = m[2] || type;

    bq.classList.add('callout', `callout-${type}`);
    p.textContent = '';

    const title = document.createElement('div');
    title.className = 'callout-title';
    title.textContent = titleText;
    p.appendChild(title);
  });
})();
