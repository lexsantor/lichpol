/* LICHPOL V5: progressive enhancement, no storage/backend/dependencies */
(() => {
  'use strict';
  const $=(selector,context=document)=>context.querySelector(selector);
  const $$=(selector,context=document)=>[...context.querySelectorAll(selector)];
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Mobile navigation. Escape closes and returns focus to its trigger.
  const toggle=$('[data-menu-toggle]');
  const menu=$('#main-menu');
  if(toggle && menu){
    function setMenu(open){menu.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');toggle.textContent=open?'×':'☰';}
    toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
    menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape' && toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus()}});
    document.addEventListener('click',e=>{if(!e.target.closest('.header-inner') && toggle.getAttribute('aria-expanded')==='true')setMenu(false)});
    matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
  }
  // Browsable campaign filters. Never invent availability or alter URL to imply real server state.
  const filterButtons=$$('[data-filter]');
  if(filterButtons.length){
    const cards=$$('[data-campaign-category]');
    const count=$('#filter-count');
    const empty=$('#no-results');
    filterButtons.forEach(b=>b.addEventListener('click',()=>{
      const category=b.dataset.filter;let shown=0;
      filterButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      cards.forEach(card=>{const match=category==='all'||card.dataset.campaignCategory===category;card.hidden=!match;if(match)shown++});
      if(count)count.textContent=`${shown} ${shown===1?'universo visible':'universos visibles'}`;
      if(empty)empty.hidden=shown!==0;
    }));
  }
  // Native dialog handles modal focus, Escape, and background inerting.
  $$('[data-dialog-open]').forEach(b=>b.addEventListener('click',()=>{
    const dialog=document.getElementById(b.dataset.dialogOpen);
    if(dialog && typeof dialog.showModal==='function')dialog.showModal();
  }));
  $$('[data-dialog-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog')?.close()));
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));
  // Tabs with roving focus: Home/End/Arrows, one active tab and its panel.
  const tabs=$$('[role="tab"][data-tab]');
  if(tabs.length){
    function activate(index,focus){
      tabs.forEach((tab,i)=>{
        const selected=i===index;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
        const panel=document.getElementById('panel-'+tab.dataset.tab);if(panel)panel.hidden=!selected;
      });
      if(focus)tabs[index].focus();
    }
    tabs.forEach((tab,i)=>{
      tab.tabIndex=i===0?0:-1;
      tab.addEventListener('click',()=>activate(i,false));
      tab.addEventListener('keydown',e=>{
        let next=null;if(e.key==='ArrowRight')next=(i+1)%tabs.length;
        if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
        if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
        if(next!==null){e.preventDefault();activate(next,true)}
      });
    });
  }
  // System listbox: button trigger, roving option focus, Home/End/Arrows, Escape and click-away.
  $$('[data-select]').forEach(root=>{
    const trigger=$('.arcane-select__trigger',root);
    const list=$('[role="listbox"]',root);
    const options=$$('[role="option"]',list);
    const value=$('[data-select-value]',root);
    const hidden=$('input[type="hidden"]',root);
    if(!trigger||!list||!options.length)return;
    let selected=0;
    const isOpen=()=>trigger.getAttribute('aria-expanded')==='true';
    const close=(returnFocus=false)=>{trigger.setAttribute('aria-expanded','false');list.hidden=true;if(returnFocus)trigger.focus()};
    const open=(index=selected)=>{trigger.setAttribute('aria-expanded','true');list.hidden=false;options[index].focus()};
    const choose=(i)=>{selected=i;options.forEach((opt,j)=>opt.setAttribute('aria-selected',String(i===j)));value.textContent=options[i].textContent;hidden.value=options[i].dataset.value||'';close(true)};
    trigger.addEventListener('click',()=>isOpen()?close():open());
    trigger.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'||e.key==='ArrowUp'||e.key===' '||e.key==='Enter'){
        e.preventDefault();open(e.key==='ArrowUp'?Math.max(0,selected-1):selected)
      }
    });
    options.forEach((opt,i)=>{
      opt.addEventListener('click',()=>choose(i));
      opt.addEventListener('keydown',e=>{
        if(e.key==='Escape'){e.preventDefault();close(true);return}
        if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(i);return}
        const next=e.key==='ArrowDown'?Math.min(i+1,options.length-1):e.key==='ArrowUp'?Math.max(i-1,0):e.key==='Home'?0:e.key==='End'?options.length-1:null;
        if(next!==null){e.preventDefault();options[next].focus()}
        if(e.key==='Tab')close(false);
      });
    });
    document.addEventListener('click',e=>{if(!root.contains(e.target)&&isOpen())close(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen()){e.preventDefault();close(true)}});
  });
  // D20 is an atmospheric demo, never presented as cryptographically meaningful.
  const dieButton=$('#roll-die');
  if(dieButton){dieButton.addEventListener('click',()=>{
    const n=1+Math.floor(Math.random()*20);const die=$('.roll-die');
    if(die){die.classList.remove('is-rolling');void die.offsetWidth;if(!reduceMotion)die.classList.add('is-rolling')}
    const value=$('#die-value');if(value)value.textContent=String(n);
    const result=$('#roll-result');if(result)result.textContent=`Has sacado un ${n}${n===20?' · Crítico':n===1?' · Pifia':''}.`;
  })}
  // Toast has no timer: message remains until next interaction or the user dismisses it.
  const toast=$('#toast');
  $$('[data-toast]').forEach(b=>b.addEventListener('click',()=>{
    if(!toast)return;toast.textContent=b.dataset.toast;toast.hidden=false;
  }));
  if(toast){toast.addEventListener('click',()=>toast.hidden=true);toast.title='Clic para cerrar'}
  // Motion: no abrupt entrance if reduced-motion is requested or IO is unavailable.
  const reveal=$$('[data-reveal]');
  if(reduceMotion || !('IntersectionObserver' in window))reveal.forEach(e=>e.classList.add('is-visible'));
  else {const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 40px 0px'});reveal.forEach(e=>observer.observe(e))}
  // Prevent isolated final words in simple headings, preserving markup and punctuation.
  // Text-wrap:balance remains the primary wrapping rule. This adds non-breaking final pairs.
  $$('h1,h2,h3').forEach(el=>{
    const nodes=[...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE && n.textContent.trim());
    const last=nodes[nodes.length-1];if(!last)return;
    last.textContent=last.textContent.replace(/(\S{2,})\s+(\S{2,}[.!?]?)\s*$/u,(m,a,b)=>a.length+b.length<=24?`${a}\u00a0${b}`:m);
  });
})();
