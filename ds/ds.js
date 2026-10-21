/* 바리온 디자인 시스템 v1 — 공용 동작: reveal · scrollspy · 모바일 고정 CTA */
(function(){
  var d=document,root=d.documentElement;
  root.classList.remove('no-js');
  var hasIO='IntersectionObserver' in window;

  // 1) reveal — 화면에 들어오면 한 번만 표시
  var rv=d.querySelectorAll('.reveal:not(.on)');
  if(!hasIO){rv.forEach(function(e){e.classList.add('on')});}
  else{
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target)}})},{threshold:.1});
    rv.forEach(function(e){ro.observe(e)});
  }

  // 2) scrollspy — .subnav a[href^="#"]의 대상 섹션 중 화면 위쪽 기준선을 지난 마지막 것
  var links=[].slice.call(d.querySelectorAll('.subnav a[href^="#"]'));
  if(links.length){
    var targets=links.map(function(a){return d.getElementById(a.getAttribute('href').slice(1))});
    var cur=null;
    var spy=function(){
      var css=getComputedStyle(root);
      var off=(parseFloat(css.getPropertyValue('--nav-h'))||64)+(parseFloat(css.getPropertyValue('--subnav-h'))||44)+24;
      var idx=-1;
      targets.forEach(function(t,i){if(t&&t.getBoundingClientRect().top-off<=0)idx=i});
      if(idx!==cur){
        cur=idx;
        links.forEach(function(a,i){if(i===idx)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
        if(idx>=0){var a=links[idx],ol=a.parentNode.parentNode;var l=a.offsetLeft-ol.clientWidth/2+a.offsetWidth/2;ol.scrollTo({left:l,behavior:'smooth'})}
      }
    };
    var tick=false;
    window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;spy()})}},{passive:true});
    window.addEventListener('resize',spy);spy();
  }

  // 3) 모바일 고정 CTA — data-hide-when="선택자,선택자"가 보이는 동안 숨김
  var sc=d.querySelector('.sticky-cta[data-hide-when]');
  if(sc&&hasIO){
    var vis=new Set();
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)vis.add(e.target);else vis.delete(e.target)});sc.classList.toggle('is-hidden',vis.size>0)},{threshold:0});
    d.querySelectorAll(sc.getAttribute('data-hide-when')).forEach(function(e){so.observe(e)});
  }

  // 6) 기간 한정 항목 — data-until(ISO) 지나면 숨김
  d.querySelectorAll('[data-until]').forEach(function(el){var t=Date.parse(el.getAttribute('data-until'));if(t&&Date.now()>=t)el.remove()});

  // 7) 모바일 메뉴 ☰ — 패널 열기/닫기, Esc·링크 클릭 시 닫힘
  var nav=d.querySelector('.nav'),tg=nav&&nav.querySelector('.nav-toggle'),panel=nav&&nav.querySelector('.nav-panel');
  if(tg&&panel){
    var setOpen=function(o){if(o)panel.style.setProperty('--panel-top',Math.round(nav.getBoundingClientRect().bottom)+'px');nav.classList.toggle('is-open',o);tg.setAttribute('aria-expanded',o?'true':'false');tg.setAttribute('aria-label',o?'메뉴 닫기':'메뉴 열기');root.classList.toggle('nav-lock',o)};
    tg.addEventListener('click',function(){setOpen(!nav.classList.contains('is-open'))});
    panel.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false)});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('is-open')){setOpen(false);tg.focus()}});
    window.addEventListener('resize',function(){if(innerWidth>980)setOpen(false)});
  }

  // 4) 자동 시연 데모 — 화면에 보일 때만 재생, 멈춤/재생 버튼, 단계 클릭, 줄인 모션이면 자동 재생 안 함
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.querySelectorAll('[data-demo]').forEach(function(root){
    var steps=[].slice.call(root.querySelectorAll('[data-demo-step]'));
    var rail=[].slice.call(root.querySelectorAll('.demo-rail button'));
    var btn=root.querySelector('.demo-pause'),cap=root.querySelector('.demo-cap'),bar=root.querySelector('.demo-prog i');
    if(!steps.length)return;
    var i=0,timer=null,paused=reduce,visible=false;
    function show(n){
      i=(n+steps.length)%steps.length;
      steps.forEach(function(s,k){s.classList.toggle('is-on',k===i)});
      rail.forEach(function(b,k){b.classList.toggle('is-on',k===i);b.classList.toggle('is-done',k<i);if(k===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
      if(cap)cap.textContent=steps[i].getAttribute('data-cap')||'';
    }
    function ms(){return parseInt(steps[i].getAttribute('data-ms'),10)||3200}
    function stop(){clearTimeout(timer);timer=null;root.classList.remove('is-playing');if(bar){bar.style.transition='none';bar.style.width='0'}}
    function run(){
      stop();if(paused||!visible)return;
      var t=ms();root.style.setProperty('--step-ms',t+'ms');
      if(bar){bar.style.transition='none';bar.style.width='0';void bar.offsetWidth;bar.style.transition='';bar.style.width=''}
      requestAnimationFrame(function(){root.classList.add('is-playing')});
      timer=setTimeout(function(){show(i+1);run()},t+(i===steps.length-1?1200:0));
    }
    function label(){if(btn){btn.textContent=paused?'▶ 재생':'❚❚ 멈춤';btn.setAttribute('aria-pressed',paused?'true':'false')}}
    if(btn)btn.addEventListener('click',function(){paused=!paused;label();run()});
    rail.forEach(function(b,k){b.addEventListener('click',function(){show(k);run()})});
    if(hasIO)new IntersectionObserver(function(es){visible=es[0].isIntersecting;run()},{threshold:.35}).observe(root);
    else visible=true;
    show(0);label();run();
  });

  // 5) 스크롤 이펙트 — 이미지 열림·패럴랙스(±8px)·카드 차례 등장·배경 일러스트·커튼 진행·읽은 위치
  if(!reduce&&hasIO){
    var IMG='.visual,.whyus-visual,.hero-img,.edu-art,.dcard-img,.ldr-mono,[data-fx-img]';
    var GRID='.cards,.dpanel,.grid2,.grid3,.steps,.steps3,.who,.toc-list,.ldr-list,[data-fx-stagger]';
    var fxo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');fxo.unobserve(t);setTimeout(function(){t.classList.add('fx-settled')},1500)}})},{threshold:.15,rootMargin:'0px 0px -8% 0px'});
    d.querySelectorAll(IMG).forEach(function(el){if(el.querySelector('img,svg')&&el.getBoundingClientRect().top>innerHeight*.9){el.classList.add('fx-img');fxo.observe(el)}});
    d.querySelectorAll(GRID).forEach(function(el){if(el.children.length>1&&el.getBoundingClientRect().top>innerHeight*.9&&!el.closest('.reveal')){el.classList.add('fx-stagger');fxo.observe(el)}});
    d.querySelectorAll('main section>.wrap').forEach(function(w){
      if(w.closest('.curtain-hero'))return;
      var k=0;
      [].slice.call(w.children).forEach(function(c){
        if(c.matches('.reveal,.fx-stagger,.fx-img,script,style')||c.querySelector('.reveal')||c.getBoundingClientRect().top<innerHeight*.9)return;
        c.classList.add('fx-up');c.style.setProperty('--fx-d',Math.min(k++,4)*.08+'s');fxo.observe(c);
      });
    });
    d.querySelectorAll('.has-bg').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight*.6){el.classList.add('fx-bg');fxo.observe(el)}});
    var par=[].slice.call(d.querySelectorAll('.fx-img'));
    var hero=d.querySelector('.curtain>.curtain-hero'),card=hero&&hero.parentNode.querySelector('.curtain-card'),sub=d.querySelector('.subnav');
    var fxTick=false;
    var fx=function(){
      fxTick=false;var vh=innerHeight;
      par.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var c=(r.top+r.height/2-vh/2)/vh;el.style.setProperty('--px',Math.max(-20,Math.min(20,-c*36)).toFixed(1)+'px')});
      if(card&&getComputedStyle(hero).position==='sticky'){var ct=card.getBoundingClientRect().top,h=hero.offsetHeight;hero.style.setProperty('--cover',Math.max(0,Math.min(1,1-(ct-hero.getBoundingClientRect().top)/h)).toFixed(3))}
      if(sub){var max=root.scrollHeight-vh;sub.style.setProperty('--read',max>0?(scrollY/max).toFixed(4):0)}
    };
    window.addEventListener('scroll',function(){if(!fxTick){fxTick=true;requestAnimationFrame(fx)}},{passive:true});
    window.addEventListener('resize',fx);fx();
  }
})();
