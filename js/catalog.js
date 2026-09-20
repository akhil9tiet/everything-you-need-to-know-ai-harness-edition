const root = typeof document !== 'undefined' && document.getElementById('catalog');
if (root) {
const category = document.querySelector('#category');
Object.entries(C).forEach(([k,v])=>{const o=document.createElement('option');o.value=k;o.textContent=v.name;category.appendChild(o)});
const search=document.querySelector('#search'), sort=document.querySelector('#sort'), catalog=document.querySelector('#catalog'), empty=document.querySelector('#empty'), resultLine=document.querySelector('#resultLine');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function highlight(text,q){if(!q)return esc(text);const safe=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return esc(text).replace(new RegExp(`(${safe})`,'ig'),'<mark>$1</mark>')}
function tag(p){if(p.status==='open')return '<span class="tag open">Open / BYOK</span>';if(p.status==='experimental')return '<span class="tag experimental">Experimental</span>';if(p.status==='assistive')return '<span class="tag assistive">Human review</span>';if(p.status==='caution')return '<span class="tag caution">Re-check</span>';return '<span class="tag">Managed</span>'}
function render(){
  const q=search.value.trim().toLowerCase();let rows=P.filter(p=>(category.value==='all'||p.cat===category.value)&&(!q||Object.values(p).join(' ').toLowerCase().includes(q)));
  if(sort.value==='price')rows.sort((a,b)=>a.start-b.start||a.name.localeCompare(b.name));
  if(sort.value==='open')rows.sort((a,b)=>(a.status==='open'?0:1)-(b.status==='open'?0:1)||a.name.localeCompare(b.name));
  if(sort.value==='name')rows.sort((a,b)=>a.name.localeCompare(b.name));
  catalog.innerHTML=''; empty.style.display=rows.length?'none':'block';
  Object.entries(C).forEach(([key,meta])=>{
    const group=rows.filter(p=>p.cat===key);if(!group.length)return;
    const sec=document.createElement('section');sec.className='category';sec.id=key;
    sec.innerHTML=`<div class="cat-head"><div class="cat-index">${meta.n}</div><h3>${meta.name}</h3><span>${group.length} products</span></div><table class="matrix"><thead><tr><th>Product</th><th>What it is</th><th>Core strength</th><th>Trade-off</th><th>Starting economics</th><th>Best fit</th></tr></thead><tbody>${group.map(p=>`<tr><td class="product" data-label="Product"><strong>${highlight(p.name,q)}</strong><div class="maker">${esc(p.maker)}</div>${tag(p)}</td><td class="desc" data-label="What it is">${highlight(p.desc,q)}</td><td class="strength" data-label="Core strength">${highlight(p.strength,q)}</td><td class="trade" data-label="Trade-off">${highlight(p.trade,q)}</td><td class="price" data-label="Price"><strong>${highlight(p.price,q)}</strong><div class="source">Source site: ${esc(p.maker)} product / pricing docs</div></td><td class="fit" data-label="Best for">${highlight(p.fit,q)}</td></tr>`).join('')}</tbody></table>`;
    catalog.appendChild(sec);
  });
  resultLine.textContent=`Showing ${rows.length} of ${P.length} products${category.value==='all'?'':` · ${C[category.value].name}`}${q?` · matching “${search.value.trim()}”`:''}`;
}
[search,category,sort].forEach(el=>el.addEventListener(el===search?'input':'change',render));render();
}
