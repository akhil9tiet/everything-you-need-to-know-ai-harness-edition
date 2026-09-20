const SITE_PAGES = [
  { href: 'index.html', label: 'Market map' },
  { href: 'articles.html', label: 'Articles' }
];

const scriptPath = location.pathname;
const baseDir = scriptPath.slice(0, scriptPath.lastIndexOf('/'));
const linkTo = (href) => (baseDir ? baseDir + '/' + href : href);
const current = (scriptPath.split('/').pop() || 'index.html');

const header = document.createElement('header');
header.className = 'site-nav';
header.innerHTML =
  '<div class="inner">' +
  '<a class="brand" href="' + linkTo('index.html') + '">AI Harness Landscape</a>' +
  '<nav><ul>' +
  SITE_PAGES.map(p =>
    '<li><a href="' + linkTo(p.href) + '"' + (p.href === current ? ' class="current"' : '') + '>' + p.label + '</a></li>'
  ).join('') +
  '</ul></nav></div>';

document.body.prepend(header);