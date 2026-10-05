// Preencha os quatro endereços quando as páginas de destino estiverem definidas.
const links = {
  elaboracao: 'https://geodados.mt.gov.br/portal/apps/experiencebuilder/experience/?draft=true&id=e1c86d6bca2d4fd8ab92141e2c3c7e5a&page=Elabora%C3%A7%C3%A3o-do-ZSEE',
  metodologia: 'https://geodados.mt.gov.br/portal/apps/experiencebuilder/experience/?draft=true&id=e1c86d6bca2d4fd8ab92141e2c3c7e5a&page=Metodologia',
  cadernos: 'https://geodados.mt.gov.br/portal/apps/experiencebuilder/experience/?draft=true&id=e1c86d6bca2d4fd8ab92141e2c3c7e5a&page=Cadernos-do-ZSEE',
  mapas: ''
};
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',closeMenu);
const dialog=document.querySelector('#pending-link');
document.querySelectorAll('[data-destination]').forEach(button=>{const address=links[button.dataset.destination];if(address){const anchor=document.createElement('a');anchor.className=button.className;anchor.innerHTML=button.innerHTML;anchor.href=address;anchor.target='_blank';anchor.rel='noopener noreferrer';button.replaceWith(anchor);}else button.addEventListener('click',()=>{document.querySelector('#pending-title').textContent=button.textContent.trim();dialog.showModal();});});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
const timeline=document.querySelector('.timeline');
const events=[...timeline.querySelectorAll('.event')];
const previous=document.querySelector('#previous-year');
const next=document.querySelector('#next-year');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
function step(){return events.length>1?events[1].offsetLeft-events[0].offsetLeft:timeline.clientWidth;}
function updateTimeline(){const end=timeline.scrollWidth-timeline.clientWidth;previous.disabled=timeline.scrollLeft<=2;next.disabled=timeline.scrollLeft>=end-2;const index=Math.min(events.length-1,Math.round(timeline.scrollLeft/step()));document.querySelector('#timeline-status').textContent=`Ano em destaque: ${events[index].querySelector('.year').textContent}. ${index+1} de ${events.length} marcos históricos.`;}
function move(direction){timeline.scrollBy({left:direction*step(),behavior:reduced.matches?'instant':'smooth'});}
previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
timeline.addEventListener('scroll',updateTimeline,{passive:true});new ResizeObserver(updateTimeline).observe(timeline);
timeline.addEventListener('keydown',e=>{if(e.target!==timeline)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}if(e.key==='Home'||e.key==='End'){e.preventDefault();timeline.scrollTo({left:e.key==='Home'?0:timeline.scrollWidth,behavior:reduced.matches?'instant':'smooth'});}});updateTimeline();
const video=document.querySelector('.hero-video');
const hero=document.querySelector('.hero');
const mobileScreen=matchMedia('(max-width:760px)');
const desktopPoster=video.getAttribute('poster');
let activeSource='';
function loadVideo(){
 const mobile=mobileScreen.matches;
 const poster=mobile?video.dataset.mobilePoster:desktopPoster;
 video.poster=poster;
 hero.style.backgroundImage='url("'+poster+'")';
 if(reduced.matches){video.pause();return;}
 const source=mobile?video.dataset.mobileSrc:video.dataset.src;
 if(source!==activeSource){video.pause();video.src=source;activeSource=source;video.load();}
 video.play().catch(()=>{});
}
mobileScreen.addEventListener('change',loadVideo);
reduced.addEventListener('change',loadVideo);
loadVideo();
