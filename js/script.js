(function(){
  var toggle=document.querySelector('.nav-toggle'), menu=document.getElementById('menu');
  function close(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');}
  toggle.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();closeLb();}});

  // lightbox
  var lb=document.querySelector('.lightbox'), lbImg=lb.querySelector('img'), lbClose=lb.querySelector('.lb-close'), last=null;
  function closeLb(){if(!lb.hidden){lb.hidden=true;if(last)last.focus();}}
  document.querySelectorAll('.gallery a').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();last=a;var img=a.querySelector('img');
      lbImg.src=a.getAttribute('href');lbImg.alt=img.alt;lb.hidden=false;lbClose.focus();
    });
  });
  lbClose.addEventListener('click',closeLb);
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});

  // quote form via FormSubmit (AJAX, falls back to normal POST)
  var form=document.getElementById('quote');
  if(form&&window.fetch){
    form.addEventListener('submit',function(e){
      if(form.querySelector('.hp').value){e.preventDefault();return;}
      e.preventDefault();
      var status=form.querySelector('.form-status'), btn=form.querySelector('button');
      btn.disabled=true;status.textContent='Sending...';
      var url=form.action.replace('formsubmit.co/','formsubmit.co/ajax/');
      fetch(url,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d&&String(d.success)==='true'){form.reset();status.textContent='Thanks! Your request was sent. We\u2019ll be in touch soon.';}
          else{throw new Error('fail');}
        })
        .catch(function(){status.textContent='Sorry, that didn\u2019t send. Please call 519 200-2876 or email oconnorstone@gmail.com.';})
        .finally(function(){btn.disabled=false;});
    });
  }
  // floating call button on mobile, shown after the hero
  var fab=document.querySelector('.call-fab'), hero=document.querySelector('.hero');
  if(fab&&hero){var onS=function(){fab.classList.toggle('show',window.scrollY>hero.offsetHeight-80);};window.addEventListener('scroll',onS,{passive:true});onS();}
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
})();
