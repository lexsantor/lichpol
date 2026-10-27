import test from 'node:test';
import assert from 'node:assert/strict';
import { getScheduleState } from '../js/schedule-core.js';

const SLOTS = [
  { weekday: 1, start: '20:30', end: '23:00' },
  { weekday: 2, start: '20:30', end: '23:00' },
  { weekday: 3, start: '20:30', end: '23:00' },
  { weekday: 4, start: '20:30', end: '23:00' },
];

const nextMessage = day => `Próxima sesión programada: ${day} a las 20:30. ${['Ve preparando una ficha', ' de repuesto.'].join('')}`;
const currentMessage = timeNote => `Sesión programada ahora (20:30-23:00)${timeNote}. ${['Llegas tarde,', ' para variar.'].join('')}`;

test('Monday at 10:00 Madrid points to Monday evening', () => {
  const state = getScheduleState(new Date('2026-10-26T09:00:00Z'), SLOTS, 'Europe/Madrid');
  assert.equal(state.todayWeekday, 1);
  assert.equal(state.isNow, false);
  assert.equal(state.message, nextMessage('lunes'));
});

test('Monday at 21:00 Madrid reports the scheduled session now', () => {
  const state = getScheduleState(new Date('2026-10-26T20:00:00Z'), SLOTS, 'Europe/Madrid');
  assert.equal(state.isNow, true);
  assert.equal(state.message, currentMessage(''));
});

test('Thursday at 23:00 Madrid rolls forward to next Monday', () => {
  const state = getScheduleState(new Date('2026-10-29T22:00:00Z'), SLOTS, 'Europe/Madrid');
  assert.equal(state.isNow, false);
  assert.equal(state.weekday, 1);
  assert.equal(state.message, nextMessage('lunes'));
});

test('Saturday rolls forward to Monday', () => {
  const state = getScheduleState(new Date('2026-10-31T10:00:00Z'), SLOTS, 'Europe/Madrid');
  assert.equal(state.weekday, 1);
  assert.equal(state.message, nextMessage('lunes'));
});

test('Monday through Wednesday after 23:00 roll to the next stream day', () => {
  const cases = [
    ['2026-10-26T22:00:00Z', 2, 'martes'],
    ['2026-10-27T22:00:00Z', 3, 'miércoles'],
    ['2026-10-28T22:00:00Z', 4, 'jueves'],
  ];
  for (const [instant, weekday, day] of cases) {
    const state = getScheduleState(new Date(instant), SLOTS, 'Europe/Madrid');
    assert.equal(state.weekday, weekday);
    assert.equal(state.message, nextMessage(day));
  }
});

test('summer and winter sessions both remain at 20:30 in Madrid', () => {
  const summer = getScheduleState(new Date('2026-07-06T18:30:00Z'), SLOTS, 'Europe/Madrid');
  const winter = getScheduleState(new Date('2026-01-12T19:30:00Z'), SLOTS, 'Europe/Madrid');
  assert.equal(summer.start, '20:30');
  assert.equal(summer.viewerTime, '20:30');
  assert.equal(winter.start, '20:30');
  assert.equal(winter.viewerTime, '20:30');
});

test('the viewer time is appended when the session falls at another local time', () => {
  const state = getScheduleState(new Date('2026-07-06T18:30:00Z'), SLOTS, 'UTC');
  assert.equal(state.viewerTime, '18:30');
  assert.equal(state.message, currentMessage(' (en tu hora: 18:30)'));
});
