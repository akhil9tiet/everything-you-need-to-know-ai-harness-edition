const SITE_PAGES = [
  { href: 'aiHarness.html', label: 'Market map' },
  { href: 'index.html', label: 'Articles' }
];

const scriptPath = location.pathname;
const pathParts = scriptPath.split('/').filter(Boolean);
if (pathParts.length && !pathParts[pathParts.length - 1].includes('.')) pathParts.pop();
pathParts.pop();
while (pathParts.length && ['templates', 'css', 'js'].includes(pathParts[pathParts.length - 1])) pathParts.pop();
const baseDir = pathParts.join('/');
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