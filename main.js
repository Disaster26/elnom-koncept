(function(){
  var top=document.getElementById('top');
  var burger=top.querySelector('.burger');
  var solidAlways=document.body.hasAttribute('data-solid');
  function onScroll(){ if(solidAlways||window.scrollY>40){top.classList.add('solid')}else{top.classList.remove('solid')} }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  burger.addEventListener('click',function(){
    var o=top.classList.toggle('open'); burger.setAttribute('aria-expanded',o?'true':'false');
    document.body.style.overflow=o?'hidden':'';
  });
  top.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){
    top.classList.remove('open'); burger.setAttribute('aria-expanded','false'); document.body.style.overflow='';
  })});

  // karty przesuwane palcem, mysza i strzalkami
  document.querySelectorAll('[data-rail]').forEach(function(r){
    var down=false,sx=0,sl=0,moved=false;
    r.addEventListener('pointerdown',function(e){ if(e.pointerType!=='mouse')return; down=true;moved=false;sx=e.clientX;sl=r.scrollLeft; });
    window.addEventListener('pointermove',function(e){ if(!down)return; var dx=e.clientX-sx; if(Math.abs(dx)>4){moved=true;r.classList.add('drag')} r.scrollLeft=sl-dx; });
    window.addEventListener('pointerup',function(){ if(!down)return; down=false; r.classList.remove('drag'); });
    r.addEventListener('click',function(e){ if(moved){e.preventDefault();e.stopPropagation();moved=false} },true);
    var nav=r.nextElementSibling;
    if(nav&&nav.classList.contains('railnav')){
      var step=function(){var c=r.firstElementChild;return c?c.getBoundingClientRect().width+20:300};
      nav.querySelector('[data-prev]').addEventListener('click',function(){r.scrollBy({left:-step(),behavior:'smooth'})});
      nav.querySelector('[data-next]').addEventListener('click',function(){r.scrollBy({left:step(),behavior:'smooth'})});
    }
  });

  // formularz pokazowy
  var f=document.getElementById('form');
  if(f){ f.addEventListener('submit',function(e){ e.preventDefault();
    document.getElementById('formmsg').textContent='To podgląd strony: formularz zacznie wysyłać zapytania na biuro@elnom.pl w gotowej wersji.'; }); }

  document.querySelectorAll('[data-year]').forEach(function(s){s.textContent=new Date().getFullYear()});

  // baner cookies (mapa Google)
  var ck=document.getElementById('cookie');
  if(ck){
    var seen=null; try{seen=localStorage.getItem('elnom-ck')}catch(e){}
    if(!seen){ var sh=function(){ if(window.scrollY>window.innerHeight*0.6){ck.classList.add('show');window.removeEventListener('scroll',sh)} }; window.addEventListener('scroll',sh,{passive:true}); }
    ck.querySelectorAll('[data-ck]').forEach(function(b){b.addEventListener('click',function(){
      ck.classList.remove('show'); try{localStorage.setItem('elnom-ck','1')}catch(e){}
    })});
  }
})();
