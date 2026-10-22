/* Home-only enhancement: the header is transparent while the hero sentinel is visible. */
(() => {
  'use strict';

  const header = document.querySelector('.home-header');
  const sentinel = document.querySelector('#hero-sentinel');

  if (!header || !sentinel || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-overlay', entry.isIntersecting);
  });

  observer.observe(sentinel);
})();
