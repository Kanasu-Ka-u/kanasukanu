// Scroll reveal + small interactions (with fallback so nothing stays hidden)
(function(){
  const els = document.querySelectorAll('.reveal');
  function revealAll(){
    els.forEach(el=>el.classList.add('in'));
  }
  // Fallback: reveal everything after 1.5s no matter what
  const fallback = setTimeout(revealAll, 1500);

  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
        }
      });
    },{threshold:0.05,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>io.observe(el));
  } else {
    revealAll();
  }

  // Reveal elements already in viewport on load
  setTimeout(()=>{
    els.forEach(el=>{
      const r = el.getBoundingClientRect();
      if(r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    });
  }, 100);

  // Animated counters
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = +el.getAttribute('data-count');
    let cur = 0;
    const step = Math.max(1, Math.ceil(target/40));
    const t = setInterval(()=>{
      cur += step;
      if(cur >= target){ cur = target; clearInterval(t); }
      el.textContent = cur;
    }, 30);
  });

  // Autoplay videos when scrolled into view
  document.querySelectorAll('video[playsinline]').forEach(v=>{
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            v.play().catch(()=>{});
          } else {
            v.pause();
          }
        });
      },{threshold:0.4});
      io.observe(v);
    }
  });
  if(hero){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      hero.style.backgroundPosition = `center ${y*0.2}px`;
    }, {passive:true});
  }
})();
