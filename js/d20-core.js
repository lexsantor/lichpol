/** Categories and phrase copy for the Cursed D20. */
export const CATEGORIES = Object.freeze([
  Object.freeze({ id: 'fumble', label: 'Pifia crítica', min: 1, max: 1 }),
  Object.freeze({ id: 'disaster', label: 'Desastre', min: 2, max: 5 }),
  Object.freeze({ id: 'bad', label: 'Mala suerte', min: 6, max: 10 }),
  Object.freeze({ id: 'survival', label: 'Supervivencia cuestionable', min: 11, max: 15 }),
  Object.freeze({ id: 'good', label: 'Buena tirada', min: 16, max: 19 }),
  Object.freeze({ id: 'critical', label: 'Éxito crítico', min: 20, max: 20 }),
]);

/** Immutable phrase banks keyed by category id. */
export const PHRASES = Object.freeze({
  fumble: Object.freeze([
    'Has sacado un 1. Hasta el cadáver del suelo ha sentido vergüenza ajena.',
    'Tu espada sale volando y, por algún motivo, aterriza en tu bota.',
    'Pifia. El bardo ya está componiendo la canción. No es una canción heroica.',
    'El dado no ha fallado: ha emitido un juicio.',
    'Has tropezado con tu propia sombra. La sombra ha pedido disculpas por ti.',
    'En algún plano lejano, un lich se ríe por primera vez en siglos.',
    'Tu personaje acaba de descubrir la gravedad. Con la cara.',
  ]),
  disaster: Object.freeze([
    'El Dungeon Master sonríe. Eso nunca ha terminado bien.',
    'Fallas con tal convicción que el enemigo duda de sí mismo.',
    'La puerta estaba abierta. La has cerrado. Con llave. Desde fuera.',
    'Tu plan era brillante. Tu ejecución, una tragedia en tres actos.',
    'El goblin te mira con lástima y te ofrece su daga. Por si acaso.',
    'Tus compañeros acaban de decidir que no te conocen.',
    'Has despertado a algo. No, no era el posadero.',
  ]),
  bad: Object.freeze([
    'Sigues vivo. Claramente ha habido un error administrativo en el inframundo.',
    'Casi. Esa palabra quedará muy bien en tu lápida.',
    'La flecha pasa rozando. Rozando a tu compañero.',
    'No es un fracaso. Es una lección con pérdida de puntos de golpe.',
    'El cofre no tenía trampa. Tenía dos.',
    'El destino ni siquiera se ha molestado en mirarte.',
    'Has encontrado la salida. Era la entrada al siguiente piso.',
  ]),
  survival: Object.freeze([
    'No has muerto. Tus compañeros todavía están debatiendo si eso es bueno.',
    'Lo consigues. Nadie sabe cómo, y tú menos.',
    'Sobrevives, que no es lo mismo que salir bien parado.',
    'Aprobado raspado. El examen consistía en no morir.',
    'Funciona. No preguntes por qué ni intentes repetirlo.',
    'El puente aguanta. Por ahora. No mires abajo.',
    'Lo justo para que el Dungeon Master tenga que improvisar. Le encanta.',
  ]),
  good: Object.freeze([
    'Impresionante. Por primera vez hoy, tu incompetencia no ha sido determinante.',
    'Buena tirada. El bardo toma notas, por si acaso.',
    'Aciertas. El enemigo se replantea sus decisiones vitales.',
    'Hoy los dados te quieren. Mañana, ya veremos.',
    'Bien hecho. Disfrútalo: el Dungeon Master ya está reajustando el encuentro.',
    'Tu grupo te mira con un respeto nuevo y ligeramente incómodo.',
    'Éxito. Que no se te suba a la cabeza: ahí ya llevas el sombrero.',
  ]),
  critical: Object.freeze([
    'Crítico. Los dioses te favorecen. No te acostumbres, miserable.',
    'Un 20 natural. Por un instante, eres la leyenda que dices ser en la taberna.',
    'Crítico. Hasta el Dungeon Master ha dejado de sonreír.',
    'Los dragones susurran tu nombre. Mal pronunciado, pero lo susurran.',
    'Guarda este dado. No volverá a pasar.',
    'El destino revisa sus papeles: esta vez estás en la lista buena.',
    'Esta noche la ronda corre de tu cuenta. Las leyendas pagan.',
  ]),
});

/** Return a validated random sample clamped to the upper endpoint. */
function randomSample(rng) {
  const value = rng();
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError('rng must return a finite, non-negative number');
  }
  return Math.min(value, 1);
}

/** Roll an integer from 1 to 20 using the supplied random number source. */
export function rollD20(rng = Math.random) {
  return Math.min(20, Math.floor(randomSample(rng) * 20) + 1);
}

/** Return the category for a valid d20 result. */
export function classify(n) {
  if (!Number.isInteger(n) || n < 1 || n > 20) {
    throw new RangeError('n must be an integer from 1 to 20');
  }
  return CATEGORIES.find(category => n >= category.min && n <= category.max);
}

/** Choose a phrase, excluding the previous index when possible. */
export function pickPhrase(categoryId, lastIndex = -1, rng = Math.random) {
  if (!Object.hasOwn(PHRASES, categoryId)) {
    throw new RangeError(`Unknown category: ${categoryId}`);
  }
  const bank = PHRASES[categoryId];

  const candidates = bank.length > 1 && Number.isInteger(lastIndex)
    ? bank.map((_, index) => index).filter(index => index !== lastIndex)
    : bank.map((_, index) => index);
  const slot = Math.min(candidates.length - 1, Math.floor(randomSample(rng) * candidates.length));
  const index = candidates[slot];
  return { index, text: bank[index] };
}

/** Roll the die and select a phrase without keeping module state. */
export function createRoll(lastIndexByCategory = {}, rng = Math.random) {
  const value = rollD20(rng);
  const category = classify(value);
  const phrase = pickPhrase(category.id, lastIndexByCategory[category.id] ?? -1, rng);
  return { value, category, phraseIndex: phrase.index, text: phrase.text };
}
