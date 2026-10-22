import { createRoll } from './d20-core.js';

const trigger = document.querySelector('.d20-trigger');
const die = document.querySelector('.d20-die');
const faceNumber = document.querySelector('#d20-face-number');
const panel = document.querySelector('#d20-result');
const resultNumber = document.querySelector('#d20-result-number');
const resultLabel = document.querySelector('#d20-result-label');
const resultPhrase = document.querySelector('#d20-result-phrase');
const rollAgain = document.querySelector('#d20-roll-again');
const closeButton = document.querySelector('.d20-panel__close');
const live = document.querySelector('#d20-live');

if (trigger && die && faceNumber && panel && resultNumber && resultLabel && resultPhrase && rollAgain && closeButton && live) {
  const supportsPopover = HTMLElement.prototype.hasOwnProperty('popover');
  let isRolling = false;
  const lastIndexByCategory = {};

  if (supportsPopover) panel.removeAttribute('hidden');
  else panel.hidden = true;
  trigger.hidden = false;

  function panelIsOpen() {
    return supportsPopover ? panel.matches(':popover-open') : !panel.hidden;
  }

  function hidePanel() {
    if (supportsPopover) {
      if (panelIsOpen()) panel.hidePopover();
    } else {
      const shouldRestoreFocus = panel.contains(document.activeElement) || document.activeElement === document.body;
      panel.hidden = true;
      if (shouldRestoreFocus) trigger.focus();
    }
  }

  function showPanel() {
    if (supportsPopover) panel.showPopover();
    else panel.hidden = false;
    rollAgain.focus();
  }

  function finishRoll(roll, reducedMotion, flickerTimer, safetyTimer, animationHandler) {
    if (!isRolling) return;
    window.clearInterval(flickerTimer);
    window.clearTimeout(safetyTimer);
    die.removeEventListener('animationend', animationHandler);
    die.classList.remove('is-rolling', 'is-fumble');
    faceNumber.classList.remove('is-revealing');
    faceNumber.classList.toggle('is-natural-one', roll.value === 1);
    faceNumber.classList.toggle('is-natural-twenty', roll.value === 20);
    faceNumber.textContent = String(roll.value);
    resultNumber.textContent = String(roll.value);
    resultLabel.textContent = roll.category.label;
    resultPhrase.textContent = roll.text;
    panel.classList.remove('d20-panel--fumble', 'd20-panel--critical');

    if (roll.category.id === 'fumble') {
      panel.classList.add('d20-panel--fumble');
      if (!reducedMotion) die.classList.add('is-fumble');
    } else if (roll.category.id === 'critical') {
      void panel.offsetWidth;
      panel.classList.add('d20-panel--critical');
    }

    if (!reducedMotion) {
      faceNumber.classList.add('is-revealing');
      if (roll.category.id === 'critical') void panel.offsetWidth;
    }

    showPanel();
    live.textContent = `Has sacado un ${roll.value}. ${roll.category.label}. ${roll.text}`;
    trigger.setAttribute('aria-busy', 'false');
    isRolling = false;
  }

  function startRoll() {
    if (isRolling) return;
    isRolling = true;
    trigger.setAttribute('aria-busy', 'true');
    const roll = createRoll(lastIndexByCategory);
    lastIndexByCategory[roll.category.id] = roll.phraseIndex;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (panelIsOpen()) hidePanel();
    die.classList.remove('is-rolling', 'is-fumble');
    faceNumber.classList.remove('is-revealing');
    if (!reducedMotion) void die.offsetWidth;

    if (reducedMotion) {
      finishRoll(roll, true, 0, 0, () => {});
      return;
    }

    let flicker = Number(faceNumber.textContent) || 20;
    const flickerTimer = window.setInterval(() => {
      flicker = flicker === 20 ? 1 : flicker + 1;
      faceNumber.textContent = String(flicker);
    }, 70);

    let safetyTimer = 0;
    const animationHandler = event => {
      if (event.target === die && event.animationName === 'd20-roll') {
        finishRoll(roll, false, flickerTimer, safetyTimer, animationHandler);
      }
    };
    die.addEventListener('animationend', animationHandler);
    die.classList.add('is-rolling');
    safetyTimer = window.setTimeout(() => {
      finishRoll(roll, false, flickerTimer, safetyTimer, animationHandler);
    }, 1500);
  }

  trigger.addEventListener('click', startRoll);
  rollAgain.addEventListener('click', startRoll);

  if (supportsPopover) {
    let wasFocusInside = false;
    panel.addEventListener('beforetoggle', event => {
      if (event.newState === 'closed') wasFocusInside = panel.contains(document.activeElement);
    });
    panel.addEventListener('toggle', event => {
      if (event.newState === 'closed') {
        if (wasFocusInside) trigger.focus();
        wasFocusInside = false;
      }
    });
  } else {
    closeButton.addEventListener('click', hidePanel);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && panelIsOpen()) {
        event.preventDefault();
        hidePanel();
      }
    });
  }
}
