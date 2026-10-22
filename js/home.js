/* Home-only enhancement: the header is transparent while the hero sentinel is visible. */
(() => {
  'use strict';

  const header = document.querySelector('.home-header');
  const sentinel = document.querySelector('#hero-sentinel');

  if (!header || !sentinel) return;

  const sentinelRect = sentinel.getBoundingClientRect();
  const sentinelIsInView = sentinelRect.bottom > 0 && sentinelRect.top < window.innerHeight;
  const isNearTop = Math.abs(window.scrollY) <= 1;
  header.classList.toggle('is-overlay', isNearTop || sentinelIsInView);

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-overlay', entry.isIntersecting);
  });

  observer.observe(sentinel);
})();
