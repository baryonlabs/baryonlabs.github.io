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
})();
