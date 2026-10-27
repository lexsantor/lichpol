const MADRID_TIME_ZONE = 'Europe/Madrid';
const WEEKDAY_NUMBERS = Object.freeze({ Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 });
const WEEKDAY_NAMES = Object.freeze(['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']);

function getZonedParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return {
    weekday: WEEKDAY_NUMBERS[values.weekday],
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  };
}

function parseTime(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(value ?? '');
  if (!match) throw new RangeError('Schedule times must use HH:MM');
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) throw new RangeError('Schedule times must use HH:MM');
  return hour * 60 + minute;
}

function addDays(dateParts, days) {
  const date = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day + days, 12));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

function localTimeToInstant(dateParts, time, timeZone) {
  const [hour, minute] = time.split(':').map(Number);
  const target = Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, hour, minute);
  let instant = target;

  for (let attempt = 0; attempt < 5; attempt++) {
    const actual = getZonedParts(new Date(instant), timeZone);
    const actualAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
    const difference = target - actualAsUtc;
    if (difference === 0) return new Date(instant);
    instant += difference;
  }

  throw new RangeError(`Could not resolve the local time in ${timeZone}`);
}

function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

/** Find today's Madrid weekday and the next slot, independent of the host timezone. */
export function getScheduleState(now, slots, viewerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new RangeError('now must be a valid Date');
  }
  if (!Array.isArray(slots) || slots.length === 0) {
    throw new RangeError('slots must contain at least one session');
  }

  const today = getZonedParts(now, MADRID_TIME_ZONE);
  const nowInMinutes = today.hour * 60 + today.minute;
  const parsedSlots = slots.map(slot => {
    const startMinute = parseTime(slot.start);
    const endMinute = parseTime(slot.end);
    if (!Number.isInteger(slot.weekday) || slot.weekday < 1 || slot.weekday > 7 || endMinute <= startMinute) {
      throw new RangeError('Each session needs a weekday from 1 to 7 and an end time after its start');
    }
    return { ...slot, startMinute, endMinute };
  });

  const sessionsForDay = weekday => parsedSlots
    .filter(slot => slot.weekday === weekday)
    .sort((a, b) => a.startMinute - b.startMinute);

  const activeSlot = sessionsForDay(today.weekday)
    .find(slot => nowInMinutes >= slot.startMinute && nowInMinutes < slot.endMinute);

  let selectedSlot = activeSlot;
  let sessionDate = { year: today.year, month: today.month, day: today.day };
  let isNow = Boolean(activeSlot);

  if (!selectedSlot) {
    for (let dayOffset = 0; dayOffset < 7 && !selectedSlot; dayOffset++) {
      const weekday = ((today.weekday - 1 + dayOffset) % 7) + 1;
      const upcoming = sessionsForDay(weekday).find(slot => dayOffset > 0 || slot.startMinute > nowInMinutes);
      if (upcoming) {
        selectedSlot = upcoming;
        sessionDate = addDays(today, dayOffset);
      }
    }
  }

  if (!selectedSlot) throw new RangeError('No upcoming sessions were found');

  const sessionInstant = localTimeToInstant(sessionDate, selectedSlot.start, MADRID_TIME_ZONE);
  const viewerTime = formatTime(sessionInstant, viewerTimeZone);
  const timeNote = viewerTime === selectedSlot.start ? '' : ` (en tu hora: ${viewerTime})`;
  const dayName = WEEKDAY_NAMES[((getZonedParts(sessionInstant, MADRID_TIME_ZONE).weekday ?? today.weekday) - 1)];
  const message = isNow
    ? `Sesión programada ahora (${selectedSlot.start}-${selectedSlot.end})${timeNote}. Llegas tarde, para variar.`
    : `Próxima sesión programada: ${dayName} a las ${selectedSlot.start}${timeNote}. Ve preparando una ficha de repuesto.`;

  return {
    todayWeekday: today.weekday,
    isNow,
    weekday: selectedSlot.weekday,
    date: sessionDate,
    start: selectedSlot.start,
    end: selectedSlot.end,
    viewerTime,
    message,
  };
}
