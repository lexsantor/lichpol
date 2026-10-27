---
title: "LICHPOL | Design & Brand Intelligence"
filename: "design.md"
version: "6.0 / Brand Final / Controls Patch"
updated: "2026-10-22"
locale: "es-ES"
status: "Fuente de dirección y contrato para diseño asistido por IA; prototipo validado parcialmente, no certificación de producción"
product: "Lichpol"
creative_direction: "The Arcane Tavern"
implementation_reference: "LICHPOL-V6-brand-final/"
---

# LICHPOL — DESIGN.MD

> **Propósito:** este archivo es el contrato operativo para cualquier IA, agente de código, diseñador o desarrollador que deba entender la marca Lichpol y diseñar, extender, implementar, auditar o mantener sus páginas y componentes. Debe permitir crear páginas nuevas **reconocibles como Lichpol** sin reinventar la identidad, perder la estética de fantasía oscura adulta ni copiar mecánicamente una maqueta existente.
>
> **Lectura obligatoria:** antes de tocar un archivo del proyecto, leer este documento, inspeccionar el código existente relevante y sus assets, identificar el flujo de usuario y trabajar con las primitivas disponibles. No implementar a ciegas, no inventar información y no anunciar verificaciones no realizadas.

## 00. Cómo utilizar este documento

### 00.1. Convenciones de procedencia

- **[MARCA FIJA]** Decisión explícita del proyecto: no reinterpretar sin autorización.
- **[IMPLEMENTADO V6]** Propiedad presente en los archivos de la V6 final. El código y el asset correspondiente permiten verificar el detalle.
- **[REQUISITO DE NUEVA PÁGINA]** Norma exigida para nuevas implementaciones, aunque algunos ejemplos antiguos todavía no la cumplan por completo.
- **[RECOMENDACIÓN]** Criterio de madurez para futuro desarrollo; no presentarlo como funcionalidad ya terminada.
- **[PENDIENTE]** Información, licencia, comportamiento o validación que no está confirmada. Conservar incertidumbre; no suplirla con datos inventados.
- **[REFERENCIA V4]** Ejemplo del catálogo visual de 64 componentes. Que exista un ejemplo no significa que sea una primitiva de producción.

### 00.2. Orden de autoridad ante conflictos

1. **Archivos originales de identidad:** `assets/lichpol-logo-color.svg`, `assets/lichpol-logo-white.svg`, `assets/lichpol-logo-black.svg` y `docs/BRAND-LOCK.md`.
2. **Comportamiento real del proyecto:** código modular de la V6 final (`css/tokens.css`, `css/site.css`, `js/site.js`, HTML y assets). No suponer que un valor descrito aquí ya está codificado si la inspección demuestra lo contrario.
3. **Este `design.md`:** define la dirección y los criterios para evolucionar el producto. Si propone endurecer algo frente al código histórico, registrar esa diferencia antes de cambiarlo.
4. **Catálogo histórico:** `componentes.html` / `atlas-v4.html` y `docs/COMPONENT-CONTRACTS.md`, útiles como referencia visual e inventario, no como APIs de producción.
5. **Contenido público y factual:** `docs/CONTENT-SOURCES.md`, `docs/CONTENT-NOTES.md` y fuentes originales verificadas. Para horarios, plazas y enlaces, debe prevalecer una fuente actualizada.
6. **Referencias de terceros e imágenes iniciales:** inspiración, jamás fuente de verdad normativa ni permiso para copiar diseño o propiedad intelectual.

**No resolver conflictos por intuición.** Señalar el desajuste, conservar el diseño establecido y hacer la menor modificación razonable que resuelva el objetivo.

### 00.3. Reglas innegociables, versión resumida

1. Lichpol es **un Dungeon Master real y una comunidad de rol**, no un videojuego comercial ni un dashboard de RPG.
2. Dirección artística: **fantasía oscura medieval, adulta, material y cinematográfica**.
3. Concepto central: **The Arcane Tavern**. La experiencia evoca entrar en una taberna peligrosa y acogedora donde empiezan historias compartidas.
4. Los **tres SVG oficiales** del logo son inviolables. Nunca generar una variante alternativa ni sustituirlos por el antiguo sello geométrico.
5. El personaje del logo puede tener un tratamiento ilustrativo propio; **el arte del sitio no debe volverse anime, chibi, cartoon ni infantil**.
6. Protagonismo de entornos realistas y narrativos: tabernas, castillos, ruinas, pergamino, cuero, piedra, hierro, vela, humo, niebla.
7. **Materialidad sutil, no tematización indiscriminada**: controles comprensibles, legibles y usables primero.
8. El oro/bronce expresa jerarquía, **no** es una pintura aplicable a todo.
9. Una familia tipográfica por titular; la diferencia de **color** entre fragmentos se permite, los saltos de familia/cursiva arbitrarios no.
10. **Sin palabras viudas** ni cortes de frases absurdos en textos finales. Validar a varios anchos; `text-wrap` no sustituye la QA.
11. Sans funcional para datos, campos, badges y metadatos. Nunca esconder información crítica en letras ornamentales minúsculas.
12. Botón **tertiary sin borde**, incluyendo hover y focus; sí necesita feedback visible y foco accesible.
13. **Badges de peso 500** y texto suficientemente grande/contrastado; distinguir componente actual y objetivo de producción cuando difieran.
14. `Select` y `Native Select` deben conservar **idéntico lenguaje de chevron**, tamaño, grosor, orientación y espaciado.
15. Scrollbar visible cuando haga falta, estrecha y tematizada: canal oscuro, thumb bronce; nunca barras blancas ajenas al theme en los ejemplos corregidos.
16. `Checkbox`, `Radio Group`, calendario y controles deben tener estados visuales coherentes; no mezclar accidentalmente popups blancos nativos con paneles oscuros personalizados.
17. **Contenedor principal de 1200 px máximo** en referencia de 1440 px, centrado; **120 px por lado** a esa anchura.
18. Grid de referencia: **12 columnas desktop**. Tablet y móvil reorganizan la composición según el contenido, no se limitan a escalar.
19. Reutilizar **tokens y componentes existentes**; evitar crear estilos locales casi idénticos o meter otra librería por comodidad.
20. Mantener accesibilidad semántica, estados de foco, teclado, errores y soporte `prefers-reduced-motion`.
21. Nunca inventar **plazas, horarios, fechas, precios, enlaces de Discord, contadores de sesiones ni datos biográficos**.
22. Las escenas de campaña son **arte conceptual**, no arte oficial/canónico confirmado.
23. Los **64 componentes del Atlas** deben permanecer localizables; no perderlos al añadir páginas.
24. Evitar AI slop visual: tarjetas clonadas, iconos arbitrarios, exceso de bordes brillantes, brillos gratuitos, copy heroico genérico, patrones repetitivos.
25. Exigir pruebas responsive y de comportamiento. No asignar puntuaciones altas para satisfacer un objetivo; solo registrar notas respaldadas por evidencia.

### 00.4. Cómo trabajar si solo recibes `design.md`

Este archivo es autosuficiente para dirigir decisiones visuales y de UX, pero **no contiene ni sustituye los bytes de SVG, imágenes, HTML, CSS y JS**. Si el repositorio no incluye esos archivos, no finjas tenerlos. Puedes proponer wireframes, especificaciones o código basado en los tokens aquí reproducidos, pero declara qué necesita los originales para alcanzar fidelidad total. Si el repositorio sí los incluye, inspecciónalos antes de implementar.

---

## 01. Esencia del producto y posicionamiento

### 01.1. Qué es

**Lichpol** es la identidad pública de Pol como jugador y Dungeon Master. Su actividad combina dirección de partidas, campañas narrativas, creación de mundos, contenido audiovisual y una comunidad de rol organizada principalmente alrededor de Discord. La web debe explicar quién es, qué aventuras y sistemas existen, cómo participar y por dónde continuar la relación con la comunidad. [Hechos resumidos de la documentación de contenido de V6, consultada el 22-10-2026.]

**No es:** un MMORPG, un inventario jugable, una aplicación de combate, una tienda de armas, una plataforma de reservas con disponibilidad real ni un clon visual de D&D Beyond o Foundry VTT.

### 01.2. Promesa de producto

> Aquí no vienes a contemplar un mundo fantástico: vienes a encontrar una mesa, elegir una historia y compartirla con otras personas.

- **Valor funcional:** descubrir campañas/sistemas; entender requisitos y estilo; acceder a la comunidad y obtener información actualizada.
- **Valor emocional:** pertenencia, curiosidad, anticipación, compañía y aventura compartida.
- **Valor de marca:** Dungeon Master reconocible, cercanía humana y mundos narrativos con personalidad.
- **Conversión principal:** pasar de la curiosidad a la comunidad o a la consulta de una campaña. No simular una inscripción completada si no existe backend.

### 01.3. Audiencias prioritarias [RECOMENDACIÓN basada en el producto]

| Audiencia | Necesidad | Información que debe encontrar | Obstáculo a evitar |
|---|---|---|---|
| Persona que nunca ha jugado | Saber si puede empezar | Qué es jugar, preparación, normas básicas, acceso al grupo | Terminología opaca y elitismo |
| Jugador con experiencia | Evaluar campañas | Sistema, tono, duración aproximada confirmada, condiciones reales, siguiente paso | Copy atmosférico que oculta datos |
| Jugador de la comunidad | Encontrar actividad | Canales oficiales, novedades verificadas, rutas a campañas | Información obsoleta en varias páginas |
| Persona interesada en el DM | Identificar quién dirige | Identidad, enfoque, contenido público y contacto | Biografía ficticia o tono grandilocuente |
| Colaborador o creador | Entender propuesta | Forma de contactar, contenido, proyectos públicos | Promesas de colaboración no existentes |

### 01.4. Personalidad, en tensiones

| Lichpol es… | Pero nunca… |
|---|---|
| Oscuro, misterioso | Ilegible o hostil |
| Adulto y épico | Pretencioso o artificial |
| Medieval y material | Un museo de texturas sobre cada píxel |
| Familiar como una taberna | Infantil o caricaturesco |
| Mágico | Cargado de efectos sin función |
| Narrativo | Vago respecto a acciones concretas |
| Rolero | Exclusivo para veteranos |
| Reconocible | Un clon de una franquicia famosa |

### 01.5. Principios UX de máximo nivel

1. **La historia atrae; la acción orienta.** Cada sección narrativa debe llevar a un paso claro.
2. **Un sistema coherente, no una pantalla saturada.** La fantasía vive en el fondo, el lenguaje, las imágenes y algunos detalles de interfaz; no en controles enrevesados.
3. **Personas reales antes que cifras heroicas.** Priorizar voces, participación y confianza.
4. **Decisión sin fricción.** Una persona debe reconocer inmediatamente cómo explorar campañas y acceder a la comunidad.
5. **Progresive disclosure.** Lo profundo queda disponible, no impuesto desde el inicio.
6. **No ocultar la realidad bajo el lore.** Diferenciar ficción del mundo de juego de información operacional verificada.

---

## 02. Arquitectura de información y navegación

### 02.1. Estructura de referencia implementada en V6

| Archivo | Página | Papel | CTA predominante |
|---|---|---|---|
| `index.html` | Inicio / La Taberna | Promesa de marca, descubrimiento y entrada | Explorar campañas, entrar en comunidad |
| `campanas.html` | Campañas | Catálogo y filtros por tipo de sistema | Ver campaña o consultar la comunidad |
| `kuroto.html` | Dossier de Kuroto | Presentar un universo concreto, contexto y paso siguiente | Consultar cómo participar |
| `comunidad.html` | Comunidad | Explicar el acceso a Discord a través de la web oficial | Encontrar Discord en Lichpol.es |
| `maestro.html` | El Dungeon Master | Construir reconocimiento y confianza | Conocer la comunidad |
| `patrones.html` | Patrones | Demostrar composiciones reutilizables | Abrir Atlas / página de campaña |
| `sistema.html` | Design System | Documentar fundamentos, identidad, motion, métricas e índice | Abrir 64 componentes |
| `componentes.html` | Component Atlas | Galería íntegra de 64 ejemplos | Buscar, filtrar y probar |
| `LICHPOL-V6.html` | Versión autónoma | Recorrido por destinos sin servidor | Navegar por secciones |

**Observación:** las páginas de patrones, sistema y componentes son superficies internas/de documentación; no tienen por qué figurar como destino principal de navegación en una versión pública definitiva. La navegación real debe atender la intención de jugadores, no exponer el taller de diseño a todos por defecto.

### 02.2. Jerarquía recomendada para público

```text
Lichpol
├── Inicio / La Taberna
├── Campañas y sistemas
│   ├── Catálogo con filtros
│   ├── Kuroto [referencia existente]
│   ├── Brunami [referencia existente]
│   └── Otros sistemas [solo si existe contenido verificable]
├── El Dungeon Master
├── Comunidad
└── Contenidos / crónicas [solo cuando exista inventario real]

Apartados de documentación (no necesariamente menú público):
├── Design System
├── Patrones
└── Component Atlas 64/64
```

### 02.3. Experiencias críticas

**Primer contacto:** Hero honesto y evocador → elegir campañas o comunidad → información clara → salida hacia fuente oficial.

**Jugador que busca partida:** Catálogo → filtrar por sistema/tono → comparar sin datos inventados → detalle → consultar plazas/condiciones en destino oficial.

**Persona novata:** Inicio/comunidad → explicación breve → normas y pasos → acceso oficial → bienvenida.

**Fan de mundos:** Entrada editorial → universo → lore y hechos de campaña diferenciados → alternativa de continuar.

### 02.4. Comportamientos globales

- Header consistente, estado `aria-current="page"` cuando aplique y navegación usable por teclado.
- Mobile menu con botón visible, `aria-expanded`, cierre con Escape y retorno del foco. [IMPLEMENTADO V6]
- Breadcumbs en páginas profundas si mejora orientación. [RECOMENDACIÓN, presente en Atlas]
- Footer con enlaces oficiales verificables, marca y transparencia sobre el estado conceptual del sitio.
- CTAs a recursos externos: indicar salida cuando sea útil; `target="_blank"` requiere tratamiento seguro.
- Sin navegación muerta, anclas falsas, `#` decorativos ni botones sin acción.

---

## 03. Sistema de identidad: brand lock

### 03.1. Nombre y descriptor

- **Nombre de marca:** `LICHPOL`.
- **Alias/rol:** Dungeon Master / Pol, según contexto verificado.
- **Descriptor editorial:** `THE ARCANE TAVERN`. **No forma parte** del logo vectorial que aportó el proyecto.
- **Idioma principal de interfaz:** español (`es-ES`), salvo traducciones expresamente pedidas.
- **Convención:** Lichpol en prosa, LICHPOL en contextos de lockup/brand display si corresponde.

### 03.2. Archivos maestros intocables [MARCA FIJA]

| Archivo | Geometría nominal | Uso preferente | Regla |
|---|---:|---|---|
| `assets/lichpol-logo-color.svg` | 1254 × 1254 | Perfil, hero de marca, zona protagonista | Mantener colores/trazados originales |
| `assets/lichpol-logo-white.svg` | 993 × 994 | Header/footer sobre oscuridad | No aplicar filtros/recolor |
| `assets/lichpol-logo-black.svg` | 994 × 994 | Pergamino y soportes claros | Asegurar contraste por contexto |

Los valores proceden de las etiquetas `svg` originales. La relación es prácticamente cuadrada; **no forzar `aspect-ratio: 1/1` para recortar un SVG de 993 × 994**. Permitir el tamaño intrínseco y `object-fit: contain`.

### 03.3. ADN del símbolo

- Personaje de mago **adulto** con sombrero de brujo.
- Gafas de pasta características.
- D20 flotante envuelto en fuego.
- Composición de mascota integrada en un escudo medieval.
- Aplicación vectorial original, con una carga ilustrativa mayor que la UI.

**Importantísimo:** el logo es un activo final recibido y aprobado para este prototipo. Una IA **no debe redibujarlo, limpiarlo, modernizarlo, simplificarlo, vectorizarlo otra vez, reemplazarlo por tipografía generada ni hacer un "rebrand"**. Tampoco sustituirlo por la antigua L en rombo (`lichpol-sigil.svg`, recurso histórico).

### 03.4. Normas de aplicación

1. Respetar el `viewBox` y escalar proporcionalmente.
2. Zona libre mínima recomendada por la guía de marca existente: **10% del ancho del símbolo** alrededor del logo en aplicaciones protagonistas.
3. En fondos fotográficos densos, colocar una superficie oscura o un overlay que asegure separación.
4. No usar el SVG de color a tamaños que destruyan sus rasgos; evaluar especialmente 16/24/32/48 px.
5. Favicon: **[PENDIENTE]** una validación óptica real. No declarar que la mascota completa funciona a 16 px solo porque el SVG sea escalable.
6. Header V6: ejemplo funcional `.brand img` de `48 × 48 px`, variante blanca junto al texto tipográfico. **Es un tamaño de referencia de la UI, no un mínimo universal de identidad.**
7. Wordmark: el texto `LICHPOL` al lado del símbolo es un **acompañamiento tipográfico de interfaz**, no un archivo vectorial nuevo.
8. Mantener las tres variantes de fuente original en el repositorio y referenciarlas directamente.
9. **No codificar los SVG como un nuevo personaje original de IA.** Si el icono de aplicación exige una versión derivada, solicitar autorización y diseñar/validar aparte.

### 03.5. Ejemplos de uso técnico

```html
<a class="brand" href="/" aria-label="Lichpol, ir al inicio">
  <img src="assets/lichpol-logo-white.svg" alt="" width="48" height="48" />
  <span class="brand-stack">
    <strong>LICHPOL</strong>
    <small>THE ARCANE TAVERN</small>
  </span>
</a>
```

- Usar `alt=""` en el símbolo cuando el nombre adyacente y el enlace ya comunican exactamente la marca; evitar nombre duplicado en lector de pantalla.
- En una ficha donde el logo **sea el contenido** y no tenga etiqueta textual equivalente, usar un `alt` conciso.
- No aplicar `filter: sepia(...)`, tintes CSS ni `opacity` que desfiguren la marca como forma de inventar una variante.

### 03.6. Lo que el logo **no** dicta

La mascota posee un estilo ilustrativo con influencia manga. Ese tratamiento es **particular del logotipo** y no autoriza personajes chibi, avatares kawaii, anime infantil, landscapes cartoon ni interfaces gamificadas de móvil. El sitio conserva arte ambiental **realista, sombrío y cinematográfico**, orientado a adultos.

---

## 04. Dirección visual: The Arcane Tavern

### 04.1. Declaración creativa

La experiencia debe sentirse como entrar en la taberna de una ciudad medieval tras una larga travesía. Fuera hay ruinas, guerras, magos y territorios desconocidos; dentro hay mapas, conversaciones y una mesa de juego. Es una síntesis conceptual del ambiente de taberna fantástica, magia oscura y aventuras narrativas, **sin reproducir localizaciones, personajes o assets de franquicias**.

**Balance de intención propuesto originalmente:** 70% fantasía medieval oscura, 20% arcano y 10% lenguaje de interfaz RPG. No convertir el porcentaje en regla matemática; sirve para frenar una UI con demasiados HUDs.

### 04.2. Pilares de arte

| Pilar | Propiedades permitidas | Fallo que hay que evitar |
|---|---|---|
| Tavern / Fellowship | fuego, madera, piedra, personas conversando, objetos usados, luz cálida | posada infantil o escenario de parque temático |
| Arcane / Magic | rituales, grimorios, símbolos, niebla, violeta discreto, misterio | partículas neón por todas partes |
| Adventure / Peril | ruinas, fortalezas, puentes, montañas, tormentas, escala | póster de juego móvil genérico |
| Materiality | cuero envejecido, hierro oscuro, bronce, pergamino, vetas de madera | texturas de baja calidad repetidas en cada componente |
| Human presence | manos, mesas, jugadores, tensión narrativa, escenas creíbles | figuras artificiales caricaturescas, falsa fotografía biográfica |

### 04.3. Fotografía/ilustración cinematográfica

- **Registro:** concept art pictórico realista, acabado cinematográfico de alta calidad. Es admisible cierto tratamiento de pintura fantástica adulta; no asumir hiperrealismo fotográfico como única técnica.
- **Composición:** masas de sombra amplias, focos de iluminación motivados, escala humana, profundidad ambiental, capas de atmósfera.
- **Luz:** velas, chimenea, braseros, una entrada de luz fría desde el exterior; contraste cálido/frío sin quemar altas luces.
- **Textura:** material honesto, desgaste, imperfecciones controladas, metal con pátina, piedra húmeda, papel envejecido.
- **Color:** sombras casi negras, marrones y carbón; oro solo en fuentes de luz/acción; ocasional azul frío, musgo, arcano violeta o ember óxido según historia.
- **Cámara:** planos amplios para héroes/atmósfera; planos medios en figuras; macro de objetos cuando son relevantes para la identidad.
- **Personajes:** anatomías y proporciones adultas, ropa creíble dentro del género, expresión natural, sin extremar poses genéricas de héroe.
- **Interfaz:** imágenes protagonistas por delante de iconos gigantes decorativos, shapes de fantasy gratuita o overlays de contenido sin jerarquía.

### 04.4. Assets visuales de V6 [IMPLEMENTADO, arte conceptual]

| Archivo | Medida en píxeles | Función real | Restricción editorial |
|---|---:|---|---|
| `assets/tavern.webp` | 1672 × 941 | Portada, atmósfera social | Imagen conceptual, no foto de una taberna existente |
| `assets/kuroto.webp` | 1672 × 941 | Dossier y tarjetas Kuroto | Mundo inspirado visualmente, **no canon confirmado** |
| `assets/brunami.webp` | 1781 × 883 | Otra campaña o alternativa editorial | **No representa canon confirmado** |
| `assets/wizard.webp` | 1536 × 1024 | Bodegón sombrero/gafas/D20 | **No es retrato de Pol** |
| `assets/atlas-preview.webp` | 1440 × 900 | Preview del Design System | Referencia interna, no contenido narrativo |

Las cuatro primeras imágenes son generadas para el prototipo y no sustituyen derechos sobre material oficial de campañas. No colocar nombres de autor/copyright ficticios, ni asegurar autoría canónica de los mundos.

### 04.5. Reglas de imagen en páginas nuevas

1. **Auditar assets existentes antes de generar otros.** Si el objetivo se satisface con `tavern.webp` o `kuroto.webp`, reutilizar.
2. Si hace falta una imagen nueva, definir antes: papel narrativo, sujeto, ambientación, paleta, encuadre, foco, relación de aspecto, superficie donde se leerá texto y estado de licencia.
3. Evitar texto incrustado en la imagen; el HTML controla los títulos y preserva traducción y accesibilidad.
4. Reservar **espacio negativo real** allí donde se superpondrá copy; no tapar rostros con headings.
5. `object-fit: cover` con `object-position` especificado cuando el crop lo necesite. Revisar desktop/tablet/móvil por separado.
6. Usar overlays para legibilidad cuando el texto está sobre la escena. No oscurecer indiscriminadamente hasta perder profundidad.
7. No generar cada card como si fuera una portada cinematográfica distinta sin criterio de mundo y status.
8. Disponer un fallback oscuro degradado coherente si falta imagen.
9. Guardar atribución, fuente, licencia y estatus conceptual en metadatos del proyecto.
10. No confundir una exploración artística con una escena oficial autorizada.

### 04.6. Guía para nuevos prompts de arte [RECOMENDACIÓN]

**Prompt base:**

```text
Adult dark-fantasy environmental concept art for LICHPOL / The Arcane Tavern.
Scene: [describe specific in-world place or object and why it matters].
Cinematic realism, lived-in medieval materials, mature atmosphere, worn wood,
aged iron, rough stone, natural candlelight or believable atmospheric lighting,
controlled warm brass highlights, deep shadows, tactile details, visual depth.
Composition: [wide establishing shot | environmental close-up | character scene].
Reserve negative space at [side] for UI copy. No embedded words or logos.
Original fictional location, not a copy of a known franchise scene.
```

**Restricciones negativas:** `chibi`, `kawaii`, `cartoon`, `cute mascot outside logo`, `bright plastic fantasy`, `mobile-game gacha UI`, `vector children illustration`, `oversaturated purple fire everywhere`, `generic AI fantasy hero pose`, `mangled anatomy`, `floating nonsense decorations`, `fake game HUD`, `watermark`, `unreadable lettering`.

**Importante:** un prompt de generación no constituye licencia ni garantía de fidelidad; revisar el arte final a escala real y con criterios de propiedad intelectual.

### 04.7. Originalidad sin AI slop

La diferencia Lichpol no viene de añadir calaveras, espadas y runas por todas partes. Viene de **una narración visual propia**, el personaje de marca, las escenas contextualizadas y un ritmo de página donde los elementos extraordinarios tengan un motivo. Evitar una gramática visual de "dashboard de fantasía" en cada sección.

---
## 05. Foundations: color, contraste y semántica

### 05.1. Regla general

La paleta final **se consume a través de tokens semánticos**. Los componentes no deben escoger un hex arbitrario solo porque "parezca medieval". Las primitivas de `css/tokens.css` son el origen de color de las páginas V6; el Atlas V4 conserva un conjunto histórico propio de muestras para documentación. Esos dos conjuntos coexisten, pero **los nuevos componentes de producto siguen `css/tokens.css`**.

### 05.2. Pigmentos primitivos existentes [IMPLEMENTADO V6]

| Nombre técnico | Hex | Significado y uso |
|---|---|---|
| `--ink-950` | `#0D0D0E` | Lienzo de oscuridad profunda |
| `--ink-900` | `#141315` | Superficie baja / fondo oscuro |
| `--ink-850` | `#1C1918` | Superficie elevada |
| `--ink-800` | `#25201E` | Panel de nivel superior |
| `--ink-700` | `#38302C` | Separación y elevación |
| `--ink-600` | `#5A4A40` | Hierro/marrón apagado |
| `--ash-500` | `#A69A89` | Texto terciario y metadatos secundarios |
| `--bone-100` | `#F0E8DA` | Texto principal claro |
| `--bone-200` | `#DCD0BF` | Texto funcional claro secundario |
| `--bone-300` | `#C9BBA5` | Texto atenuado legible |
| `--brass-300` | `#E4C48B` | Foco y acento claro |
| `--brass-400` | `#D1AA66` | Acción principal |
| `--brass-500` | `#B88A48` | Bronce de intensidad media |
| `--brass-700` | `#6D502E` | Bronce oscuro de estructura |
| `--rust-400` | `#CE765D` | Alerta/peligro claro |
| `--rust-600` | `#9B4A39` | Rojo óxido profundo |
| `--moss-400` | `#99B4A0` | Éxito/estado positivo |
| `--moss-700` | `#365448` | Verde musgo profundo |
| `--arcane-400` | `#AB98C8` | Magia y rareza, con moderación |
| `--arcane-700` | `#483B59` | Superficie arcana oscura |

**No confundir** este grupo con el Atlas legado (`#100E0C`, `#191613`, `#C49A53`, etc.). Cuando haya que extender el sitio, no meter una tercera paleta; decidir primero si el token semántico ya resuelve el caso.

### 05.3. Tokens semánticos exactos [IMPLEMENTADO V6]

```css
:root {
  --canvas: var(--ink-950);
  --surface: var(--ink-900);
  --surface-raised: var(--ink-850);
  --line: rgba(210, 180, 132, .18);
  --line-strong: rgba(218, 183, 129, .43);
  --fg: var(--bone-100);
  --fg-muted: var(--bone-300);
  --fg-subtle: var(--ash-500);
  --action: var(--brass-400);
  --action-fg: #17130E;
  --positive: var(--moss-400);
  --negative: var(--rust-400);
  --focus: var(--brass-300);
  --selection: rgba(184, 138, 72, .25);
}
```

### 05.4. Jerarquía de acentos [REQUISITO]

1. **Primer nivel:** CTA principal y foco de interacción, bronce `--action` o variante aprobada.
2. **Segundo nivel:** bordes de componentes seleccionados, indicadores de estado, títulos de sección selectivos.
3. **Tercer nivel:** detalles ornamentales, separadores o pequeñas señales que no compitan con la tarea.
4. **Tonos contextuales:** musgo (disponibilidad/success), óxido (peligro/error), arcano (contenido mágico/rareza) y hueso (texto).

No usar el bronce brillante para: todos los iconos, todas las tarjetas, cada línea de borde, todos los títulos, todas las etiquetas y todos los hover a la vez. La escasez relativa del dorado le da valor.

### 05.5. Estados semánticos y tokens de contexto

| Estado | Señal recomendada | Texto visible obligatorio | Nunca asumir |
|---|---|---|---|
| Disponible, **verificado** | Musgo + etiqueta explícita | «Plazas disponibles», con fuente/fecha si procede | Que siga abierto sin fuente actual |
| Completo, **verificado** | Rojo óxido + etiqueta | «Campaña completa» | Que esté llena solo por estética de ejemplo |
| Próximo, **verificado** | Bronce apagado | «Próximamente» | Fecha que no se haya confirmado |
| Arcano / especial | Violeta ceniza | Etiqueta clara del tipo de contenido | Que `rareza` de juego sea estado de inscripción |
| Desconocido | Neutro | «Consultar plazas» / «Por confirmar» | Convertir desconocido en éxito |
| Error | Óxido + mensaje | Qué ha fallado y cómo recuperarse | Color como único significado |
| Correcto | Musgo + texto/ícono | Resultado real y siguiente paso | Mensaje de éxito sin acción ejecutada |
| Deshabilitado | Menor énfasis + motivo si necesario | Explicar limitación cuando proceda | Un componente invisible o ilegible |

### 05.6. Contraste y legibilidad

- **Objetivo de producción [RECOMENDACIÓN]:** WCAG 2.2 AA, incluyendo 4.5:1 para texto normal, 3:1 para texto grande y componentes visuales relevantes según criterio aplicable.
- La legibilidad se valida sobre **la imagen y el gradiente real**; una combinación que supera contraste en plano puede fallar sobre textura/ilustración.
- No usar opacidades muy bajas en textos que transmitan significado.
- Para metadata funcional, preferir los huesos `--bone-200`/`--bone-300` antes de color bronce oscuro.
- Estado `hover` no sustituye estado `focus-visible`.
- Comprobar botones primary/secondary/tertiary/danger en default, hover, active, focus, disabled y loading.
- La afirmación "contraste validado" requiere medición en los estados reales; no basta con la intención del CSS.

---

## 06. Material system: superficies medievales

### 06.1. Materialidad presente en CSS [IMPLEMENTADO V6]

El código define cinco recetas principales:

| Token | Composición base | Dónde tiene sentido | Evitar |
|---|---|---|---|
| `--material-leather` | gradiente cálido radial + vetas repetidas + base marrón casi negra | tarjetas de campañas, diálogos, paneles con jerarquía | piel de naranja evidente, textura repetida en toda la pantalla |
| `--material-parchment` | luces crema, bordes más oscuros y grano fino | citas narrativas, mapas, fragmentos de lore, fondos claros breves | formularios largos sobre pergamino claro |
| `--material-wood` | vetas verticales/diagonales tenues + marrones de madera | panel de taberna, contenedores evocadores, separadores | falsos botones de madera por defecto |
| `--material-iron` | reflejo bajo y base gris metal ennegrecido | áreas utilitarias, tablas densas o soporte técnico | cromados/plata brillante que rompan el tono |
| `--material-obsidian` | profundidad casi negra con matiz violeta | contenido arcano o modal especial | teñir toda la navegación de violeta |

El Atlas V3/V4 también explora **vitela quemada, basalto arcano y tintas**, pero no todos disponen de token independiente en `css/tokens.css`. No atribuir al archivo CSS tokens inexistentes. Para añadir una nueva receta, seguir el proceso de cambios y documentar nombre, función, contraste y coste de render.

### 06.2. Ejemplos de receta existentes [fuente: `css/tokens.css`]

```css
:root {
  --material-leather:
    radial-gradient(ellipse at 20% 0%, rgba(144,88,49,.17), transparent 64%),
    repeating-linear-gradient(72deg, transparent 0 17px,
      rgba(251,219,167,.016) 18px 19px),
    linear-gradient(160deg, #31241C, #1D1817 67%, #151416);

  --material-parchment:
    radial-gradient(ellipse at 15% 15%, rgba(255,249,210,.34), transparent 62%),
    radial-gradient(ellipse at 86% 89%, rgba(75,44,25,.21), transparent 52%),
    repeating-linear-gradient(5deg, transparent 0 11px,
      rgba(66,44,24,.015) 12px 13px),
    linear-gradient(132deg, #CCB88F, #9E8461 61%, #6C543E);
}
```

**No copiar estos CSS en componentes locales.** Aplicar tokens existentes en clases compartidas. Los fragmentos se reproducen para que una IA entienda la gramática visual.

### 06.3. Leyes de composición material

1. **Una superficie dominante por contenedor.** No mezclar cuero, obsidiana, madera y pergamino en capas superpuestas sin una intención narrativa.
2. **Materialidad subordinada al texto.** Si el gradiente compite con el contenido, reducirlo.
3. **Bordes como ensamblaje, no como jaulas.** Un panel puede tener un borde fino; no necesita borde externo, interno, doble línea y resplandor simultáneos.
4. **Contraste local:** una card puede ser ligeramente más cálida que el fondo, sin necesidad de otro dorado.
5. **Jerarquía de profundidad:** fondo → sección → tarjeta → modal. La elevación debe ser relativa y estable entre páginas.
6. **Polvo/grano:** la textura ambiental global se aplica con baja opacidad y sin penalizar lectura; revisar coste, GPU y pantallas pequeñas.
7. **Revelación del material:** usar gradiente y luz para hacer legibles grupos y acciones; no para crear cromados estilo videojuego gacha.
8. **Planos claros escasos:** el pergamino funciona mejor como excepción editorial, no como tema alternativo accidental.

### 06.4. Ornamentación

- Pequeñas líneas/bronces, marcas de esquina, filigrana controlada, separadores rituales y elementos asociados al mundo de Lichpol.
- Un ornamento debe aportar una de estas funciones: jerarquizar, dividir, situar en el universo, expresar estado o reforzar una transición narrativa.
- No cargar el HTML con SVGs puramente ornamentales que afecten accesibilidad; si son decorativos, tratarlos como tales (`aria-hidden`, etc.).
- No usar iconos de espada, calavera o runa por defecto en cada etiqueta.
- Evitar bordes morados de inspección alrededor de todos los elementos en el producto final; pertenecen, en su caso, al espacio de documentación y no a la experiencia pública.

---

## 07. Sistema tipográfico y microcopy

### 07.1. Familias aprobadas en el diseño

| Contexto | Familia del token | Fallbacks definidos | Uso |
|---|---|---|---|
| Display | `--font-title: 'Cinzel'` | Palatino Linotype, Book Antiqua, Georgia, serif | H1, H2, títulos de campañas/mundos, capítulos |
| UI | `--font-ui: 'Inter'` | Segoe UI, Arial, sans-serif | navegación, body, datos, CTA, forms, status |
| Editorial | `--font-story: 'Cormorant Garamond'` | Palatino Linotype, Georgia, serif | citas o narrativa extensa selectiva; no palabra suelta dentro del H1 |

El Atlas V4 carga las familias desde Google Fonts. El CSS modular V6 define la pila pero **no garantiza que Cinzel, Inter o Cormorant Garamond estén instaladas/cargadas offline**. Para exactitud en producción, resolver entrega/licencia de fuentes. No prometer pixel parity entre máquinas solo por tener los nombres en la pila.

### 07.2. Regla de unidad en titulares [MARCA FIJA]

- No mezclar Cinzel con Cormorant cursiva **dentro del mismo título** para destacar una palabra, como ocurrió en exploraciones previas.
- Si un fragmento es especial, puede cambiar su **color**, no improvisar peso, tracking, familia, estilo ni decoración.
- Las citas independientes sí pueden usar Cormorant.
- Evitar titulares permanentemente en mayúsculas si el ancho, la voz y la lectura no lo requieren. El logo `LICHPOL` es otra cosa.

### 07.3. Escala tipográfica fija y usos

La escala aprobada el 27-10-2026 se define una sola vez en `css/tokens.css`:

| Estilo | Token | Tamaño |
|---|---|---:|
| H1 | `--text-h1` | 62 px |
| H2 | `--text-h2` | 48 px |
| H3 | `--text-h3` | 40 px |
| H4 | `--text-h4` | 32 px |
| H5 | `--text-h5` | 26 px |
| H6 | `--text-h6` | 20 px |
| Body | `--text-body` | 16 px |
| Small | `--text-small` | 12 px |
| Botón (label en mayúsculas) | `--text-button` | 14 px |

**Nivel semántico y estilo visual:** por defecto, h1–h6 usan H1–H6. Un componente puede elegir un estilo menor de esta tabla si su función lo requiere, sin cambiar la semántica del encabezado ni usar otros tamaños. En `#campanas`, «Campañas» y «Aventuras» usan H5 en escritorio; los títulos de las seis tarjetas usan H6.

**Escalado responsive:** solo valores de la tabla, sin tipografía fluida con `vw` o `clamp()`. Escritorio (>900 px): escala base. Tablet (541–900 px): H1 48, H2 40, H3 32, H4 26, H5/H6 20 px. Móvil (≤540 px): H1 40, H2 32, H3 26, H4/H5 20, H6 16 px. Body y Small no cambian. H1 de hero en móvil: H4 (32).

- **Body, 16 px:** todo texto de lectura: párrafos, lead del hero, navegación, enlaces, meta y sinopsis de tarjetas, calendario, frases y estados, títulos del archivo, pie y texto del panel D20.
- **Small, 12 px:** pies de imagen, ayudas, marcas de tiempo y solo estas microetiquetas rastreadas en mayúsculas: `.eyebrow`, `.pill`, HOY/PRÓXIMA, numerales romanos del archivo, «Hora de Madrid» y encabezados de columnas del pie. No aplicar a otros textos. `.brand small` conserva su tamaño de logotipo actual como única excepción.
- **Botón, 14 px:** labels de `.btn` en mayúsculas y con tracking, incluidos `.btn-sm` y `.header-cta`.
- Los numerales de resultado grandes usan H1. Encabezados: interlineado aproximado 1.1–1.2; texto: 1.6–1.7.
- Los iconos con etiqueta miden `1em` y usan un espacio de `.3125em`; el icono hereda el tamaño de la etiqueta, también en botones.

### 07.4. Reglas tipográficas de producción [REQUISITO]

- Metadatos funcionales: preferir **13 px**; 12 px se reserva para etiquetas/eyebrows cortos y suficientemente contrastados.
- Texto secundario: **14 px** como referencia cuando se lee varias veces.
- Texto continuo: **16 px** por defecto; line-height 1.55-1.75 según ancho.
- Badges: **12 px recomendado**, `font-weight: 500`; si el resultado se ve fino sobre textura, mejorar contraste antes de subir el peso sin consenso.
- No usar mayúsculas en descripciones largas o textos de párrafo.
- `letter-spacing` amplio solo en etiquetas breves, no en bodies.
- No reducir una etiqueta a 9 px para que quepa donde un diseño mal resuelto necesita más espacio.
- Si el contenido de una card no cabe, ajustar composición o copy; no comprimir tipografía hasta perder legibilidad.
- No depender de una sola etiqueta por color; el texto expresa estado.

### 07.5. Anti-widows, anti-orphans y cortes de frases

**Requisito editorial del proyecto:**

1. Ningún titular termina con una **sola palabra viuda** en la última línea.
2. Tras un punto, no dejar 1-2 palabras de la siguiente frase colgando al final de una línea y completar la oración en la siguiente. Reajustar la frase completa o retocar copy/composición.
3. Evitar ruptura visual innecesaria de unidades de significado: números con unidad, nombres compuestos, tratamiento + nombre, CTA con palabra aislada.
4. Proteger párrafos largos de una última línea absurdamente corta cuando sea viable; no introducir espacios duros masivos que produzcan overflow.
5. **No corregir todos los problemas con `<br>` fijos.** Si existe un salto editorial intencional, validar que no rompe en móvil.

**Herramientas CSS que ayudan pero NO garantizan cumplimiento:**

```css
h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
```

El `js/site.js` actual intenta proteger pares finales de palabras en `h1,h2,h3` con un espacio no separable cuando la longitud lo permite. Es una **defensa parcial**, no un motor infalible de composición tipográfica; no ejecuta un algoritmo semántico para todos los párrafos. Hacer inspección real en `320 / 390 / 768 / 1024 / 1440 px` con contenido final, localización y fuentes efectivamente cargadas.

### 07.6. Voz narrativa de marca

**Tono:** cercano, sugerente, con sensibilidad rolera y algo de misterio. No escritura corporativa. No una simulación excesiva de castellano arcaico. No reducir la comunidad a un culto de heroicidad artificial.

**Fórmula habitual:** imagen del mundo + información práctica + invitación clara. Ejemplo de construcción, **no campaña real**:

> «Al otro lado de la puerta empieza una historia. Consulta los mundos disponibles y pregunta en la comunidad por la próxima mesa.»

Evitar fórmulas genéricas intercambiables como «Desata tu destino legendario» o «Explora un universo infinito de posibilidades» si no aportan información. Los juegos de rol funcionan por decisiones, personas y situaciones; escribir sobre eso.

### 07.7. Vocabulario consistente

| Preferir | Evitar sin motivo |
|---|---|
| Campaña / partida / sesión según contexto real | Quest como etiqueta universal sin equivalencia |
| Comunidad | Guild en inglés si la comunidad no lo usa |
| Consultar plazas | «Inscribirse» si no existe inscripción real |
| Dungeon Master / director de juego según contexto | «Administrador del reino» en formularios ordinarios |
| Sistema de rol | Género de videojuego |
| Crónica, mundo, aventura | Lore como palabra repetida en cada apartado |
| Próximamente **cuando esté confirmado** | Usarlo como status estético |
| El Dungeon Master | «Maestro supremo de la oscuridad» como biografía |

---

## 08. Layout, composición y responsive

### 08.1. Geometría fundamental

**[IMPLEMENTADO V6]** `--container: 1200px`, `--reading: 740px`, `--gutter: clamp(20px, 4vw, 48px)`.

```css
.container {
  width: min(var(--container), calc(100% - 2 * var(--gutter)));
  margin-inline: auto;
}
.reading { max-width: var(--reading); }
```

| Viewport | Regla | Resultado |
|---|---|---|
| 1440 px | contenedor `max-width:1200px` centrado | 120 px por margen lateral |
| Más ancho que 1440 px | contenedor máximo constante | márgenes crecen, hero puede ser full bleed |
| Entre 1200 y 1440 | márgenes fluidos sujetos a clamp | contenido no se pega a bordes |
| Tablet | composición reduce columnas | revisar densidad y focos |
| Móvil | gutter mínimo 20 px | no forzar tres columnas de cards |

### 08.2. Grid de referencia

- Desktop: **12 columnas**, gutter de **24 px** en la demostración de foundations. [IMPLEMENTADO para `.grid-demo`; el layout real utiliza también CSS Grid semántico por patrón.]
- Tablet: **8 columnas como guía [RECOMENDACIÓN]**; el código actual no exige un grid 8-col global.
- Mobile: **4 columnas como guía [RECOMENDACIÓN]**, con recomposición real de componentes.
- Anchura editorial: **740 px token**; `760px` fue referencia de exploraciones anteriores, **no** modificar a escondidas.
- Hero/fondos atmosféricos pueden ser full bleed; contenido estructural sigue dentro de la retícula.
- Las cards no deben tener alturas rígidas que corten copy; organizar pie/CTA con flex o grid interno.

### 08.3. Breakpoints existentes en `css/site.css`

| Umbral | Función observada |
|---|---|
| `max-width: 1200px` | Ajustes de CTA/header |
| `max-width: 1050px` | Densidad de navegación y cards |
| `max-width: 1040px` | Refinamientos de nav |
| `max-width: 900px` | Columnas y patrones de página, scorecard y atlas |
| `max-width: 800px` | Menú móvil y reorganización principal |
| `max-width: 540px` | Tipografía, botones, columnas y densidad compacta |
| `max-width: 360px` | Ajustes finos del hero |

**No son un sistema de dispositivos rígidos:** son umbrales de contenido acumulados en el CSS existente. Si una nueva página requiere corte intermedio, explicar por qué; preferir el menor número de reglas.

### 08.4. Composición por viewport [REQUISITO]

**Desktop amplio (`≥1200px`):**

- Alternar un hero cinematográfico con secciones editoriales y rejillas de tarjetas.
- Fotografía dominante + copy con ancho limitado; reservar espacio negativo.
- Campaign grid de hasta 3 columnas; dossier con columna de contenido y panel de información si está justificado.
- Evitar un muro monótono de contenedores de igual tamaño y altura.

**Desktop/tablet (`800-1199px`):**

- Ajustar gaps y navegación antes de reducir letra.
- Reordenar imagen y copy para no sacrificar lectura.
- Priorizar uno o dos objetivos de acción por sección.

**Tablet compacto (`541-799px`):**

- Header se transforma según la breakpoint efectiva.
- Tarjetas pasan a 2 o 1 columna según ancho mínimo de contenido.
- Panel sticky debe perder su fijación si invade el viewport.

**Móvil (`≤540px`):**

- Una columna narrativa; orden de lectura inequívoco.
- Hero menos alto si el contenido lo requiere, fondo recortado con nuevo `object-position`.
- CTAs principales apilados cuando no caben, no texto apretado dentro.
- Formularios sin controles truncados y sin menús desplegables fuera del área visible.
- Elementos decorativos subordinados a contenido, no por delante de él.
- Sliders/data table o patterns densos: reemplazar por layout móvil específico o scroll intencional identificado.

### 08.5. Spacing tokens existentes

| Token | Valor | Usos frecuentes |
|---|---:|---|
| `--step-1` | 4 px | microajuste icono/texto |
| `--step-2` | 8 px | separaciones interiores |
| `--step-3` | 12 px | controles, metadata |
| `--step-4` | 16 px | cards compactas |
| `--step-5` | 20 px | gutters/rejillas |
| `--step-6` | 24 px | cards y columnas |
| `--step-8` | 32 px | contenido y grupos |
| `--step-10` | 40 px | secciones internas |
| `--step-12` | 48 px | respiración secciones |
| `--step-16` | 64 px | separación de módulos |
| `--step-24` | 96 px | ritmo editorial largo |

### 08.6. Radios, bordes y profundidad

- Radios existentes: `--radius-xs:2px`, `--radius-sm:4px`, `--radius-md:8px`.
- Controles y tarjetas usan esquinas casi rectas. Evitar el aspecto de dashboard de SaaS con esquinas de 18-24 px sin función.
- Bordes: `1px` en tono hierro/bronce, variando intensidad por estructura, no repetidos por defecto.
- Profundidad de card: `--card-shadow: 0 24px 52px rgba(0,0,0,.2)` disponible. Aplicarla en interacciones o elevaciones necesarias, no a cada pieza.
- No introducir neumorfismo, glassmorphism brillante, sombras azules ni blur decorativo global.

### 08.7. Reglas para organizar una nueva página

1. Antes del wireframe, definir una acción principal y una secundaria.
2. Distribuir la historia en módulos con función: introducción, prueba, decisión, acción, apoyo.
3. Contrastar la repetición de patrones (evitar tres filas sucesivas de tres cards iguales).
4. Dar protagonismo a una ilustración **si aporta contexto**, no porque una página "necesite una imagen".
5. Diseñar móvil al mismo tiempo que desktop, no al final.
6. Revisar densidad de metadatos y longitud de títulos reales/posibles.
7. Usar zonas de lectura en lugar de estirar párrafos a 1200 px.
8. Mantener navegación, CTA, header y footer coherentes con V6.

---
## 09. Component architecture: reglas que gobiernan toda la biblioteca

### 09.1. Capas y madurez

El sistema distingue **cuatro capas**:

1. **Primitive tokens**: colores, tamaños, radios, tiempo, recetas materiales, tipografías (`css/tokens.css`).
2. **Semantic tokens**: canvas, superficie, texto, acción, positivo, negativo, focus.
3. **UI primitives**: button, badge, input, select, tabs, dialog, etc. Algunas existen como CSS/JS compartido de V6; otras solo como demo de Atlas V4.
4. **Product patterns**: Quest Board, Campaign Dossier, Community Gateway y Dungeon Master Dossier, aplicados a páginas reales.

**Estado real de madurez:** `COMPONENTS-V6.md` enumera 64 componentes del Atlas; `COMPONENT-CONTRACTS.md` advierte que la mayoría no tienen API aislada ni validación exhaustiva de producción. Esta distinción debe mantenerse al generar código: **no afirmar que existe `<LichpolCalendar />` o una API React si el proyecto solo demuestra HTML/JS sin framework**.

### 09.2. Contrato base obligatorio para cualquier componente nuevo

Cada componente que se considere reutilizable debe documentar:

| Campo | Mínimo requerido |
|---|---|
| Nombre | Nombre humano y convención CSS/JS |
| Propósito | Qué problema resuelve |
| Regla de elección | Cuándo usar y cuándo no |
| Anatomía | Trigger, etiqueta, valor, contenido, ayuda, estados, iconos |
| Propiedades | Tamaño, variante, disabled, readonly, required, value y dependencias pertinentes |
| Estados | Default, hover, focus, active/open, selected, disabled, error, success, loading si aplican |
| Teclado | Patrón ARIA nativo/apropiado, Escape, flechas, Tab, Enter/Espacio donde proceda |
| Semántica | HTML nativo preferente y roles/atributos cuando sean necesarios |
| Responsive | Ancho mínimo, wrap, scroll, overlay, tratamiento móvil |
| Estilo | Tokens compartidos, iconografía, chevron, scrollbar, z-index |
| Feedback | Acción real, confirmación, recuperación ante error |
| Tests | Función, visual, teclado, zoom, reduced motion, screen reader cuando se publique |
| Estado de madurez | Reference, Prototype, Validated, Production; evidencia |

### 09.3. Estados generales

```text
Rest → Hover → Focus-visible → Pressed/Active
                 ↘ Selected / Open → Closed
Disabled (no recibe acción)
Busy / Loading (si operación asíncrona real)
Error → Recovery
Success (solo tras confirmación real)
Empty / No results (para datos/listados)
```

- No añadir loading decorativo a una acción instantánea.
- No inventar éxito ni simular backend de inscripción. Un demo debe declararse demo.
- `disabled` visual necesita estado funcional real, no solo opacity.
- `aria-*` refleja **el estado actual**, no una idea de estado.
- El tab order sigue el orden lógico del DOM.
- No bloquear Escape o Tab dentro de patrones que no son modales.

### 09.4. Disciplina de implementación

- Preferir `<button>` para acciones, `<a href>` para navegación, `<label>` asociado a control de formulario, `<fieldset><legend>` para grupos.
- Preferir semántica nativa antes de añadir roles. No usar `role="button"` en un `div` porque es más fácil de estilizar.
- Separar datos, presentación y estado donde el código lo permita sin inflar arquitectura.
- Evitar nuevas dependencias por un solo icono, animación o select si existe patrón probado suficiente.
- Conservar orden visual y programático en responsive.
- Usar `hidden`, `aria-expanded`, `aria-selected`, `aria-live` y `aria-invalid` cuando corresponda, manteniéndolos sincronizados.
- Restaurar foco al cierre de overlays modales/menús donde la interacción lo exige.
- Evitar listeners globales multiplicados al montar varios componentes.
- No copiar grandes bloques de CSS con overrides de versiones anteriores: consolidar tokens o selector existente con intervención mínima y revisión del diff.

---

## 10. Actions & states: botones, links y controles

### 10.1. Button foundation [IMPLEMENTADO V6]

```css
:root {
  --button-height: 48px;
  --control-height: 48px;
  --button-padding: 20px;
  --quick: 160ms;
  --normal: 240ms;
}

.btn {
  min-height: var(--button-height);
  padding: 0 var(--button-padding);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font: 700 12px/1.2 var(--font-ui);
  text-transform: uppercase;
  letter-spacing: .07em;
}
```

El fragmento resume propiedades reales, pero **no sustituye `site.css`**, que incorpora transiciones y múltiples clases.

### 10.2. Matriz de intención

| Variante | Uso | Default | Hover | Pressed | Focus |
|---|---|---|---|---|---|
| **Primary** `.btn-primary` | acción principal de pantalla/sección | fondo `--brass-400`, texto oscuro | bronce más luminoso (`#F1CE90` en V6) + sombra controlada | pequeña reducción de elevación, feedback | outline claro y visible |
| **Secondary** `.btn-secondary` | alternativa comparable | fondo casi negro, borde material y texto hueso | superficie más cálida, borde más claro | feedback físico discreto | outline accesible |
| **Tertiary** `.btn-tertiary` | acción de bajo énfasis, deshacer, volver | **sin borde**, fondo transparente, texto claro | velo cálido + subrayado/borde inferior *visual inset*, **sin crear border CSS** | menos movimiento | outline accesible; sigue sin border |
| **Danger** `.btn-danger` | borrar, abandonar, acción irreversible | rojo vino apagado y borde óxido | color rojo más perceptible, texto más claro, borde reforzado | contraste sostenido | foco claro sin cambiar semántica |
| **Icon button** `.btn-icon` | acción breve con nombre accesible | hit area estable, icono coherente | color y superficie perceptibles | feedback | etiqueta accesible si solo icono |

**Restricción formal:** tertiary tiene `border: 0 !important` en V6. No reintroducir borde para "mejorar consistencia". Su hover debe ser inequívoco por **fondo + texto + sombra inset** u otro recurso compatible.

### 10.3. Dimensiones y estados

- Botón estándar: altura `48px` desktop en V6, `46px` en breakpoint móvil más estrecho.
- Small: `38px` implementado en sitio; solo para contexto denso y no como CTA principal.
- Icon button: `44 × 44px` en V6. Cualquier objetivo táctil menor necesita justificación y verificación.
- Gap interno del botón: `10px` en sitio.
- Hover actual usa `translateY(-2px)` con respeto a reduced motion. No hacer que el botón "flote" de forma continua.
- Active restablece posición; no introducir efectos de presionar que cambien el layout circundante.
- Disabled: `opacity` reducido y deshabilitación funcional; si el motivo importa, mostrar explicación fuera del control o texto de ayuda.
- Loading: solo en acciones con operación real; bloquear duplicación y anunciar estado cuando proceda.

### 10.4. Reglas de jerarquía de CTA

- **Máximo una acción principal clara por módulo de decisión**, salvo un caso real de dos rutas equivalentes que lo justifique.
- En hero: primera acción hacia campañas; segunda hacia comunidad, u orden basado en contexto real.
- En card: CTA directo a detalle/consulta, no acumulación de tres botones.
- Eliminar CTA redundante si la card completa funciona como enlace semántico único.
- Evitar botones terciarios estilizados como vínculos deshabilitados.
- No expresar 'Sin plazas' como disabled salvo que el dato sea verificable; usar «Consultar plazas» cuando no se sabe.
- Evitar usar danger para navegación normal o estado de combate narrativo.

### 10.5. Vínculos y acción externa

- Los enlaces de texto deben tener affordance y `:focus-visible`; el color dorado por sí solo puede no ser suficiente para reconocerlos dentro de un párrafo.
- Los vínculos a recursos oficiales requieren destino real y seguro; si se abre nueva pestaña, incluir atributos apropiados.
- Distinguir «Ir a Lichpol.es» de «Apuntarme ahora»; no usar el segundo sin proceso de inscripción real.

---

## 11. Form controls: sistema coherente y parches V6

### 11.1. Objetivo de la familia

Inputs y formularios son infraestructura de uso, no un lugar para dramatizar fantasía. Han de sentirse **construidos con el mismo hierro, cuero y bronce** de la interfaz, no como controles blancos importados del navegador; simultáneamente deben conservar semántica, teclado, valor, lectura y feedback claros.

### 11.2. Anatomía de un field

```text
Campo
 ├── Label persistente (asociada al control)
 ├── Control (input / select / textarea / checkbox / grupo)
 │    ├── Valor o placeholder
 │    ├── Icono opcional, solo si tiene utilidad
 │    └── Affordance (chevron, clear, reveal, etc.)
 ├── Help text / descripción (opcional)
 └── Error / success / count (solo si corresponde)
```

- No usar placeholder como único label.
- No usar colores de error/success sin mensaje.
- Etiqueta muy pequeña no se vuelve legible solo por estar en mayúsculas.
- El feedback se asocia con `aria-describedby`, `aria-invalid` u otros mecanismos apropiados.

### 11.3. Select y Native Select [DECISIÓN CORREGIDA V6]

**Problema histórico:** un `select` parecía nativo, con desplegable blanco ajeno al theme, y el chevron no coincidía con el otro control. Esto ya fue parcheado dentro de V6, no es otra versión.

**Contratos visuales cerrados:**

1. `Select` y `Native Select` usan **el mismo chevron**: forma, grosor de trazo, tamaño, color, padding, alineación y giro visual al abrirse.
2. El icono aparece en un área reservada. El texto no debe invadirlo, ni viceversa.
3. Control visible con altura de referencia **48 px**.
4. Trigger oscuro y claro al enfocarse; panel emergente oscuro de cuero/hierro y borde bronce controlado.
5. Opción seleccionada diferenciable sin depender solo de color.
6. Scrollbar del menú larga: **estrecha y oscura, thumb bronce**, con fallback cross-browser.
7. Menú nunca sale del viewport en móvil; si queda poco espacio vertical, reposicionar, limitar altura o usar tratamiento móvil equivalente.
8. Teclado: al menos flechas, Home/End, Enter/Espacio, Escape y Tab según patrón elegido.
9. Foco vuelve al trigger cuando se cierra mediante selección/Escape cuando corresponda.
10. Valor seleccionado persiste en el formulario real; una UI bonita **no** debe quedarse desconectada del `<select>`/input con `name`.

**Implementación actual del sitio:** `.arcane-select` con trigger, `role=listbox`, `role=option`, input oculto y `js/site.js`. **Atlas:** `Native Select` tiene una capa visual tematizada que sincroniza un `<select>` nativo oculto/fallback. Para producción se debe revisar la equivalencia semántica con lectores de pantalla, especialmente si se sustituye nativo por custom.

**Requisito especial de chevron:** no inventar un icono nuevo en el Select; **reutilizar el mismo snippet, SVG o clase compartida de Native Select**. La identidad de ambos debe sobrevivir al estado open, no solo al default.

### 11.4. Dropdown y scrollbars

- Panel del select V6: max-height de referencia `260px`, scrollbar vertical cuando es necesario.
- Thumb de scrollbar en bronce desaturado; track casi negro; grosor fino.
- Soporte visual en Firefox (`scrollbar-width` y `scrollbar-color`) y WebKit/Blink (`::-webkit-scrollbar*`) cuando aplique.
- No eliminar barra si eso oculta que hay contenido desplazable.
- En la galería, la misma gramática de scrollbar corresponde a `Select`, `Combobox`, `Message Scroller`, `Scroll Area` y listas equivalentes.
- Evitar scrollbars dobles por apilar un contenedor con `overflow:auto` dentro de otro.
- La barra debe conservar hit area usable, no convertirse en una línea ornamental de 1 px imposible de arrastrar.

### 11.5. Checkbox, radio, switch

**Checkbox:** cuadrado, contraste marfil/bronce; `checked` reconocible por marca, no solo por relleno; el check no roza el borde; labels clicables; estados focus/disabled/errors.

**Radio:** control circular coherente, punto central o check semántico según patrón; un solo valor por grupo; `fieldset`/`legend` donde aplique; foco visible.

**Switch:** alternancia inmediata para preferencias reales; usar `<button role="switch" aria-checked>` o control nativo equivalente bien implementado. No usar switch para activar una acción irreversible sin confirmación.

**No mezclar familias:** evitar checkbox nativo blanco junto a un radio dorado propio y un switch iOS genérico. Todos deben pertenecer al mismo nivel de intensidad visual.

### 11.6. Date Picker

**Corrección V6:** el popup blanco nativo de calendario se sustituyó en el Atlas por un calendario oscuro tematizado; el valor se sincroniza con el input de fecha. Se verificaron interacciones aisladas con ratón y teclado, pero no equivalen a una auditoría AT completa.

Contrato mínimo para nuevas implementaciones:

- Activación de calendario desde control claramente etiquetado.
- Mes/año actual y navegación por meses claramente discernibles.
- Día seleccionado visible, hoy identificado de forma no ambigua si se muestra.
- Fecha almacenada en formato estable como ISO en la capa de datos cuando proceda; presentar `dd/mm/aaaa` en interfaz española.
- Teclas: flechas, PageUp/PageDown, Home/End, Escape y Enter/Espacio según patrón; no sobrecargar el teclado con comportamiento inesperado.
- Limitar modal/popup al viewport y soportar zoom al 200-400%.
- No anunciar disponibilidad de sesiones al elegir fecha si esa fuente de datos no existe.
- Si el caso exige compatibilidad nativa, se puede usar native date **como decisión consciente**, pero no mostrar un popup blanco incongruente mientras se afirma que el sistema visual está cerrado.

### 11.7. Combobox

- Distinguir el combobox editable del select sin entrada editable.
- Si admite búsqueda: reflejar query, resultados filtrados, vacío y selección en un estado coherente.
- Asegurar relación accesible con lista y opción activa; no mezclar navegación de caret del input con flechas sin control.
- Mostrar un scrollbar coherente si hay más opciones de las visibles.
- No desplazar la opción seleccionada detrás de un thumb/barra.

### 11.8. Textarea, input y variaciones

- Textarea de altura inicial coherente, capacidad de crecimiento/scroll y contador si existe límite real.
- Input password con botón de revelar accesible (estado visible, texto alternativo y foco preservado).
- Input search con affordance y botón clear si mejora uso, no como icono decorativo sin acción.
- Input OTP solo donde exista un flujo de código verdadero; no fabricarlo en el portal como requisito.
- Labels persistentes y ejemplos en español.
- Estados de form demo declarados como simulaciones, no persistencia real.
- Evitar inputs oscuros con texto tan tenue que parezca placeholder cuando contiene valor.

### 11.9. Formularios de captación de datos [PENDIENTE]

El prototipo no ofrece un servicio real de inscripción ni backend de formularios. Hasta definirlo, no crear formularios que recojan correo/nombre de usuarios y muestren “registrado” sin persistencia, privacidad, tratamiento de errores y consentimiento pertinentes. Es legítimo ofrecer un **enlace a la fuente oficial** o un formulario visual marcado claramente como demo para el Atlas.

---

## 12. Feedback, overlays y navegación de contenido

### 12.1. Overlays con prioridad de foco

| Patrón | Regla de interacción | Uso Lichpol |
|---|---|---|
| Dialog | nombre accesible, foco modal, Escape, retorno al disparador | información previa a visitar el enlace oficial |
| Alert Dialog | confirmación irreversible o riesgosa; opción segura por defecto | eliminar configuración real, no avisos narrativos |
| Drawer/Sheet | apertura/cierre claros, overflow interno correcto, no perder contexto | filtros o detalle contextual en móvil |
| Popover | información/acciones contextuales ligeras, Escape/click-away | pequeñas opciones de campaña |
| Tooltip | información no esencial en hover **y foco** | explicación de icono o abreviatura |
| Hover Card | contenido ampliado, accesible sin depender exclusivamente de hover | vista previa de mundo o personaje |
| Dropdown/Context Menu | acciones agrupadas con teclado y alternativa visible | comandos sobre un item editable, no decoración |

- Usar z-index con escala gobernada; evitar paneles que queden por detrás del header sticky.
- Backdrop de dialog consistente, evitando blanco por defecto.
- No cerrar automáticamente una confirmación si la persona todavía necesita leer la respuesta.
- Un tooltip no debe albergar el único acceso a una tarea crítica.

### 12.2. Mensajes y estados

**Alert:** información importante dentro del flujo; no reemplazar headings críticos.

**Toast:** confirmación de una acción real. En V6 la notificación de demo **no tiene timeout automático** y se puede cerrar manualmente; no suponer que todos los toast desaparecen a los 3 s.

**Empty:** mensaje de no resultados con explicación y salida (quitar filtro, volver a catálogo, consultar comunidad); nunca solo una caja vacía.

**Skeleton:** solo si la carga asíncrona existe; simular jerarquía y reducir saltos de layout.

**Progress:** valor con contexto y unidad, no barra sin etiqueta. Si no existe porcentaje real, usar estado indeterminado o texto honesto.

**Spinner:** resuelve espera breve y real, no decoración constante.

### 12.3. Navegación

- Tabs: `role=tablist` y relación con paneles; flechas, Home/End según patrón; paneles inactivos ocultos. [IMPLEMENTADO como patrón V6]
- Pagination: etiquetar página actual y prev/next, evitar `href="#"` sin destino.
- Breadcrumb: jerarquía real de páginas. No inventar cinco niveles para parecer aventura.
- Menubar: solo para comandos tipo aplicación; no convertir un menú de navegación estándar en menubar ARIA sin justificación.
- Sidebar: contenido denso de sistema/documentación, con comportamiento adaptado a móvil. No exponer 64 entradas en navegación principal del sitio público.
- Command: búsqueda/comandos cuando la complejidad lo necesite. No añadir Cmd+K vacío como señal de modernidad.
- Carousel: explícito, controlable, sin autoplay por defecto; contenido legible sin animación.

### 12.4. Scroll y densidad

- `Scroll Area` y `Message Scroller`: scrollbar oscura y bronce coherente; no barra blanca como en la versión previa.
- Mostrar sombra de continuidad o affordance adicional si el contenido oculto no es evidente.
- Scroll interno solo cuando la tarea lo necesita; una página editorial debe fluir por scroll de página normal.
- Sticky panel solo cuando cabe; en pantallas cortas o móviles, convertir a bloque normal.

---
## 13. Atlas completo: inventario 64/64 y contrato de uso

**Fuente:** `componentes.html`, `atlas-v4.html` y `docs/COMPONENTS-V6.md`. La lista preserva los **64 nombres existentes**, organizados exactamente en las seis familias del sistema. La tercera columna prescribe qué debe cumplir una **nueva implementación de producción**; no indica que el ejemplo del Atlas ya supere todas esas pruebas.

**Estados de madurez permitidos:** `Reference` = demo; `Prototype` = patrón implementado pero no certificado; `Validated` = pruebas relevantes con evidencia; `Production` = cobertura completa de requisitos, accesibilidad y rendimiento. No elevar el estado por apreciación visual.

### 13.1. Disclosure & overlays (11)

| Componente | Función y criterio de elección | Contrato para implementación nueva | Aplicación Lichpol |
|---|---|---|---|
| [`Accordion`](componentes.html#component-accordion) | Revelar respuestas o bloques de ayuda sin saturar la página. | Preferir details/summary; soporte teclado, aria-expanded cuando aplique, foco estable, apertura/cierre legibles. | FAQ de comunidad, preparativos o normas. |
| [`Collapsible`](componentes.html#component-collapsible) | Mostrar un bloque secundario que puede contraerse. | Botón con estado; contenido permanece accesible; no esconder la única acción importante. | Detalles optativos del lore. |
| [`Dialog`](componentes.html#component-dialog) | Interrumpir brevemente el flujo para una acción o explicación importante. | Nombre accesible; bloqueo modal cuando corresponde; Escape, backdrop, foco inicial/retorno, scroll lock. | Antes de salir a web oficial. |
| [`Alert Dialog`](componentes.html#component-alert-dialog) | Solicitar confirmación antes de consecuencias reales. | Acción segura visualmente prioritaria; describir impacto; error y recuperación; no disparar si solo hay navegación. | Eliminar un ajuste persistente, si existe. |
| [`Drawer`](componentes.html#component-drawer) | Presentar contexto o acciones lateralmente. | Backdrop y Escape; foco y scroll; width adaptable; no cubrir CTA crítico sin alternativa. | Filtros amplios en escritorio/tablet. |
| [`Sheet`](componentes.html#component-sheet) | Panel contextual desde un borde en espacio limitado. | Área táctil accesible; contenido scrollable; foco gestionado; cerrar visible; viewport seguro. | Acciones de filtros en móvil. |
| [`Popover`](componentes.html#component-popover) | Mostrar acciones/información breve vinculada a un trigger. | Trigger abierto/cerrado; click-away, Escape, colisión de viewport, orden de tabulación. | Explicación de sistema en cards. |
| [`Tooltip`](componentes.html#component-tooltip) | Aclaración corta de un control. | Disponible con foco además de hover; contenido no esencial; no atrapar foco. | Ayuda sobre iconos. |
| [`Hover Card`](componentes.html#component-hover-card) | Previsualización contextual más rica que un tooltip. | Soportar touch/teclado; retrasos razonables; no ocultar acciones críticas allí dentro. | Resumen de personaje o mundo. |
| [`Dropdown Menu`](componentes.html#component-dropdown-menu) | Agrupar acciones relacionadas. | Roles/teclas coherentes; selección, disabled, Escape, retorno a trigger. | Opciones de contenido editable. |
| [`Context Menu`](componentes.html#component-context-menu) | Acciones secundarias accesibles también sin clic derecho. | Ruta alternativa visible y soporte teclado/touch; no esconder acción esencial. | Gestión de notas en herramienta futura. |


### 13.2. Navigation & discovery (8)

| Componente | Función y criterio de elección | Contrato para implementación nueva | Aplicación Lichpol |
|---|---|---|---|
| [`Breadcrumb`](componentes.html#component-breadcrumb) | Mostrar ubicación en arquitectura de varias profundidades. | nav aria-label; enlace a ancestros; última ubicación identificada; colapso en móvil. | Inicio > Campañas > Kuroto. |
| [`Navigation Menu`](componentes.html#component-navigation-menu) | Acceso a destinos de producto. | Semántica nav y enlaces reales; current-page; menú móvil operable. | Header público del sitio. |
| [`Menubar`](componentes.html#component-menubar) | Comandos en interfaz tipo aplicación, no navegación web genérica. | Arrow navigation, roving focus, Escape; usar solo si necesidad comprobada. | Herramienta editorial interna eventual. |
| [`Sidebar`](componentes.html#component-sidebar) | Exploración secundaria/índice persistente. | Selected, colapso móvil, ancho útil, scroll propio y focus. | Design System / índice de secciones. |
| [`Tabs`](componentes.html#component-tabs) | Cambiar paneles relacionados sin recargar página. | aria-selected, aria-controls, focus con flechas/Home/End, paneles no activos ocultos. | Reglas/requisitos/capitulos de dossier. |
| [`Pagination`](componentes.html#component-pagination) | Navegar conjuntos de resultados reales. | Página actual legible, enlaces/acciones reales, prev/next disabled apropiados. | Archivo de crónicas, si hay datos. |
| [`Command`](componentes.html#component-command) | Encontrar rápidamente funciones cuando la navegación crezca. | Búsqueda, resultados, empty, teclado, Escape, foco, accesible. | Búsqueda global futura si existe demanda. |
| [`Carousel`](componentes.html#component-carousel) | Navegar medios o colecciones horizontalmente. | Prev/next, posición anunciada, sin autoplay forzado; swipe complementario. | Galería oficial de escenarios. |


### 13.3. Inputs & forms (16)

| Componente | Función y criterio de elección | Contrato para implementación nueva | Aplicación Lichpol |
|---|---|---|---|
| [`Field`](componentes.html#component-field) | Componer etiqueta, control, ayuda y feedback. | label-for, required, aria-describedby, error y disabled; espacio consistente. | Consultas/formularios reales. |
| [`Label`](componentes.html#component-label) | Identificar inequívocamente un control. | Asociación programática; no reemplazar por placeholder. | Todos los inputs. |
| [`Input`](componentes.html#component-input) | Introducir texto simple. | Focus contrastado, valor y placeholder distintos, readonly/disabled/error. | Buscar campañas, nombre solo si se capta legalmente. |
| [`Input Group`](componentes.html#component-input-group) | Unir control y acción o prefijo útil. | Tab ordenado, botones etiquetados, iconos no intrusivos. | Búsqueda con botón clear. |
| [`Input OTP`](componentes.html#component-input-otp) | Introducir código temporal cuando exista autenticación real. | Autofill/paste, grouping, focus, error, no auto-submit sorpresivo. | Solo autenticación futura verificada. |
| [`Textarea`](componentes.html#component-textarea) | Texto de varias líneas. | Resize correcto, label, error, contador si hay límite real, altura cómoda. | Propuesta de colaboración. |
| [`Checkbox`](componentes.html#component-checkbox) | Seleccionar alternativas independientes. | Input/label real, checked indiscutible, foco, casilla temática sin clipping. | Aceptar normas; preferencias. |
| [`Radio Group`](componentes.html#component-radio-group) | Elegir una sola alternativa. | fieldset/legend, name compartido, selección única y keyboard. | Online/presencial si la opción es real. |
| [`Switch`](componentes.html#component-switch) | Cambiar una preferencia inmediata y reversible. | Estado checked anunciado, feedback visible, no usar para irreversible. | Reducir motion en playground. |
| [`Slider`](componentes.html#component-slider) | Modificar valor continuo. | Valor/min/max, labels, teclado, track contrastado, feedback. | Intensidad del motion de demo, si se justifica. |
| [`Select`](componentes.html#component-select) | Elegir una opción en dropdown no editable. | Mismo chevron que Native Select; listbox/keyboard, scroll estilizado, valor en formulario. | Clase preferida en demo. |
| [`Native Select`](componentes.html#component-native-select) | Seleccionar con semántica nativa o con capa visual sincronizada. | Chevron compartido, ocultación accesible/fallback, no popup blanco temáticamente aislado. | Sistema de rol en demo. |
| [`Combobox`](componentes.html#component-combobox) | Buscar y seleccionar entre opciones. | Campo editable, filtrado, active descendant/focus, empty results y scrollbar temática. | Buscar clase o campaña. |
| [`Calendar`](componentes.html#component-calendar) | Elegir o explorar fechas. | Días y mes etiquetados, teclado, hoy/selección, límites, localización. | Calendario real de eventos cuando exista fuente. |
| [`Date Picker`](componentes.html#component-date-picker) | Vincular calendario a input de fecha. | Popup del theme, formato visible ES, valor técnico estable, Escape, focus y sincronización. | Fecha preferida de demo; nunca inventar sesiones. |
| [`Questionnaire`](componentes.html#component-questionnaire) | Guiar selección por pasos o preguntas. | Progreso, invalid states, volver sin perder datos, revisión final. | Orientación de jugador nuevo, si se implementa. |


### 13.4. Actions & feedback (10)

| Componente | Función y criterio de elección | Contrato para implementación nueva | Aplicación Lichpol |
|---|---|---|---|
| [`Button`](componentes.html#component-button) | Iniciar una acción única. | Variantes y estados; tertiary 0px border; no loading fake; focus visible. | CTAs primarios y secundarios. |
| [`Button Group`](componentes.html#component-button-group) | Agrupar acciones cercanas. | Jerarquía clara, separación táctil, wrap móvil, no misma prominencia para todo. | Controles de filtros. |
| [`Toggle`](componentes.html#component-toggle) | Alternar una propiedad local. | aria-pressed si botón, estados visibles y persistencia solo si existe. | Grid/lista en documentación. |
| [`Toggle Group`](componentes.html#component-toggle-group) | Elegir entre varias opciones de vista. | Exclusividad según caso, labels, keyboard y focus. | Tipos de vista reales. |
| [`Alert`](componentes.html#component-alert) | Comunicar hecho importante durante la tarea. | Título/mensaje, tono semántico, no color solo, rol adecuado. | Fuentes pendientes de confirmación. |
| [`Toast`](componentes.html#component-toast) | Dar feedback breve tras acción. | Mensaje veraz, dismiss, aria-live; no afirmar guardado sin backend. | Filtrado o preferencia de demo. |
| [`Progress`](componentes.html#component-progress) | Mostrar avance mensurable. | value/max y etiqueta real, no inventar porcentajes. | Proceso multipaso real. |
| [`Spinner`](componentes.html#component-spinner) | Indicar espera real. | Etiqueta accesible, reduced motion, timeout/error si procede. | Carga de datos externa eventual. |
| [`Skeleton`](componentes.html#component-skeleton) | Reservar geometría mientras llegan datos. | No fingir carga; respetar aspect-ratio y evitar CLS. | Cards con fetch real futuro. |
| [`Empty`](componentes.html#component-empty) | Explicar ausencia de resultados. | Causa, salida del estado, reset/CTA, tono humano. | Sin coincidencias en filtros. |


### 13.5. Content & identity (12)

| Componente | Función y criterio de elección | Contrato para implementación nueva | Aplicación Lichpol |
|---|---|---|---|
| [`Card`](componentes.html#component-card) | Agrupar contenido accionable. | Anatomía consistente, una acción clara, título, imagen opcional y metadatos legibles. | Campaña o mundo. |
| [`Item`](componentes.html#component-item) | Fila autocontenida en colección/lista. | Semántica de listado, estado y acción individual clara. | Elemento de crónica. |
| [`Avatar`](componentes.html#component-avatar) | Representación de persona real o personaje ficticio identificada. | Alt/nombre correcto, fallback, no inventar fotografía. | Perfil verificado de DM o personaje. |
| [`Badge`](componentes.html#component-badge) | Estado o clasificación compacta. | Texto legible, peso 500, semántica no solo cromática, 12px objetivo. | Consultar plazas, sistema y tono. |
| [`Bubble`](componentes.html#component-bubble) | Mensaje breve en conversación o hilo. | Autor, orden, legibilidad y timestamp solo si existe. | Conversación de demo. |
| [`Marker`](componentes.html#component-marker) | Situar punto en mapa o secuencia. | Significado explícito, contraste, foco si interactivo. | Mapas narrativos autorizados. |
| [`Attachment`](componentes.html#component-attachment) | Presentar archivo asociado. | Nombre, tipo, tamaño si real, abrir/descargar seguro. | PDF de campaña autorizado. |
| [`Message`](componentes.html#component-message) | Contenido conversacional individual. | Autor, texto completo, estado y no inventar actividad. | Chat de demo o avisos oficiales. |
| [`Message Scroller`](componentes.html#component-message-scroller) | Historial con scrolling interno. | Barras temáticas, focus visible, no autoscroll destructivo. | Logs de una demo. |
| [`Kbd`](componentes.html#component-kbd) | Comunicar atajo de teclado. | Sistemas operativos adecuados, no inventar comando. | Ayuda de Atlas. |
| [`Code Block`](componentes.html#component-code-block) | Presentar código/snippets de manera legible. | Monoespaciada, scroll horizontal intencional, copy funcional. | Documentación interna. |
| [`Aspect Ratio`](componentes.html#component-aspect-ratio) | Proteger proporciones de contenido visual. | Evitar CLS y recorte de caras/objetos; responsive. | Campaign art, vídeo, retrato. |


### 13.6. Data & layout (7)

| Componente | Función y criterio de elección | Contrato para implementación nueva | Aplicación Lichpol |
|---|---|---|---|
| [`Table`](componentes.html#component-table) | Comparar atributos con estructura tabular. | table headers, relación semántica y fallback móvil. | Horario verificado o comparación de sistemas. |
| [`Data Table`](componentes.html#component-data-table) | Tabla con ordenación/filtrado/estado. | Sort labels, vacío, paginación, teclado y datos verificables. | Archivo real de sesiones. |
| [`Chart`](componentes.html#component-chart) | Visualizar valores cuantitativos. | Fuente, unidades, ejes, accesibilidad, no data fake. | Analítica interna, no decoración pública. |
| [`Resizable`](componentes.html#component-resizable) | Permitir redimensionar paneles. | Handle accesible, min/max, teclado si es necesario, persistencia solo si existe. | Herramienta DM avanzada eventual. |
| [`Scroll Area`](componentes.html#component-scroll-area) | Contener overflow por decisión deliberada. | Scrollbar oscura + bronce, foco, contenido no oculto, altura razonable. | Listados largos de Atlas. |
| [`Separator`](componentes.html#component-separator) | Dividir grupos semánticos. | Borde sobrio, no exceso ornamental; usar hr si estructura lo requiere. | Transiciones entre módulos. |
| [`Direction`](componentes.html#component-direction) | Definir dirección de escritura y composición. | Respetar dir y localización, RTL si se soporta; sin inversiones visuales accidentales. | Internacionalización futura. |


### 13.7. Protección de cobertura y compatibilidad

- Cualquier entrega que cambie el Atlas debe conservar **64 identificadores de componente** y sus categorías; añadir un componente no autoriza retirar otro por accidente.
- En V6 los componentes pertenecen a la **biblioteca visual**, no a un paquete npm. Las futuras implementaciones pueden extraerse de forma incremental, sin introducir React/Tailwind/shadcn solo porque esta lista coincide con nombres conocidos.
- Los nombres genéricos son parte del vocabulario de diseño; la identidad visual no se importa de una librería de terceros.
- El componente de documentación `Native Select` de V6 contiene una demostración visual tematizada con valor de formulario sincronizado. No justificar un dropdown blanco como decisión de branding por llamarse “native”.
- Exigir paridad entre `Select` y `Native Select` en **chevron** y entre los scrollables (`Select`, `Combobox`, `Message Scroller`, `Scroll Area`) en el tratamiento de scrollbars.
- Los artefactos de las demos pueden contener copy o datos ilustrativos. No convertirlos en información real de jugadores/campañas.
- Para cada componente migrado: registrar archivo, selector o API nueva, variantes, estados, tests y decisión de compatibilidad.

## 14. Patrones de producto: composición de la marca en experiencias reales

Un sistema madura cuando crea páginas coherentes y útiles, no cuando presenta 64 piezas de forma aislada. V6 implementa una página `patrones.html` con cuatro composiciones: **Quest Board**, **Campaign Dossier**, **Community Gateway** y **Dungeon Master Dossier**. Estos patrones constituyen el punto de partida para las páginas nuevas.

### 14.1. Quest Board (descubrimiento de campañas)

**Trabajo de usuario:** encontrar una aventura que le interese y entender cómo continuar.

**Anatomía recomendada:**

```text
Quest Board / Campañas
├── Intro editorial breve
├── Filtros reales (sistema, tono o estado si existen datos)
├── Count de resultados visible
├── Grid de campaign cards
│   ├── Arte de contexto (no falso canon)
│   ├── Título y tipo de campaña
│   ├── Sistema comprobado
│   ├── Estado comprobado o «Consultar plazas»
│   ├── Descripción corta
│   └── CTA a ficha real
├── Empty state con recuperar filtros
└── Gateway a comunidad cuando la oferta no resuelva necesidad
```

**V6 implementado:** catálogo con filtros `data-filter`, `aria-pressed`, tarjetas `data-campaign-category`, contador `#filter-count`, empty state `#no-results`, sin fingir backend.

**Reglas de calidad:**

- Un filtro debe cambiar resultados o estar claramente deshabilitado; nunca ser decoración.
- Si el contenido está fijo, no fingir disponibilidad de plazas en tiempo real.
- Las cards deben mostrar metadata readable, no 10 px por ahorrar espacio.
- Mantener altura visual razonable y CTA alineado sin cortar descripciones.
- Distinguir género/ambientación de sistema técnico y de disponibilidad.
- Móvil puede cambiar el filtro de chips a control de selección si las opciones lo requieren; conservar semántica y visibilidad.
- Evitar rarities de videojuego (Legendary/Mythic) aplicadas arbitrariamente a campañas del DM.

### 14.2. Campaign Dossier (ficha de campaña)

**Trabajo de usuario:** comprender un mundo o campaña antes de implicarse.

**Estructura de contenido:**

```text
Dossier de campaña
├── Breadcrumb al catálogo
├── Título del mundo / campaña
├── Resumen narrativo en 2–4 frases
├── Arte conceptual marcado como tal
├── Datos verificables de sistema, tono y participación
├── Historia del mundo (si existe información oficial)
├── Qué necesitas saber antes de jugar
├── Condiciones de participación y accesibilidad, verificadas
├── Estado de plazas/fechas según fuente actual (o «Por confirmar»)
├── CTA a la comunidad/web oficial
└── Otras campañas vinculadas, no inventadas
```

**Lo implementado:** `kuroto.html` demuestra el patrón de dossier. Kuroto está identificado como mundo original de inspiración japonesa según fuentes del proyecto, pero la imagen `kuroto.webp` es conceptual, no canónica. No presentar todos los textos de ejemplo como descripción oficial completa del escenario.

**Diseño:** hero con imagen protagonista y overlay motivado; cuerpo editorial dentro de `--reading`; panel lateral desktop solo si resuelve dudas. En móvil panel tras el contenido principal o antes del CTA según intención, nunca sticky con altura mayor que la pantalla.

### 14.3. Community Gateway (acceso a comunidad)

**Trabajo de usuario:** sentir que puede entrar y saber exactamente qué hacer.

**Estructura:** confianza → cómo funciona → pasos (encontrar canal oficial, presentarse, preguntar por partidas) → reglas/verificación → salida oficial.

**Estados de información:** el proyecto conoce que Discord es comunidad principal, pero **no dispone de invitación actual confirmada**; usar enlace a `https://lichpol.es/` o URL canónica validada cuando se proporcione.

**Principios:**

- No hacer que un novato tenga que aprender vocabulario de D&D antes de entrar.
- Título humano y directo; ilustración de mesa de juego adulta y coherente.
- Explicar qué ocurre tras el clic si abre web/Discord externos.
- Si se añaden normas de comunidad, verificar contenido y titularidad.
- Evitar testimonial fabricado o fake «500 jugadores online».
- Un diálogo previo debe aclarar limitaciones, no fingir inscripción.

### 14.4. Dungeon Master Dossier (perfil e identidad)

**Trabajo de usuario:** conectar con la persona detrás de Lichpol.

**Contenido:** identidad verificable, estilo como DM, proyectos conocidos, medios oficiales, forma de contactar o entrar en comunidad. Construir confianza por contexto e historial, no por superlativos inventados.

**Arte:** `wizard.webp` es un bodegón de sombrero/gafas/D20; **no fotografía del titular**. El logo a color puede tomar protagonismo en esta página. Si se quiere un retrato real, requiere material proporcionado/aprobado por Pol.

**No inventar:** años de experiencia, número de mesas, cantidad de seguidores, edad, premios, preferencias personales, localización exacta ni citas atribuidas.

### 14.5. Patrones secundarios recomendados [NO IMPLEMENTADOS COMO PRODUCTO COMPLETO]

| Patrón | Se justifica cuando… | Evitar si… |
|---|---|---|
| Session/Event Card | existe fuente de eventos con fecha, hora, zona horaria y URL | la web solo conoce campañas atemporales |
| Lore/World Explorer | hay mapa, personajes y narrativas propios confirmados | falta material canónico o derechos |
| Media Gallery | existen vídeos/imágenes autorizados con metadatos | solo hay thumbnails arbitrarios |
| New Player Onboarding | la comunidad quiere un flujo guiado y validado | la puerta de entrada actual es simple y clara |
| Contact Flow | se ha definido canal de contacto, privacidad y procesamiento | no existe backend/servicio |
| Campaign Comparison | varias campañas tienen datos consistentes comparables | los campos son dispares o inventados |
| Archived Campaign State | hay clasificación oficial de partidas finalizadas | se infiere cierre solo por antigüedad |

---

## 15. Blueprints para crear páginas con identidad Lichpol

### 15.1. Antes de crear cualquier página

Responder con datos disponibles:

1. ¿Quién entra aquí y desde dónde?
2. ¿Qué decisión necesita tomar al salir?
3. ¿Qué datos existen y quién los mantiene?
4. ¿Qué escena visual ofrece contexto sin inventar información?
5. ¿Qué componentes ya están implementados?
6. ¿Qué estado móvil es distinto del escritorio?
7. ¿Qué estados vacío/error/loading pueden ocurrir realmente?
8. ¿Qué se necesita confirmar antes de publicar?

No comenzar con una cuadrícula de cards porque sea el layout más fácil de programar.

### 15.2. Homepage / La Taberna

**Evidencia:** `index.html` muestra un H1 actual «En esta mesa, nadie juega solo.», sección «Una taberna. Mil historias.», invitación a elegir mundos, pasos para participar y cierre comunitario. Son decisiones de voz y estructura V6, no obligación de repetir exactamente esos textos si cambia el contenido.

**Plantilla:**

```text
Header + marca
Hero: imagen tavern cinematográfica + H1 + promesa + CTA campañas/comunidad
Sección: por qué jugar juntos (prueba humana, no estadísticas falsas)
Campaign preview: pocos mundos con nombres y datos existentes
Sección editorial de taberna/comunidad
Proceso para nuevos jugadores
Cierre con CTA único principal
Footer / enlaces oficiales / transparencia si prototipo
```

**No hacer:** partículas doradas constantes, cursor personalizado con dado, autoplay de vídeo de fuego, seis supercards idénticas, contadores inventados de sesiones o “online now”.

### 15.3. Catálogo / Campañas

**Evidencia:** `campanas.html` y `patrones.html`.

**Plantilla:** header, intro corta, filtro, contador, cards, empty state, ayuda de comunidad. Pueden aparecer Kuroto, Brunami y referencias existentes a Star Wars FFG, con textos verificados. No incluir un sistema porque sea popular si Lichpol no lo ofrece.

**Responsive:** filtro no debe generar chips tan pequeños que no puedan leerse; 3 columnas desktop, reducción razonada, 1 columna móvil. Evitar recortar status al cambiar ancho.

### 15.4. Campaña / Dossier

**Evidencia:** `kuroto.html`.

**Plantilla:** título y mundo, hero, resumen verificable, tipo de sistema, condiciones del juego, contexto/lore aprobado, qué esperar, CTA fuente oficial, otras opciones.

**Copy:** separar claramente narración ficticia («En el reino…») y datos operativos («Sistema: D&D 5e», «Plazas: consultar»). La aventura puede hablar de secretos; la interfaz no debe ser secreta.

### 15.5. Comunidad

**Evidencia:** `comunidad.html`.

**Plantilla:** bienvenida, pasos concretos, preguntas frecuentes relevantes, normas verificadas, enlace a canal oficial, apoyo para principiantes y exit CTA. No necesita tablero complejo, sí credibilidad y claridad.

### 15.6. Dungeon Master

**Evidencia:** `maestro.html`.

**Plantilla:** relato humano, logo/elementos icónicos, breve resumen de trayectoria confirmada, filosofía de juego si se dispone, mundos, canales y comunidad. El bodegón simbólico no se etiqueta como retrato.

### 15.7. Crónicas / mundos nuevos [RECOMENDACIÓN]

Requisitos mínimos para añadir mundo nuevo:

- Título autorizado, sistema/ambientación y resumen aprobado.
- Arte propio con permiso, marcando `conceptual` si no es canon.
- Jerarquía de capítulos; opción para ver cronología si existe.
- Distinción entre información spoiler-free y spoilers con consentimiento/advertencia.
- Enlaces a campañas relacionadas solo si existen.
- Estructura SEO e imagen social propias cuando la información sea pública.

### 15.8. Documentación interna / Design System

**Evidencia:** `sistema.html`, `componentes.html`.

- Estructura documental: índice por categoría, fundamentos, tokens, estados, variantes, demos, patrones, pautas de uso, QA.
- Conservar los **64 anchors** existentes.
- Usar buscador y filtros cuando la colección sea grande.
- No poner decoración cinematográfica encima de las demos hasta volverlas ilegibles.
- Distinguir design token de comportamiento real, versión de demo de estado production.
- Las puntuaciones deben describir su metodología y limitaciones.

### 15.9. Checklist visual de página antes de implementación

- [ ] Un único H1 semántico y copy sin viudas aparentes.
- [ ] Un gesto visual protagonista; no competir con tres glows.
- [ ] El arte elegido aporta contenido, no relleno.
- [ ] El botón primary se reconoce en menos de unos segundos de lectura.
- [ ] La metadata es legible incluso a 390/320 px.
- [ ] Los grupos de contenido tienen ritmo; no hay seis paneles casi idénticos.
- [ ] El campo, select, date picker y scrollbars no dependen accidentalmente del blanco nativo.
- [ ] Los enlaces externos son verdaderos y tienen destino.
- [ ] Los estados vacíos/errores no dejan una pantalla rota.
- [ ] Ningún hecho no confirmado parece información en tiempo real.

---

## 16. Motion System: movimiento con identidad

### 16.1. Filosofía

El movimiento debe recordar **peso, materia y descubrimiento**, no efectos arcano-neón constantes. La pantalla puede revelar contenido como una entrada a un salón oscuro, pero la navegación debe seguir respondiendo como una interfaz web moderna.

### 16.2. Timing tokens reales

| Token | Valor | Significado |
|---|---:|---|
| `--quick` | `160ms` | respuesta inmediata de control |
| `--normal` | `240ms` | hover/open corto y transiciones de estado |
| `--reveal` | `620ms` | aparición editorial puntual |
| `--ease-out` | `cubic-bezier(.18,.65,.24,1)` | respuesta general |
| `--ease-ritual` | `cubic-bezier(.2,.75,.24,1)` | escena/imagen, transición más lenta |

En exploraciones V3 también se usó 580 ms como duración atmosférica; la tokenizada de V6 para reveal es **620 ms**. No crear una segunda variable de 580 ms sin decisión de sistema.

### 16.3. Patrones de motion permitidos

| Patrón | Comportamiento | Límite |
|---|---|---|
| CTA hover | pequeña elevación y refuerzo de contraste | sin salto de layout ni sacudida |
| CTA pressed | retorno físico discreto | instantáneo, sin rebote exagerado |
| Card hover | elevación de 5 px y zoom sutil de imagen | no impedir lectura ni cortar imagen |
| Reveal editorial | aparición suave una vez al entrar en viewport | solo para contenido no crítico; reduced motion lo elimina |
| Select/menu open | overlay próximo al trigger y foco claro | sin escalas teatrales, sin perder selección |
| Tab change | actualización inmediata con transición visual mínima | no retrasar datos tras interacción |
| Dialog | presencia/ausencia obvia | bloquear fondo cuando corresponde |
| D20 | animación opcional, resultado anunciado | demo, no mecánica crítica ni azar seguro |

### 16.4. Patrones a evitar

- Sparkles y partículas globales animadas continuamente.
- Parallax agresivo que haga ilegible el contenido.
- Floating cards perpetuas, wobble en todos los botones, luces que siguen el cursor.
- Efectos de entrada de más de un segundo en cada elemento.
- Animaciones dependientes de scroll con saltos que desorientan.
- Motion como sustituto de una buena jerarquía o status.
- Animaciones esenciales para comprender el contenido sin alternativa accesible.

### 16.5. Accesibilidad y performance del motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  .js [data-reveal] { opacity: 1; transform: none; }
}
```

Esta rama está reflejada en la V6. En una refactorización posterior, reducir las transiciones por propiedades específicas si ello mejora rendimiento; **no eliminar la preferencia por movimiento reducido**.

- Preferir `transform`/`opacity` a cambios continuos de layout.
- Evitar filtros intensivos en imágenes a pantalla completa si impactan FPS.
- Reveal debe mantenerse visible si IntersectionObserver no existe.
- Al navegar con teclado o anclas, no retrasar la llegada al contenido por efecto visual.
- Probar dispositivos modestos antes de añadir movimiento ambiental.

---

## 17. Accesibilidad y diseño inclusivo

**Estado real:** la V6 incorpora numerosas prácticas de HTML semántico, foco, diálogo y teclado, pero sus 64 demos **no están certificadas** con tecnologías de asistencia. Lo siguiente es **contrato de nueva implementación**, no resultado de auditoría final.

### 17.1. Objetivo de conformidad

**[RECOMENDACIÓN DE PRODUCCIÓN]** WCAG 2.2 AA, con revisión de usuarios reales y tecnologías de asistencia. Comprobar criterios relevantes a cada componente y no usar una etiqueta de "100% accesible" sin evidencia.

### 17.2. Requisitos por dimensión

**Percepción:**

- Contraste de texto y controles contra su background real, también sobre textura.
- Texto alternativo meaningful en imágenes informativas; decorativas como decorativas.
- Información no dependiente exclusivamente del color o shape.
- Contenido a zoom 200% y 400% sin truncamiento crítico.

**Operación:**

- Todas las acciones disponibles por teclado.
- Focus-visible claro y consistente.
- Escape en menú, modal, popover/listbox cuando corresponda.
- Evitar trampas de foco y evitar pérdida de foco tras cerrar.
- Target areas de tamaño/tolerancia apropiados.

**Comprensión:**

- Idioma de documento `lang="es"`.
- Labels persistentes, error específico y solución.
- Estados de campaña comprensibles sin aprender un código de colores o rarezas.
- Navegación estable entre páginas y nomenclatura consistente.

**Robustez:**

- HTML nativo primero; ARIA solo cuando necesario.
- IDs únicos y relaciones aria válidas.
- Controles custom probados con lector de pantalla, no solo con `tab`.
- JS off/progressive enhancement considerado para navegación y contenido central.

### 17.3. Pruebas adicionales exigidas antes de producción

- Chromium, Firefox y Safari según plataforma objetivo real.
- NVDA + navegador compatible, VoiceOver en macOS/iOS, y TalkBack en Android cuando exista alcance móvil.
- 320px mínimo de viewport efectivo, 200%/400% zoom, orientación y teclado completo.
- Contrast checker, pruebas de focus order y landmarks.
- Motion reducido, alto contraste del sistema cuando sea relevante.
- Formularios con valores erróneos y largas etiquetas localizadas.
- Test de pérdida de foco en overlay/combobox tras click-away.

### 17.4. Navegación por teclado que debe mantenerse

| Componente | Comportamiento base |
|---|---|
| Header móvil | Tab llega al toggle, Enter/Espacio abre, Escape cierra y retorna foco |
| Tabs | flechas, Home/End, foco y selección sincronizada |
| Select custom | ArrowUp/Down, Home/End, Enter/Espacio, Escape, Tab |
| Calendar/Date Picker | desplazamiento entre días/meses, seleccionar, Escape |
| Dialog | focus modal, Escape y retorno apropiado |
| D20 demo | activación teclado y resultado anunciado con `aria-live` |
| Filter chips | `aria-pressed` y actualización del resultado comunicada |
| Carousel | botones anterior/siguiente con nombres accesibles |

### 17.5. Fallos frecuentes que una IA debe detectar

1. Un `div` que parece botón pero no se puede enfocar.
2. Icono decorativo que el lector de pantalla anuncia como ruido.
3. Un select muy estilizado que no envía valor real.
4. Menú visible que no responde a Escape.
5. Focus detrás de un dialog abierto.
6. Estado selected solo mediante borde dorado en un fondo muy oscuro.
7. Mensaje de error que aparece pero no se anuncia.
8. Scroll area sin indicación de que hay más contenido.
9. Texto diminuto que cumple diseño de maqueta pero no uso real.
10. Hero con copy superpuesto sobre llamas/zonas de luz sin suficiente contraste.

---
## 18. Modelo de contenidos y verdad editorial

### 18.1. Hechos públicos actualmente registrados [fuente: docs de V6]

La documentación `docs/CONTENT-SOURCES.md` refiere una consulta realizada el **22-10-2026** a `https://lichpol.es/` y una publicación de la propia web. Los hechos usados como contexto del prototipo son:

- Pol usa el alias Lichpol.
- Juega y dirige juegos de rol de mesa.
- Discord es la vía principal de comunidad.
- Twitch y YouTube se utilizan para contenido audiovisual.
- Foundry VTT se menciona como herramienta principal para juego online.
- Se han citado D&D 5e, Star Wars FFG y The Troubleshooters, así como mundos/campañas Kuroto y Brunami.
- Kuroto se presenta en la documentación como universo de inspiración japonesa original vinculado a Lichpol.
- La comunidad puede proponer o compartir sus propias partidas según la fuente pública registrada.

**Limitación temporal:** esto es una foto de documentación fechada, no una sincronización actual. Antes de publicar nueva información operativa, revalidarla en las fuentes canónicas. No inventar detalles que no estén en las fuentes.

### 18.2. Información NO confirmada y prohibida como dato real

- Disponibilidad actual de plazas y cupos.
- Fechas, horas, frecuencia o duración exacta de sesiones concretas.
- Precios, tarifas, descuentos o pagos.
- Número histórico de partidas, jugadores, seguidores o audiencia.
- URL de invitación vigente a Discord si no ha sido verificada.
- Fecha de inicio/fin exacta de una campaña.
- Estadísticas de XP, atributos, niveles y clases reales de jugadores.
- Canon narrativo de Kuroto/Brunami no sustentado por fuentes aprobadas.
- Consentimiento y autorización de fotografía del DM para retratos públicos.
- Procesamiento, almacenamiento o entrega real de un formulario.
- Cualquier afirmación biográfica no confirmada.

**Regla:** si falta un dato, mostrar «Consultar», «Por confirmar» o prescindir del bloque. **Nunca** rellenar el vacío con números o estados inventados para que el diseño parezca completo.

### 18.3. Modelo recomendado `Campaign` [RECOMENDACIÓN, NO esquema existente de backend]

```ts
/** Contrato editorial propuesto, NO API existente. */
type Confidence = 'verified' | 'unverified' | 'conceptual';

type Campaign = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  system?: string;
  genre?: string;
  tone?: string[];
  art?: {
    src: string;
    alt: string;
    provenance: 'canonical' | 'conceptual';
    licenseStatus: 'approved' | 'pending';
  };
  availability?: {
    status: 'available' | 'full' | 'upcoming' | 'unknown';
    seats?: number;
    asOf?: string;                 // YYYY-MM-DD
    sourceUrl?: string;
    confidence: Confidence;
  };
  schedule?: {
    displayText: string;
    timezone?: string;
    sourceUrl: string;
    confirmedAt: string;
  };
  destinationUrl?: string;          // Verified official route
};
```

**Restricción de render:** si `availability.confidence !== 'verified'` o el dato caducó para su naturaleza, no mostrar «Plazas disponibles»/«Completa» como afirmación presente. Mostrar «Consultar plazas» o un estado honesto.

### 18.4. Esquemas para otras entidades [RECOMENDACIÓN]

**World/Lore:** `id`, `title`, `synopsis`, `canonSource`, `spoilerLevel`, `approvedAssets`, `relatedCampaigns`, `lastVerified`.

**Session/Event:** `id`, `campaignId`, `startsAt`, `timezone`, `duration`, `joinInstructions`, `capacity`, `status`, `sourceUrl`, `lastVerified`. No mostrar si no existe fuente.

**Media:** `title`, `provider`, `verifiedUrl`, `thumbnail`, `copyrightStatus`, `publishedAt`, `privacyStatus`.

**Person/DM:** `displayName`, `approvedBiography`, `approvedPortrait`, `officialChannels`, `contentPermissions`; no suponer redes, correo ni fechas.

### 18.5. Política de datos de demostración

Para documentación del Design System es admisible utilizar ejemplos ficticios, **si se etiquetan claramente como demostración**. Los ejemplos no deben presentarse en las páginas públicas como campañas reales de Lichpol ni vincular a un botón de inscripción real.

Distinguir:

- **Canon aprobado**: información oficial y autorizada sobre mundo, historia o contenido.
- **Dato operacional confirmado**: plazas, fechas, canales, reglas, etc., con origen y vigencia.
- **Arte conceptual**: imagen de ambientación que no establece canon.
- **Demo**: una card, persona, fecha o estado inventado únicamente para mostrar un componente.

### 18.6. Guía de microcopy por patrón

| Situación | Copy preferible | Qué evita |
|---|---|---|
| Disponibilidad no conocida | «Consultar plazas» | prometer cupo |
| Página de campaña | «Descubre Kuroto» / «Consultar cómo participar» | simular matrícula |
| Comunidad | «Encontrar Discord en Lichpol.es» | URL de invitación ficticia |
| Formulario demo | «Ejemplo de formulario. No se envía ni guarda información.» | falsa captación |
| Sin campañas tras filtrar | «No hay resultados para este filtro. Prueba con todos los sistemas.» | empty state inútil |
| Enlace a recurso externo | «Abrir en la web oficial» | confundir dominio/destino |
| Datos narrativos no canónicos | «Ilustración conceptual del mundo» | presentar diseño como canon |
| Interacción D20 demo | «Has sacado un 14.» | tratar el dado como mecanismo oficial de juego |

### 18.7. Links externos y atribución

- Web de referencia: `https://lichpol.es/`.
- En el prototipo se usó `https://www.twitch.tv/lichpol_gamer`; verificar vigencia antes de publicación.
- En algunos puntos de V6 aparece una búsqueda en YouTube en lugar de canal validado. **No tratarla como URL canónica del canal**.
- No fijar invitación a Discord sin verificación.
- Si se usa un enlace de tercero, mostrar estado real de disponibilidad y licencia cuando proceda.
- No incrustar publicidad o servicios de terceros que recojan datos sin inventario técnico/consentimiento apropiado.

---

## 19. Arquitectura técnica y mantenimiento de la V6

### 19.1. Stack real [IMPLEMENTADO]

- HTML multipágina.
- CSS vanilla con custom properties compartidas.
- JavaScript nativo como progressive enhancement.
- Recursos SVG/WebP locales.
- Sin framework de componentes runtime y sin proceso de build obligatorio.
- Versión autónoma `LICHPOL-V6.html` que permite explorar varias páginas en un archivo local.

**Consecuencia:** no afirmar que React, Tailwind, Next.js, Astro, Vite, Radix o shadcn están instalados solo porque una IA los preferiría. Si el proyecto adopta un stack nuevo, tratarlo como decisión arquitectónica separada, justificar beneficios y preservar semántica/arte.

### 19.2. Árbol de referencia

```text
LICHPOL-V6-brand-final/
├── index.html                 # Landing / taberna
├── campanas.html              # Catálogo y filtros
├── kuroto.html                # Dossier de campaña
├── comunidad.html             # Comunidad
├── maestro.html               # Dungeon Master
├── patrones.html              # Patrones compuestos
├── sistema.html               # Foundations y directorio 64/64
├── componentes.html           # Component Atlas completo
├── atlas-v4.html              # Biblioteca histórica de referencia
├── LICHPOL-V6.html            # HTML autónomo
├── css/
│   ├── tokens.css             # Primitivos, semánticos, materiales y escalas
│   └── site.css               # Componentes y layouts, parches V6 incluidos
├── js/
│   └── site.js                # Menú, filtros, dialog, tabs, listbox, dado, reveal
├── assets/
│   ├── lichpol-logo-color.svg # MARCA FIJA
│   ├── lichpol-logo-white.svg # MARCA FIJA
│   ├── lichpol-logo-black.svg # MARCA FIJA
│   ├── lichpol-sigil.svg      # HISTÓRICO, NO USAR COMO MARCA
│   ├── tavern.webp
│   ├── kuroto.webp
│   ├── brunami.webp
│   ├── wizard.webp
│   └── atlas-preview.webp
├── docs/
│   ├── BRAND-LOCK.md
│   ├── ART-DIRECTION-V6.md
│   ├── COMPONENT-CONTRACTS.md
│   ├── COMPONENTS-V6.md
│   ├── CONTENT-SOURCES.md
│   ├── CONTENT-NOTES.md
│   ├── EVALUACION-V6.md
│   └── [otros docs históricos]
└── qa/                        # Capturas y resultados anteriores
```

Colocar **este `design.md` en la raíz** del proyecto al integrarlo. Sus paths relativos se resuelven desde esa raíz. Se entrega aparte para poder copiarlo donde corresponda; **no modifica por sí solo los archivos existentes**.

### 19.3. Jerarquía de estilos

```text
primitive tokens (--brass-400, --ink-950, ...)
          ↓
semantic tokens  (--action, --canvas, --fg, --focus, ...)
          ↓
shared components (.btn, .pill, .campaign-card, .arcane-select, ...)
          ↓
page composition (.hero, .campaign-grid, .tavern-grid, ...)
          ↓
state/responsive overrides (solo los necesarios)
```

Los futuros cambios deben intentar modificar el nivel correcto. Por ejemplo, si todos los tertiary tienen demasiado contraste en hover, ajustar clase compartida, no 17 tarjetas. Si una página necesita un responsive único por su composición, no alterar globalmente `.container`.

### 19.4. Convenciones de CSS

- Usar tokens, no hex repetidos sin justificación.
- Selectores de componente descriptivos y acotados (`.campaign-card__body`, `.arcane-select__trigger`).
- Modificadores (`--green`, `--rust`, `--v6`) solo cuando representan variante real.
- No introducir `!important` salvo necesidad existente y documentada; tertiary 0px tiene antecedente específico.
- Evitar un cuarto override de la misma clase al final del CSS. Si el cambio es estable, refactorizar el origen con control de regresión.
- Si se añade una variable nueva, declarar función, valor fallback y dónde se consume.
- Usar propiedades lógicas (`margin-inline`, etc.) cuando simplifiquen internacionalización.
- Evitar estilos que dependan de estructura DOM accidental, especialmente para overlays.

### 19.5. Convenciones JS y estado

- Reutilizar patrones de `js/site.js` o extraer pequeñas funciones al crecer; no introducir store global por un selector.
- Listeners vinculados a elementos existentes y con limpieza apropiada si hay montaje/desmontaje.
- Sin side effects de persistencia si no hay necesidad real.
- `data-*` puede transportar identificadores y categorías estables; evitar usar strings del texto como fuente de estado.
- Sin intervalos permanentes para microdecoración.
- `prefers-reduced-motion` se consulta y se respeta.
- Escape y retorno de foco forman parte del contrato, no son extras.
- No introducir una API que parezca real si los datos son fixtures de diseño.

### 19.6. Ejemplo mínimo de nueva sección compatible

```html
<section class="section" aria-labelledby="nueva-cronica-title">
  <div class="container">
    <header class="section-heading">
      <p class="eyebrow">Crónicas</p>
      <h2 id="nueva-cronica-title">Historias alrededor de la mesa</h2>
      <p>Descubre relatos y material publicados por la comunidad.</p>
    </header>

    <!-- Renderizar aquí contenido verificado; no inventar publicaciones. -->
    <div class="reading">
      <p class="muted">
        El archivo de crónicas estará disponible cuando exista material aprobado.
      </p>
      <a class="btn btn-secondary" href="https://lichpol.es/">
        Consultar la web oficial
      </a>
    </div>
  </div>
</section>
```

Es un **ejemplo de implementación**, no prueba de que exista actualmente una página de crónicas publicada o que su contenido esté confirmado.

### 19.7. Ejemplo correcto de enlace vs acción

```html
<!-- Ruta real a otro documento: anchor -->
<a class="btn btn-primary" href="campanas.html">Explorar campañas</a>

<!-- Acción local real: button -->
<button class="btn btn-tertiary" type="button" data-dialog-close>
  Volver
</button>

<!-- No inventar: button que dice "Inscrito" sin sistema real -->
```

### 19.8. Gestión de assets

- Guardar recursos locales para garantizar prototipo offline cuando ese sea el requisito.
- Preferir formatos modernos con compresión, dimensiones correctas, `width`/`height`/`aspect-ratio`.
- Mantener los SVG maestros como fuente original, no convertirlos sin necesidad.
- Registrar alt y provenance en la fuente de contenido o documentación.
- Usar `loading="lazy"` para imágenes fuera del primer viewport; las imágenes críticas de hero pueden necesitar prioridad de carga.
- No codificar todos los WebP nuevos como base64 dentro del HTML modular por defecto; la versión autónoma es una distribución especial.
- Verificar la carga en navegador local y en el entorno real de despliegue; comportamiento `file://` puede diferir de servidor HTTP.

### 19.9. Nuevas dependencias

Antes de añadir una dependencia o migrar stack, documentar:

1. Qué capacidad falta en el sistema existente.
2. Por qué no la resuelven HTML/CSS/JS actuales.
3. Impacto en bundle, performance, accesibilidad y mantenimiento.
4. Plan de compatibilidad visual con tokens y branding.
5. Prueba de comportamiento, rollback y coste de migración.

**Recomendación:** para añadir páginas al prototipo actual, el enfoque por defecto sigue siendo **HTML/CSS/JS existente**.

---

## 20. Performance, SEO y entrega pública

### 20.1. Performance [RECOMENDACIÓN]

El prototipo V6 no incluye en el dossier un informe completo de Core Web Vitals ni garantiza puntuación Lighthouse. No declarar 95+ automáticamente. Probar con conexión y dispositivo representativos.

**Objetivos orientativos para producción (a validar):** LCP ≤2.5 s, CLS ≤0.1 e INP ≤200 ms en el percentil correspondiente. Son metas habituales de experiencia, no mediciones actuales de Lichpol.

**Acciones:**

- Priorizar imagen principal correcta sin descargar cuatro versiones full-res para una sola card.
- Exportar WebP/AVIF con calidad visual suficiente; evitar fondos de 8 MB cuando 250 KB resuelvan un hero.
- Dar tamaños intrínsecos y aspect ratio para evitar CLS.
- Minimizar overlays de blur y filtros costosos en pantalla completa.
- Cargar fuentes con estrategia sin bloquear render; revisar licencias y FOUT.
- No cargar los 64 demos y todas sus imágenes en la página pública si solo se necesita un componente. El Atlas es documentación.
- Mantener JS pequeño, diferido y progresivo.
- Verificar carga offline del HTML autónomo **por separado** de carga HTTP en producción.

### 20.2. SEO técnico

- Un H1 principal y títulos de sección semánticos, no múltiples H1 decorativos.
- `<title>` y meta description únicos por página y acordes a contenido verificado.
- URLs limpias, canonical solo cuando exista dominio/ruta real confirmada.
- `lang="es"` y `hreflang` solo si se publican traducciones reales.
- Open Graph/Twitter Card con imagen autorizada y copy fiel; **no incrustar texto falso en arte**.
- Sitemap/robots adecuados al entorno; impedir indexación de prototipos internos si corresponde.
- JSON-LD solo para tipos sustentados por hechos (por ejemplo, Organization/Person/Event cuando se puede confirmar); no inventar eventos para conseguir rich snippets.
- Alt explicativo para material narrativo, decorativo vacío cuando proceda.
- Enlaces internos descriptivos; evitar «haz clic aquí» generalizado.
- En páginas de campaña, distinguir contenido real de copy de concepto; no vender mundo inventado como canon.

### 20.3. Legal y privacidad [PENDIENTE]

No generar textos legales falsamente específicos. Antes de capturar leads, publicar cookies/analytics o crear inscripciones, resolver jurisdicción, tratamiento de datos, responsable, proveedores, consentimiento y políticas pertinentes con información real. El prototipo actual no constituye esa infraestructura.

### 20.4. Seguridad

- Enlaces externos con `rel` apropiado.
- No inyectar HTML no confiable para renderizar lore o mensajes.
- Validar datos si se conecta backend real.
- No almacenar invitaciones privadas, tokens o PII en assets/documentación.
- Si se integra Discord/OAuth, tratar autenticación como tarea separada con seguridad y permisos reales.
- No dar por hecha seguridad por utilizar HTML estático; revisar dependencias, formularios y despliegue.

---


---

## 21. Pattern library: composición de experiencias reales

**Regla:** un patrón es una solución de tarea compuesta por componentes, contenido, estados y una salida comprensible. No es solo una pantalla bonita. Las páginas `patrones.html`, `campanas.html`, `kuroto.html`, `comunidad.html`, `maestro.html` e `index.html` son los referentes implementados. Los contratos siguientes son obligaciones de nuevas páginas, no promesas de infraestructura existente.

### 21.1. Campaign discovery / Quest Board

**Intención del usuario:** «¿A qué puedo jugar y por dónde empiezo?».

- Entrada: navegación principal, hero o enlace contextual desde comunidad.
- Composición: encabezado de sección → explicación corta → filtros opcionales → resultados → cards → salida hacia dossier o comunidad.
- Campos de card: título comprobado, sistema comprobado, sinopsis, imagen atmosférica con tratamiento coherente, disponibilidad solo si verificada, CTA específico.
- Ejemplo de metadatos: sistema, tono, modalidad, duración. Mostrar solo si existen; no llenar huecos con información ficticia presentada como actual.
- Estados: carga (solo cuando realmente haya fetch), resultados, vacío con reset, error con reintento, filtros activos y contenido de disponibilidad desconocida.
- Filtros: deben actuar sobre datos reales de la lista. El texto y las opciones describen la taxonomía existente, no categorías inventadas.
- Móvil: filtros apilados o panel accesible, nunca 4 selects comprimidos en una fila; cards en una columna; CTA alcanzable sin buscar.
- No incluir rareza «legendary» o estadísticas de videojuego para describir capacidad real de una campaña.

**Aceptación:** el usuario reconoce título/sistema, distingue «no hay datos» de «no hay plazas», puede limpiar filtros y obtiene una acción de continuación.

### 21.2. Campaign detail / Dossier de campaña

**Intención:** «¿Esta aventura es para mí y cómo participo?».

Orden de lectura recomendado: breadcrumb → título + subtítulo → arte de campaña → resumen de 2-4 frases → características verificadas → sinopsis ampliada → requisitos/avisos si existen → acción principal → contenidos relacionados.

- Evitar paneles que compitan con el relato; si se usa rail lateral, que aporte metadatos o CTA, no duplique el cuerpo.
- Mostrar sistema y ambientación como hechos solo cuando estén confirmados.
- Si no existe inscripción en la web, el CTA será «Consultar participación» o enlace al canal oficial; nunca «Inscripción completada».
- Si el contenido es una demo, etiqueta explícita «Contenido ilustrativo / por confirmar» donde corresponda.
- Arte conceptual no implica fidelidad canónica; no describir elementos generados como lugares oficiales sin fuente.
- En móvil: no fijar paneles sticky que roben altura, usar CTA único, ancho editorial de lectura, imágenes con recorte controlado.

**Prueba mínima:** desde catálogo se llega a dossier, de dossier a comunidad, con ruta inversa y breadcrumbs navegables.

### 21.3. Community gateway / Entrar en la taberna

**Intención:** «¿Qué debo hacer para jugar con otras personas?».

- Presentar por qué existe la comunidad antes de exigir un clic fuera del sitio.
- Explicar, con hechos verificados, que Discord centraliza información y reuniones; Foundry VTT puede aparecer como herramienta habitual, no como requisito universal de todas las partidas.
- Un CTA principal real con destino verificado; si no está disponible un permalink, enlazar a la página pública oficial pertinente o marcarlo pendiente.
- Informar si el clic abre un servicio externo; no sugerir integración OAuth o alta local inexistente.
- Estados: destino no verificado, servicio externo no disponible, alternativas de contacto si hay fuentes autorizadas.
- No embeber un contador de miembros ni testimonios inventados.

### 21.4. Dungeon Master profile / Persona detrás del personaje

**Intención:** «¿Quién dirige la partida y qué estilo de mesa encontraré?».

- Abrir con presencia humana y el emblema real de Lichpol; la biografía solo debe contener hechos confirmados.
- Diferenciar identidad de marca del personaje narrativo. No utilizar un retrato generado como fotografía documental.
- Mostrar estilo de dirección, experiencia o número de sesiones solo si existe fuente.
- Incluir personalidad y sentido de comunidad mediante copy concreto, evitando inventar logros.
- Enlaces sociales únicamente con URL oficial comprobada.
- Evitar que la ficha parezca un videojuego con puntos de habilidad ficticios atribuidos a una persona real.

### 21.5. Content / Crónicas y universos

**Intención:** «Quiero explorar historias y saber más del mundo».

- Elegir formato de relato, índice, línea temporal o archivo según el material existente.
- La navegación entre capítulos debe ser lineal y reversible; el usuario debe saber si hay spoilers.
- Longform usa `--reading` y tipografía de lectura, no una columna de 1200 px llena de texto.
- Las ilustraciones sirven de pausas narrativas y contexto, nunca reemplazan la información textual.
- No generar cronologías, mapas o genealogías como si fueran canon sin confirmación del autor.

### 21.6. Event/session detail [PATRÓN FUTURO, NO IMPLEMENTACIÓN ACTUAL]

Solo construir si hay fuente de sesiones vigente. Datos mínimos: título, horario con zona horaria, modalidad, sistema, anfitrión, plazas y estado verificable. Condiciones: cuando no se pueda sincronizar, mostrar fecha de actualización y no garantizar disponibilidad. No convertir la V6 en una falsa plataforma de reservas.

### 21.7. Ficha de componente / Design System Atlas

- Ficha estándar: nombre, función, composición, props o atributos realmente implementados, estados, teclado, accesibilidad, tokens, variantes, anti-patterns, ejemplos y referencia a código.
- No confundir **vista interactiva** con **componente listo para npm**.
- Busca por nombre y categoría, incluye empty state y navegación a un ejemplo; mantener los 64 IDs actuales.
- Si un componente no se usa en la web pública, puede seguir en el Atlas como referencia sin forzar su uso.

---

## 22. Plantillas para páginas nuevas

Las plantillas describen estructura, no HTML inmutable. La IA debe adaptar densidad, orden, arte y texto al objetivo de la página.

### 22.1. Template A: Landing narrativa

```text
Global header / logo oficial blanco
Hero full bleed con imagen adulta cinematográfica
  Eyebrow corto opcional
  H1 de una sola familia tipográfica
  Introducción útil de máximo 2-3 frases
  CTA primario + alternativa discreta cuando sea necesaria
Bloque de credibilidad basado en datos reales (o se omite)
Bloque principal para descubrir campañas o comunidad
Ruptura editorial con escena/quote verdaderamente relevante
Segundo patrón compuesto (historia, DM, universo)
CTA de cierre sin duplicación innecesaria
Footer con enlaces oficiales y legales necesarios
```

**Evitar:** tres héroes consecutivos, métricas ficticias, testimonios fabricados, «vive una experiencia única» vacío y CTA sin destino.

### 22.2. Template B: Índice de campañas

```text
Header
Title + descripción breve
Filtros con labels visibles
Resumen accesible de resultados
Grid adaptable y tarjetas con CTA
Empty/error/loading solo si corresponden
Ruta hacia comunidad para consultar sesiones
Footer
```

**Decisión de layout:** hasta 3 columnas amplias a 1200 px; 2 cuando quepa contenido sin truncamiento; 1 en móvil. El número no tiene prioridad sobre legibilidad.

### 22.3. Template C: Dossier editorial

```text
Breadcrumb
Hero con título + contexto
Columna reading de aproximadamente 740 px
Imagen de atmósfera, si aporta contenido
Secciones h2/h3 con longitud de línea controlada
Panel informativo adjunto solo en pantallas amplias
Acción de continuidad
Contenido relacionado verificado
```

### 22.4. Template D: Utilidad / formulario

```text
Contexto claro y título de tarea
Campos semánticos con sus labels
Instrucciones breves / requerido-opcional explícitos
Validación inline, no solo toast
Enviar con estado real (idle/busy/success/error)
Recuperación de errores sin pérdida arbitraria de datos
Link de salida o volver
```

**No simular backend.** Una demo puede mostrar estados explícitamente etiquetados como demostración; no debe engañar sobre sus efectos.

### 22.5. Template E: Archivo de contenido

```text
H1 y qué encontrará el lector
Taxonomía/filtros solo si el volumen lo justifica
Entradas en cards o listas de contenido
Metadatos de publicación si existen
Paginación/carga con estado verificable si el dataset crece
Empty state útil
```

---

## 23. Art Direction Bible para nuevos assets

### 23.1. Requisitos de encuadre y representación

- Escenarios con credibilidad arquitectónica y material: madera estructural, mampostería erosionada, hierro, cuero, tejidos, pergamino envejecido.
- Iluminación diegética: velas, chimeneas, antorchas, luz lunar, aberturas y niebla exterior; contraste controlado que permita superponer UI cuando proceda.
- Figuras humanas adultas, anatomía plausible, vestuario utilitario y variedad natural de edades y apariencias. No miradas/poses de figurita coleccionable repetidas.
- Escenas que narren algo: mesa habitada, expedición, fortaleza con rutas, rastros humanos. No castillos generados por llenar un rectángulo.
- Evitar «todo naranja», sobreprocesado HDR, saturación de púrpura, fuego mágico gratuito, magos genéricos con bastón repetidos, halos dorados en cada imagen.
- Fotocomposición sobria: reservar espacio oscuro para texto, mantener sujeto lejos de la zona de CTA, evitar cortar rostros y el D20 relevante.

### 23.2. Familias de imágenes

| Familia | Función | Criterio de calidad |
|---|---|---|
| Tavern / interior | Promesa de comunidad y pertenencia | Personajes a escala humana, fuego cálido, sombra profunda, narrativa social |
| Fortress / exterior | Campañas, riesgo, exploración | Perspectiva creíble, recorrido espacial, atmósfera, sensación de escala |
| Wizard / object still life | ADN de marca sin falsificar retrato | Sombrero, gafas, D20, materiales; no compite con logo |
| World / location | Diferenciar universos concretos | Enfoque editorial coherente; canon validado si se etiqueta como oficial |
| Portrait real | Perfil del DM | Solo retrato real autorizado o ilustración identificada como conceptual |
| Material surface | Tokens y fondos | Textura discernible a baja intensidad; sin ruido que afecte legibilidad |

### 23.3. Prompt de arte reutilizable [HERRAMIENTA, NO FACTO]

```text
Create an adult, cinematic dark-medieval fantasy environment for LICHPOL.
Purpose: [hero / campaign / editorial divider]. Narrative context: [verified details].
Composition: [16:9 or declared ratio], natural human scale, believable stone,
charred wood, iron and worn leather, lived-in details, physically motivated
candle/fire/moonlight, deep shadows with retained visual detail, restrained
brass highlights and deliberate negative space for readable interface copy.
Mood: dangerous yet inviting; grounded, dramatic, mature, non-cartoon.
No legible text, no logo imitation, no childlike protagonists, no anime/chibi,
no video-game loot UI, no exaggerated purple neon, no unnecessary runes,
no artificial glow surrounding every subject.
Do not portray unverified canon as official. Preserve focal subject and safe crop.
```

### 23.4. Asset acceptance gate

1. ¿Funciona como ilustración adulta incluso sin ver el CSS?
2. ¿Existe foco compositivo y narrativa discernible?
3. ¿El recorte funciona en desktop y móvil, sin cortar elementos importantes?
4. ¿Se pueden superponer textos accesibles sin oscurecerla artificialmente en exceso?
5. ¿Es una obra original / con licencia verificable? No copiar visuales de publishers externos.
6. ¿El peso y formato (WebP/AVIF cuando compatible) cumplen presupuesto?
7. ¿Su nombre, `alt`, procedencia y alcance editorial están documentados?

---

## 24. Motion language: físico, narrativo, contenido

**Los tokens reales están definidos en `css/tokens.css`:** `--quick:160ms`, `--normal:240ms`, `--reveal:620ms`, `--ease-out`, `--ease-ritual`. El sistema de movimiento va de lo funcional a lo atmosférico, nunca de lo llamativo a lo gratuito.

| Tipo | Ejemplo de intención | Duración de referencia | Restricción |
|---|---|---|---|
| Feedback inmediato | Hover, press, foco | `--quick` | Estado inequívoco; nada de desplazamientos grandes |
| Transición de interfaz | Tab, accordion, menú | `--normal` | Nunca bloquear teclado; mantener lectura y foco |
| Revelación narrativa | Hero o sección editorial | `--reveal` | Una sola entrada significativa, sin repetir cada scroll |
| Estado de carga | Progress/spinner solo si hay espera | Según tarea | No simular latencia; respetar reducción de movimiento |
| Elementos ambientales | Luz tenue, niebla, brasas | Solo si aporta atmósfera | Baja intensidad, opt-in donde proceda; cero distracción en formularios |

### 24.1. Principios

- **Peso:** drawers y paneles deben asentarse con inercia controlada, no rebotar como interfaces infantiles.
- **Revelación:** una nueva sección aparece con opacidad/desplazamiento mínimo, no con animaciones encadenadas en cada tarjeta.
- **Luz:** el brillo indica atención/selección, no está presente de forma indiscriminada.
- **Continuidad:** la navegación mantiene una relación espacial comprensible entre elemento accionado y destino.
- **Accesibilidad:** `prefers-reduced-motion: reduce` elimina transformaciones no esenciales, scroll suave forzado y parallax.

### 24.2. Regla de implementación

Una interacción debe funcionar también sin CSS, sin JS cuando aplique una mejora progresiva, y cuando la animación esté deshabilitada. Si su mecánica depende de un efecto visual para explicar el estado, necesita además estado textual/semántico.

---

## 25. Accesibilidad, semántica y usabilidad de producción

**Estado honesto:** el prototipo tiene QA automatizada puntual y control de estados; **no está certificado** WCAG ni auditado completamente con lectores de pantalla. Las reglas siguientes son requisitos para nuevas páginas.

### 25.1. Keyboard & focus

- Todo control interactivo es alcanzable por Tab; navegación secuencial lógica.
- Enter y Space activan controles según patrón; Escape cierra overlays desplegables; flechas solo cuando el patrón lo requiere.
- Foco visible con contraste suficiente, incluso en tertiary sin borde: usar `outline` o focus ring, **no** un border permanente.
- Dialog modal atrapa foco mientras está abierto, anuncia nombre y descripción, restaura foco al elemento desencadenante.
- Custom select y combobox deben tener roles, estados `aria-expanded`, vinculación label/control, navegación y selección compatibles con su patrón elegido.
- Menús no pueden cerrarse mientras el usuario intenta pasar a sus opciones si hay hover y teclado; preferir click explícito en móvil.

### 25.2. Typography & contrast

- Base 16px; texto funcional pequeño 13-14px donde realmente se justifique.
- Badge objetivo 12px/500, tracking sobrio y etiqueta visible. No reducir funcionalidad a 10px por estética.
- Ratio WCAG 2.2 AA exigido cuando aplique: texto normal 4.5:1, texto grande 3:1 y controles/indicadores 3:1. Las texturas deben evaluarse en sus puntos más claros y oscuros.
- Nunca usar solo verde/rojo/violeta para codificar un estado: añadir palabra, icono comprensible o explicación.
- Espaciado y zoom de texto 200% sin pérdida funcional; 400% / 320 CSS px en flujos apropiados.

### 25.3. Forms

- `label` explícito vinculado al control; placeholder no es label.
- Error cercano al control con instrucción útil y vínculo mediante `aria-describedby` o estructura equivalente.
- Required identificado semántica y visualmente. Deshabilitado solo con motivo.
- Checkbox y radio: área clicable incluye etiqueta; hit target razonable; el tick no es solo un pixel blanco nativo que rompe el theme.
- Date picker custom solo cuando se implementa correctamente: entrada manual válida, formato localizado, control de errores, teclado y calendar grid; si no, priorizar fiabilidad y explicar la diferencia visual.

### 25.4. Media, motion y overlays

- `alt` de imagen informativa expresa contenido relevante; decorativa `alt=""`. No duplicar un heading en el alt.
- Videos con subtítulos y transcripción cuando corresponde; autoplay de sonido prohibido.
- Modales, toasts y alertas anuncian cambios sin interrumpir continuamente la lectura.
- Barras de scroll mantienen affordance; una scrollbar tematizada no debe quedar invisible.

---

## 26. Performance, SEO y seguridad

### 26.1. Performance goals [OBJETIVOS NO MEDIDOS PARA V6]

- Medir Core Web Vitals en el entorno real con tráfico o laboratorio; nunca prometer resultados a partir de una screenshot.
- Presupuesto inicial recomendado: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 en el percentil aplicable, en condiciones definidas.
- Imágenes responsive `srcset`/`sizes`, decodificación optimizada, `width`/`height` o `aspect-ratio`; prioridad de carga para hero, lazy para piezas por debajo del fold.
- Fondos materiales preferentemente por gradiente CSS sobrio; evitar video looping pesado como background de toda la web.
- Minimizar scripts de librería para un sitio estático de comunidad; no introducir React por defecto sin requisito de interactividad que lo justifique.
- Font-display y fallback apropiados. Verificar licencia y disponibilidad de cada fuente antes de autohospedar.

### 26.2. SEO/content structure

- Un H1 semántico por vista; H2/H3 con lógica de contenido, no por tamaño visual.
- Metadatos de title/description únicos; canonical si despliegue lo requiere; Open Graph con arte con licencia.
- URLs legibles, breadcrumbs reales y links internos consistentes.
- Datos estructurados solo para entidades/hechos verificables; no marcar como evento confirmado una partida de demo.
- Sitemaps, robots, idiomas y enlaces legales según configuración real del dominio.

### 26.3. Seguridad

- No pegar tokens, invitaciones privadas de Discord, claves de servicios o datos personales en el repositorio.
- Links externos con destino validado y atributos de seguridad apropiados cuando se abran en nueva pestaña.
- Si existe cualquier formulario que capte datos reales, definir almacenamiento, consentimiento, retención, responsable y protección anti-spam antes de anunciar que funciona.
- HTML dinámico no confiable se escapa; no insertar datos remotos en `innerHTML` sin sanitización adecuada.
- No atribuir a Lichpol imágenes de terceros ni copiar logos/arte de productos referenciados.

---

## 27. Content governance: hechos, canon y demostraciones

### 27.1. Matriz de contenido

| Categoría | Fuente de verdad | Puede publicarse | Regla |
|---|---|---|---|
| Nombre y SVG del logo | Assets oficiales adjuntos | Sí, tras aprobación de uso | No redibujar |
| Promesa visual y personalidad | V6 y este documento | Sí como dirección creativa | No convertir metáfora en hecho biográfico |
| Campañas y sinopsis | Sitio/canales oficiales autorizados | Solo tras cotejo | Registrar fuente y fecha |
| Fechas/horarios/plazas | Publicación actualizada del responsable | Solo si verificado | Estado desconocido ≠ plazas disponibles |
| Biografía / sesiones dirigidas | Declaración autorizada | Solo si comprobado | Sin números ficticios |
| Canal Discord/Twitch/YouTube | URL oficial verificada | Sí con destino vigente | No inventar invitaciones |
| Arte generado para V6 | Assets del prototipo | Sí como ilustración conceptual, sujeto a derechos | No identificar como canon confirmado |
| Material de terceros | Licencia/fuente correspondiente | Solo con permiso adecuado | No copiar por similitud |

### 27.2. Diccionario de estados de contenido

- **Verificado:** fuente responsable identificada; evidencia de dato actual.
- **Por confirmar:** dato probable o proporcionado pero no validado.
- **No disponible:** el recurso no existe; no simular fallback exitoso.
- **Conceptual:** copy o arte usado para ilustrar el diseño, sin estatus canónico.
- **Histórico:** dato correcto en un momento pasado; no mostrar como actual sin fecha.

### 27.3. Reglas de copy anti-slop

Evitar encabezados vacíos como «Descubre la magia», «Una experiencia única», «Tu destino te espera» o «Donde nacen las leyendas» cuando no aporten información específica. Preferir acciones concretas: «Consulta las campañas», «Conoce a quien dirige la mesa», «Entra en la comunidad».

No usar castellano-inglés mezclado sin razón. «Dungeon Master», «D20» y nombres de sistemas son términos de comunidad aceptables. La web en español utiliza puntuación española; los títulos en inglés se reservan para nombres de contenidos establecidos o documentación técnica.

---

## 28. Anti-AI-slop: auditoría y prohibiciones

### 28.1. Señales visuales que se deben rechazar

1. Contenedores iguales repetidos sin variación de ritmo, densidad o jerarquía.
2. Bordes dorados omnipresentes: el bronce debe ser raro y jerárquico.
3. Círculos luminosos, blobs, glows y partículas sin vínculo narrativo o de interacción.
4. Cards flotantes redondeadas de producto SaaS con icono superior y mismo título en todas.
5. Iconos aleatorios de estilo mezclado, especialmente si unos son outline y otros emoji.
6. Tipografía en cuatro familias sin motivo; serif cursiva cambiando en mitad del H1.
7. Orphans/widows: palabra final solitaria o frase de 1-2 palabras en una línea nueva.
8. Grids con alineación perfecta pero monotonía editorial y sin contenido focal.
9. Arte anime/chibi/cartoon, rostros juveniles desproporcionados o render de videojuego móvil.
10. Copy ampuloso intercambiable entre marcas y citas ficticias.
11. Datos y métricas inventados para llenar huecos del diseño.
12. Motion en cada elemento al pasar el cursor; parallax y humo continuo no justificables.
13. Componentes 'nativos' blancos que rompen la superficie oscura cuando la UI los presenta como tematizados, salvo compromiso técnico explícito y accesible.
14. Hero con texto superpuesto sobre detalle demasiado iluminado, salvado con sombras agresivas ilegibles.
15. Uso de oro como sustituto de estructura, jerarquía y buen UX.

### 28.2. Test de originalidad

Eliminar temporalmente logo/nombre. Si la página podría ser de cualquier web de RPG, falta integración de la marca mediante lenguaje, contexto, imágenes, personajes, composición y recorrido de comunidad. Reponer logo. Si la página solo funciona porque apareció el logo, la identidad todavía es superficial.

### 28.3. Test de sustracción

Por cada efecto, borde, separador, glow, icono o animación, preguntarse qué información o intención se perdería al eliminarlo. Si no se pierde nada, reducirlo o retirarlo.

---

## 29. Protocolo de implementación para agentes IA

### 29.1. Lectura obligatoria antes de actuar

1. Leer `design.md` entero y señalar el tipo de tarea: página nueva, mejora, bugfix, contenido o auditoría.
2. Inspeccionar **archivo real existente** y estilos en uso antes de diseñar un reemplazo.
3. Identificar las rutas y recursos disponibles; comprobar que los SVG y las escenas son los originales.
4. Extraer propósito, audiencia, CTA prioritario, contenido verificado, estados y restricciones.
5. Elegir template y patrones existentes. Reutilizar componentes, tokens y selectores vigentes.
6. Identificar riesgos: datos no confirmados, nuevo formulario sin backend, controles especiales, responsive, licencia.
7. Implementar cambio mínimo. No refactorizar áreas ajenas a la petición.
8. Probar el flujo y los puntos de ruptura. Revisar diff completo.
9. Entregar evidencias, limitaciones y archivos tocados. No inventar que algo pasó QA.

### 29.2. Contrato para pedir una nueva página

```text
TASK: Build a new LICHPOL page using design.md as the design and product contract.
PAGE: [route + name]
USER GOAL: [what the visitor wants]
PRIMARY CTA: [real destination/action]
CONTENT SOURCE: [paths or official references]
REQUIRED PATTERN: [template A/B/C/D/E or relevant composition]
CONSTRAINTS:
- Preserve the current website and existing design tokens.
- Use original LICHPOL logo SVGs; never redraw or recolor them.
- Dark cinematic medieval-fantasy adult art; no anime/chibi/cartoon.
- Keep container 1200px, editorial reading measure 740px and responsive layout.
- Preserve typography unity, avoid widows and orphaned sentences.
- Tertiary button 0 border; badges weight 500; selectors share chevron.
- Theme scrollbars and appropriate check/radio/calendar states.
- No invented places, dates, availability, biographies or integrations.
- Build complete loading/empty/error/success only when justified.
- Semantic HTML, accessible focus/keyboard, reduced-motion support.
- Reuse site CSS/JS; do not add dependency unless justified.
OUTPUT:
- Implemented page and minimal changed files.
- QA at 1440, 1024, 768, 390 and 320px.
- Keyboard/form/CTA checks, broken-link audit, console errors.
- Report changed files, unresolved assumptions and verified results.
```

### 29.3. Contrato para auditar una página sin cambiarla

```text
Review [route] against LICHPOL design.md.
Do not modify source code.
Inspect desktop, tablet, mobile and interaction states.
Report deviations with screenshot or selector/file/line evidence.
Classify each as P0 (blocking), P1 (high), P2 (polish).
Separate design contract violation, content uncertainty and tech/accessibility debt.
Recommend the smallest correction and explicit acceptance test.
Do not assign a score above 9 without evidence for the specific criterion.
```

### 29.4. Contrato para bugfix visual restringido

```text
Fix only [specific issue] in LICHPOL V6.
Preserve all other components, pages, tokens, artwork and content.
Read related selectors and compare before/after states.
Patch minimum CSS/JS/HTML necessary.
Verify at least one desktop and one mobile viewport, keyboard where relevant.
Review full diff and ensure no changes outside stated scope.
Keep version V6 for patches; use changelog rather than inventing V7.
```

### 29.5. Respuesta obligatoria de un agente ejecutor

- **Objetivo:** una frase operativa.
- **Fuentes:** archivos y secciones inspeccionadas.
- **Decisión:** por qué escogió esa solución y qué evita.
- **Cambios:** archivos / componentes.
- **Pruebas:** viewport, navegador, estados y resultados reales.
- **No verificado:** advertencias concretas, sin lenguaje triunfalista.
- **Impacto:** qué se preserva y cómo revertir.

---

## 30. Testing, QA, sign-off y scorecard

### 30.1. Checklist visual por página

- [ ] Logo original, proporción correcta y variante según contraste.
- [ ] Arte adulto, cinematográfico, coherente con el objetivo de la página.
- [ ] Encabezados en una sola familia; sin viudas ni frases torpemente partidas.
- [ ] Body y metadata legibles; textura no interfiere con lectura.
- [ ] Contenedor 1200/1440 respetado donde aplique, full bleed solo con intención.
- [ ] Componentes existentes reutilizados; no duplicaciones arbitrarias.
- [ ] CTA prioritario distinguible y con destino real.
- [ ] Tertiary sin borde; badges 500; select y native select comparten chevron.
- [ ] Scrollbar, radio, checkbox, calendar y combos acordes al tema.
- [ ] No hay datos falsos ni nombres de campaña presentados como canon sin fuente.
- [ ] Decoración disciplinada, sin bordes y brillos en exceso.

### 30.2. Checklist funcional

- [ ] Navegación y breadcrumbs no llevan a páginas inexistentes.
- [ ] Filtros devuelven resultados correctos; empty state permite recuperarse.
- [ ] Botones, links y controles tienen label y estado visible.
- [ ] Modal/menú/listbox se cierran con Escape y restauran foco cuando aplica.
- [ ] Formulario no confirma acciones sin efecto real y anuncia errores.
- [ ] Mobile nav abre/cierra, scroll no queda bloqueado al salir.
- [ ] `prefers-reduced-motion` respeta preferencia.
- [ ] Tab, Enter, Space y flechas funcionan según patrón.
- [ ] No hay errores de consola ni recursos rotos observados.

### 30.3. Matriz responsive de referencia

| Viewport | Qué inspeccionar obligatoriamente |
|---|---|
| 1440 | Retícula 1200, composición editorial, hero + prioridad de CTA |
| 1024 | Navegación, cards, capas de metadatos, paneles laterales |
| 768 | Transición de columnas, menús, overlays, densidad de formularios |
| 390 | Una columna, recortes de imágenes, CTAs, tamaños de toque, viudas |
| 320 | Zoom/reflow, textos largos, scroll horizontal no intencionado, dropdowns |

**No basta con detectar `scrollWidth <= clientWidth`.** Puede haber labels truncados, filtros inutilizables, foco tapado y calendarios fuera de la pantalla sin overflow global.

### 30.4. Scorecard con evidencia

El objetivo de la identidad es aspirar a 9+, pero la **nota es consecuencia de pruebas**, no una cifra decorativa. Mantener siempre las tres dimensiones solicitadas por el proyecto:

| Dimensión | Qué mide | Evidencias necesarias para ≥9/10 |
|---|---|---|
| **Dirección visual** | Coherencia, legibilidad, materialidad, ritmo, art direction, composición en múltiples páginas | Screenshots comparables; ausencia de retrocesos, QA tipográfica y responsive |
| **Identidad propia** | Logo real, ADN reconocible, voz distintiva, contraste con plantillas RPG genéricas | SVG oficiales, brand lock, hero/DM/comunidad identificables sin depender solo del logo |
| **Madurez del sistema** | Tokens, componentes, documentación, contratos de estados, accesibilidad, pruebas y mantenimiento | Inventario 64/64, QA de interacción, cobertura de templates, auditorías y debt register |

**Escala de puntuación:**

- 0-4: incompleto o inconsistente.
- 5-6: exploración funcional, importantes vacíos de marca/implementación.
- 7-8: sólido como prototipo, deuda conocida y parcialmente cubierta.
- 9: calidad alta respaldada por evidencia consistente en alcance definido.
- 10: excepcional y exhaustivamente validado en el alcance evaluado; no inferir producción por mockup.

**Evaluación de V6 histórica:** se mostraron 9.2 / 9.1 / 9.0 como valoración cualitativa **del prototipo**, no certificación externa. No heredarlas automáticamente a páginas nuevas. Recalcular tras cambios significativos; no ocultar deuda de accesibilidad o datos.

### 30.5. No regresión del Atlas

1. Los 64 identificadores y categorías siguen presentes.
2. Búsqueda y filtros funcionan en la versión entregada.
3. El custom select y el llamado Native Select mantienen chevron común en estado cerrado y abierto.
4. Los scrollables `Select`, `Combobox`, `Message Scroller` y `Scroll Area` mantienen scrollbars tematizadas.
5. Checkbox, radio y Date Picker no exhiben accidentalmente controles blancos de navegador.
6. El catálogo completo permanece accesible; **no** sustituirlo por un screenshot o lista estática como única versión.
7. Probar tamaño final del HTML completo si se empotra el Atlas; preferir pantalla independiente cuando el embedding degrade fiabilidad.

---

## 31. Arquitectura de archivos, mantenimiento y cambios

### 31.1. Árbol de referencia de V6 final

```text
LICHPOL-V6-brand-final/
├── index.html                  # Homepage
├── campanas.html               # Catálogo
├── kuroto.html                 # Dossier
├── maestro.html                # Dungeon Master
├── comunidad.html              # Comunidad
├── patrones.html               # Patrones compuestos
├── sistema.html                # Foundations y navegación DS
├── componentes.html            # Entrada al Atlas
├── atlas-v4.html               # Biblioteca visual histórica completa
├── LICHPOL-V6.html             # Vista autónoma
├── css/
│   ├── tokens.css              # Primitivos, semánticos, materiales y motion
│   └── site.css                # Componentes y layouts reales
├── js/
│   └── site.js                 # Interacción de páginas
├── assets/
│   ├── lichpol-logo-color.svg  # Original de marca
│   ├── lichpol-logo-white.svg  # Original de marca
│   ├── lichpol-logo-black.svg  # Original de marca
│   ├── tavern.webp             # Escena conceptual
│   ├── kuroto.webp             # Escena conceptual
│   ├── brunami.webp            # Escena conceptual
│   └── wizard.webp             # Bodegón conceptual
└── docs/
    ├── BRAND-LOCK.md
    ├── ART-DIRECTION-V6.md
    ├── ART-DIRECTION.md
    ├── COMPONENT-CONTRACTS.md
    ├── COMPONENTS-V6.md
    ├── CONTENT-SOURCES.md
    ├── CONTENT-NOTES.md
    └── EVALUACION-V6.md
```

No deducir una arquitectura de componentes React de este árbol: es un prototipo **HTML/CSS/JS modular**. Si se migra, conservar paridad visual y comportamental antes de sustituir stack.

### 31.2. Jerarquía de archivos y patrones de cambio

- Cambios de tokens: `css/tokens.css`; actualizar ejemplos y documentación afectados, no duplicar hex en página.
- Cambios de componentes: revisar `css/site.css` y `js/site.js`, además de HTML de uso y el Atlas cuando aplique.
- Cambios de contenido/campañas: revisar todas las rutas que reutilizan la información; conservar fuente y fecha.
- Cambios de marca: requieren aprobación; no modificar SVG originales.
- Corrección visual local: parche mínimo y regresión focal; no incrementar versión mayor por defecto.
- Cambio estructural de experiencia: revisar patrones y scorecard antes de publicar.

### 31.3. Changelog necesario para futuras iteraciones

Registrar: fecha, objetivo, versión, archivos alterados, evidencia, resultado QA, regresiones conocidas y decisión de compatibilidad. Distinguir `PATCH` de `MINOR/MAJOR` según el alcance real, no según el número de archivos.

### 31.4. Deuda reconocida y límites

- El Atlas de 64 es una **colección extensa de demostraciones**, no una librería certificada/paquetizada.
- El diseño depende de assets concretos; `design.md` no autoriza recrear logos si no están disponibles.
- La identidad gráfica está cerrada para el prototipo, pero faltan comprobaciones ópticas para favicon y posibles aprobaciones de publicación.
- Parte del contenido de campañas y datos de participación requiere verificación actual.
- A11y real, licencias, enlaces públicos, rendimiento y seguridad de posibles formularios deben pasar pruebas antes de declarar producción.
- Ninguna nota visual previa suple la aprobación del producto con usuarios y responsable de marca.

---

## 32. Declaración final: decisiones que no se negocian

> **Diseñar para Lichpol no significa decorar un SaaS con bronce y dragones.** Significa construir una puerta usable hacia historias compartidas, con una identidad personal verificable y un mundo adulto, cinematográfico, oscuro y material.
>
> Mantén los SVG originales, el sistema de tokens, la composición editorial de 1200 px, el catálogo 64/64 y los comportamientos corregidos de V6. Reutiliza el producto real antes de inventar interfaces. Ninguna página se considera terminada si no puede explicar qué permite hacer, qué es verdad, cómo funciona en móvil y qué evidencia demuestra su calidad.

**FIN DEL CONTRATO DE DISEÑO — LICHPOL V6 / BRAND FINAL.**
