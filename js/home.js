import { getScheduleState } from './schedule-core.js';

/* Home-only enhancements: the header overlay and weekly stream calendar. */
(() => {
  const header = document.querySelector('.home-header');
  const sentinel = document.querySelector('#hero-sentinel');

  if (header && sentinel) {
    const sentinelRect = sentinel.getBoundingClientRect();
    const sentinelIsInView = sentinelRect.bottom > 0 && sentinelRect.top < window.innerHeight;
    const isNearTop = Math.abs(window.scrollY) <= 1;
    header.classList.toggle('is-overlay', isNearTop || sentinelIsInView);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        header.classList.toggle('is-overlay', entry.isIntersecting);
      });
      observer.observe(sentinel);
    }
  }

  const calendar = document.querySelector('.home-live__calendar');
  if (!calendar) return;

  const rows = [...calendar.querySelectorAll('[data-weekday]')];
  const slots = rows.flatMap(row => {
    const times = [...row.querySelectorAll('time[datetime]')];
    if (times.length !== 2) return [];
    return [{
      weekday: Number(row.dataset.weekday),
      start: times[0].dateTime,
      end: times[1].dateTime,
    }];
  });

  const state = getScheduleState(new Date(), slots);
  rows.forEach(row => {
    const isToday = Number(row.dataset.weekday) === state.todayWeekday;
    const isNext = Number(row.dataset.weekday) === state.weekday;
    row.classList.toggle('is-today', isToday);
    row.classList.toggle('is-next', isNext);
    if (isToday) row.setAttribute('aria-current', 'date');
    else row.removeAttribute('aria-current');

    const todayMarker = row.querySelector('.home-live__today-marker');
    if (todayMarker) todayMarker.hidden = !isToday;
    const nextMarker = row.querySelector('.home-live__next-marker');
    if (nextMarker) {
      nextMarker.textContent = state.isNow ? 'Ahora' : 'Próxima';
      nextMarker.hidden = !isNext;
    }
  });

  const status = calendar.querySelector('[data-schedule-status]');
  if (status) {
    status.textContent = state.message;
    status.hidden = false;
  }
})();
