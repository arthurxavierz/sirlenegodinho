/* ------------------------------------------------------------------
   Configuracao da campanha - padrao Achilles Media.
   Preencha os campos abaixo. Vazio = o botao mantem o destino atual,
   nada quebra na pagina publicada.
------------------------------------------------------------------ */
const SITE_CONFIG = {
  whatsappGroupUrl: '',  // link chat.whatsapp.com do grupo oficial
  whatsappNumber: ''     // 55 + DDD + numero, so digitos. Ex.: '5534999999999'
};

if (SITE_CONFIG.whatsappGroupUrl) {
  document.querySelectorAll('[data-whatsapp-group]').forEach((element) => {
    element.href = SITE_CONFIG.whatsappGroupUrl;
    element.target = '_blank';
    element.rel = 'noreferrer';
    if (element.dataset.whatsappGroup === 'cta') {
      element.innerHTML = 'Entrar no grupo oficial <span>\u2197</span>';
    }
  });
  document.querySelectorAll('[data-whatsapp-pending]').forEach((element) => element.remove());
}

const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
const currentPage=document.body.dataset.page;

document.querySelectorAll('.main-nav a[data-nav]').forEach(link=>{const active=link.dataset.nav===currentPage;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page')});
function closeMenu(){menuButton.classList.remove('active');menuButton.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open')}
menuButton.addEventListener('click',()=>{const open=!nav.classList.contains('open');menuButton.classList.toggle('active',open);menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>34),{passive:true});
const revealItems=[...document.querySelectorAll('.reveal')];
const reveal=element=>element.classList.add('visible');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -45px'});
  revealItems.forEach((element,index)=>{
    element.style.transitionDelay=`${Math.min(index%4,3)*65}ms`;
    // o que ja nasce na tela aparece na hora: o hero nao espera o observer
    if(element.getBoundingClientRect().top<innerHeight*.92) reveal(element); else observer.observe(element);
  });
  // rede de seguranca: se o observer nao disparar, nada fica invisivel
  setTimeout(()=>revealItems.forEach(reveal),2600);
}else{revealItems.forEach(reveal)}
const copyButton=document.querySelector('[data-copy-link]');
const feedback=document.querySelector('.copy-feedback');
if(copyButton)copyButton.addEventListener('click',async()=>{const url=new URL('./index.html',location.href).href.replace(/index\.html$/,'');try{await navigator.clipboard.writeText(url)}catch{const helper=document.createElement('textarea');helper.value=url;helper.style.position='fixed';helper.style.opacity='0';document.body.appendChild(helper);helper.select();document.execCommand('copy');helper.remove()}feedback.textContent='Endereço copiado. Agora é só compartilhar.'});
