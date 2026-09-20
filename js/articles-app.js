const articleRoot = typeof document !== 'undefined' && document.getElementById('articles');
if (articleRoot) {
  const sort = document.querySelector('#articleSort');
  const count = document.querySelector('#articleCount');
  const empty = document.querySelector('#articlesEmpty');
  const toggleBtns = Array.from(document.querySelectorAll('.view-toggle button'));
  let view = 'tiles';

  const h = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  const ordered = () => {
    const arr = [...ARTICLES];
    if (sort.value === 'updated') arr.sort((a, b) => b.dateUpdated.localeCompare(a.dateUpdated));
    else if (sort.value === 'popular') arr.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    else arr.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
    return arr;
  };

  const meta = a =>
    'Added <time datetime="' + h(a.dateAdded) + '">' + h(a.dateAdded) + '</time>' +
    ' · Updated <time datetime="' + h(a.dateUpdated) + '">' + h(a.dateUpdated) + '</time>' +
    (a.popularity ? ' · ' + a.popularity + ' views' : '');

  const tags = a => (a.tags || []).map(t => '<span class="tag">' + h(t) + '</span>').join('');

  const tile = a =>
    '<article class="a-card">' +
    '<div class="a-meta">' + meta(a) + '</div>' +
    '<h3><a href="' + h(a.href) + '">' + h(a.title) + '</a></h3>' +
    '<p>' + h(a.excerpt) + '</p>' +
    '<div class="a-tags">' + tags(a) + '</div>' +
    '</article>';

  const row = a =>
    '<article class="a-card row">' +
    '<div class="a-meta">' + meta(a) + '</div>' +
    '<h3><a href="' + h(a.href) + '">' + h(a.title) + '</a></h3>' +
    '<div class="a-tags">' + tags(a) + '</div>' +
    '</article>';

  function render() {
    const list = ordered();
    articleRoot.className = 'articles' + (view === 'list' ? ' list' : '');
    articleRoot.innerHTML = list.map(a => (view === 'list' ? row(a) : tile(a))).join('');
    empty.style.display = list.length ? 'none' : 'block';
    count.textContent = list.length === 1 ? '1 article' : list.length + ' articles';
  }

  toggleBtns.forEach(b => b.addEventListener('click', () => {
    view = b.dataset.view;
    toggleBtns.forEach(x => x.classList.toggle('active', x === b));
    render();
  }));
  sort.addEventListener('change', render);
  render();
}