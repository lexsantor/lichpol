# Kuroto · Guía de estilo de la novela

Esta guía gobierna la conversión de la campaña de Kuroto en novela de fantasía para la web. Es vinculante para cada capítulo.

## Objetivo

Contar la campaña completa como una novela legible de principio a fin, fiel a lo que ocurrió en la partida y escrita con la textura de la buena prosa de fantasía: lugares que huelen, pesan y suenan; personajes con cuerpo, voz y miedo. Cada capítulo de la novela corresponde a un directo.

## Fuentes y jerarquía

1. `conocimiento/capitulos/NNN.json`: `historia.etapas` (columna de la trama), `afirmaciones` (hechos con cita, intervalo y límites), `misiones`, `preguntas`, `nombres_dudosos`, `contradicciones`.
2. Transcripción de la sesión (`derivados/NNN/lectura.md`), solo de forma dirigida: descripciones del director, frases reales de los personajes, detalles físicos. Los subtítulos son automáticos y ruidosos; ante una contradicción con la ficha, manda la ficha.
3. Rol escrito de Discord (`conocimiento/rol_escrito/escenas/`), solo el relato editorial de cada escena (lo que hay antes de `## Evidencias`). Se integran las escenas que cambian la trama, una relación o el estado de un personaje. Se descartan los despertares sueltos, los mensajes sin consecuencia y las escenas que repiten lo que ya cuenta un directo.

## Fidelidad

- No se inventan sucesos, muertes, victorias, derrotas, relaciones, revelaciones, nombres, cifras ni objetos.
- Se respetan los límites de cada afirmación (`limitacion`). Si la ficha dice que algo no se confirma, la novela no lo confirma: se narra con la misma ambigüedad.
- Está permitido y se espera: ambientación sensorial, gestos, interioridad coherente con lo que el personaje hace, transiciones, y diálogo breve que reformule lo que se dijo en la partida o lo que la afirmación atribuye a un personaje. Si existe una frase real en la transcripción o en la cita, se aprovecha.
- Ningún diálogo puede introducir información nueva sobre la trama.
- Las preguntas abiertas quedan abiertas. Un misterio sin respuesta en la campaña no se resuelve en la novela.

## Qué se elimina

Todo lo que pertenece a la mesa y no al mundo: dados, tiradas, turnos, iniciativa, ventajas, puntos de vida, niveles, clases nombradas como reglas, hechizos con su nombre de manual cuando suenan a mecánica, el director, los jugadores, el chat, Twitch, YouTube, la cámara, los cortes de emisión, las bromas fuera de la ficción (Nueva York, pizzas, referencias a otras campañas o a la vida real) y los errores de manejo convertidos en anécdota técnica.

Cuando un error de juego produjo una consecuencia dentro de la historia (por ejemplo, una poción derramada sobre el enemigo que vuelve a levantarse), se narra la consecuencia como suceso del mundo, sin explicar la regla.

El humor de la campaña se conserva cuando ocurre dentro del mundo: las pullas entre compañeros, los haikus de Leonardo, las exageraciones de Sun Gukon. Es parte de su tono.

## Voz y forma

- Narrador en tercera persona, pasado. Omnisciente con foco cercano a los cazadores; puede moverse entre ellos en escenas distintas.
- Registro literario, español neutro peninsular culto. Nada de anglicismos innecesarios.
- Frases de longitud variada. Párrafos de prosa continua; nada de listas ni encabezados internos más allá del título.
- Evitar: frases telegráficas, contrastes binarios del tipo «No X. Sino Y.», triadas de adjetivos, muletillas («algo cambió para siempre», «sin saberlo», «el destino»), moralejas finales y resúmenes al cierre del capítulo.
- Cada capítulo abre en escena (un lugar, un gesto, una sensación) y cierra en una imagen o una acción, no en una reflexión explicativa.
- Cambios de escena: una línea con `* * *`.
- Longitud orientativa: 1.600 a 2.600 palabras. Las sesiones con poca materia pueden quedar más cortas; nunca se rellena.

## Ortografía y tipografía

- Norma de la RAE. Revisar tildes, diacríticas («solo» sin tilde; «aún» temporal con tilde), leísmo admitido solo en masculino de persona, concordancias y puntuación.
- Diálogos entre comillas rectas dobles: `"Esto no ha terminado", dijo Jin.` No se usa raya ni guion largo en ningún caso. Comillas internas: simples rectas.
- Pensamientos y nombres de barcos o libros: en cursiva con `*`.
- Vocabulario del mundo en redonda, minúscula e invariable en plural: yokai, kappa, kami, tanuki, kitsune, oni, mujina, nekomata, baku, ronin, shogun, shinobi, katana, sake, onsen, drow. Se escribe «samurái» (plural «samuráis»). «Shogun» y «shogunato» van siempre en minúscula, como cargo y como institución: el shogun, la shogun, el shogunato.
- Números hasta cien en letra, salvo cifras de dinero complejas.
- Títulos de capítulo con mayúscula solo inicial y en nombres propios.

## Canon de nombres

Se usa siempre la forma de la izquierda. Las variantes de la derecha son el mismo personaje o lugar y no deben aparecer en el texto.

| Forma canónica | Variantes que no se usan |
|---|---|
| Sun Gukon (o Sun) | Gucón, Sungukon, Son Gucón, Wukong |
| Kitaro | Quitaro |
| Ukio | Kioto |
| Shiru | Shsu, Chsu |
| Sirth | Sir, Sirt, Shiri (el clérigo), Shirz |
| Ikari | Yari, Iari, Ikaari |
| Guxi | Gxi |
| Gelbreak | Jelbreg, Jelbreak, Jbreck |
| Calista | Kalista |
| Caniza | Kaniza |
| Erk | Eerk |
| Kurobane | Kurobani |
| Palayer | Palagier |
| Shizuka | Shisuka, Eggi |
| Lor Miau | Lor Miao, Lormiau, Lord Miau |
| Zia | Zobia |
| Tsugami | Sugami |
| Rua | Rau |
| Wel | Well |
| Kogan | Kogane |
| Koishi | Koisy, Coisy |
| Otakemaru | Ootakemaru |
| Byakko | Biaco |
| Seiryu | Sieru |
| Mar de Kyushu | Kiushi, Kyushi |
| Osuray | Osurei |
| Ushi | Ushiban |

Para cualquier otro nombre: la grafía más frecuente en `historia.etapas`; si hay dudas, la del catálogo `revision/identidades_confirmadas.json` sin la coletilla «(grafía provisional)». Las identidades que la revisión mantiene separadas (Shiru y Sirth; Ikari y Katari; las dos Nori) siguen separadas.

## Formato de entrega

Un archivo por directo en `novela/capitulos/NNN.md`, con este encabezado YAML:

```
---
capitulo: 1
sesion: 1
titulo: "El bosque de cuchillas"
titulo_sesion: "El Bosque de Cuchillas"
escenas_discord: []
fuentes: ["01-001", "01-002"]
---
```

Después, una línea `# El bosque de cuchillas` y la prosa. `fuentes` recoge las evidencias usadas; `escenas_discord`, los identificadores `k-…` integrados.

El título de la novela puede pulir el del directo (ortografía, mayúsculas, quitar «Especial Halloween», «Parte 2» o referencias a Twitch), pero no debe anunciar algo que no ocurre.
