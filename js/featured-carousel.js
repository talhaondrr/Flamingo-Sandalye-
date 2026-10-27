(() => {
  const track = document.getElementById('featuredTrack');
  if (!track) return;
  const carousel = track.closest('.featured-carousel');
  const previous = carousel.querySelector('.featured-prev');
  const next = carousel.querySelector('.featured-next');
  const cards = [...track.querySelectorAll('.featured-card')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let targetIndex = 0;
  let scrollFrame = 0;
  const step = () => cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  const lastIndex = () => Math.max(0, cards.length - Math.round((track.clientWidth + parseFloat(getComputedStyle(track).gap)) / step()));
  const update = () => {
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  };
  const move = direction => {
    targetIndex = Math.max(0, Math.min(lastIndex(), targetIndex + direction));
    track.scrollTo({ left: targetIndex * step(), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(update);
  }, { passive: true });
  track.addEventListener('scrollend', () => { targetIndex = Math.round(track.scrollLeft / step()); update(); });
  track.addEventListener('pointerdown', () => { targetIndex = Math.round(track.scrollLeft / step()); }, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  new ResizeObserver(() => {
    targetIndex = Math.min(targetIndex, lastIndex());
    track.scrollTo({ left: targetIndex * step(), behavior: 'instant' });
    update();
  }).observe(track);
  update();
})();
