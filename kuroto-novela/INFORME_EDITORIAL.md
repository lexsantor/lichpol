# Kuroto · Informe editorial de la novela

## Contenido

- `capitulos/NNN.md`: 181 capítulos, uno por directo (del 1 al 182; no existe el 92). Encabezado YAML con número, título, título del directo, evidencias usadas (`fuentes`) y escenas de Discord integradas (`escenas_discord`).
- `indice.json`: diez libros, capítulos con título, palabras, número de escenas, enlace al vídeo, fuentes y escenas de Discord.
- `GUIA_ESTILO.md`: norma de redacción, ortografía y canon de nombres aplicada.

Extensión total: unas 460.000 palabras.

## Cómo se ha hecho

1. Cada capítulo se escribió a partir de la ficha revisada del directo (`conocimiento/capitulos/NNN.json`), con consulta dirigida a la transcripción y a las escenas de rol escrito de Discord situadas entre ese directo y el siguiente. Se integraron las escenas que cambian la trama o las relaciones; se descartaron despertares, avisos y repeticiones.
2. Ningún suceso, muerte, relación, revelación o nombre es invención. Cuando la ficha no fija quién hizo algo, el texto no lo atribuye. Las preguntas abiertas de la campaña siguen abiertas.
3. Se eliminó el metajuego: dados, turnos, director, jugadores, chat y bromas fuera del mundo. Los dados que aparecen (Sun y Zia en el 023, el sensei de Gur en el 104 y el 126, el garito del 128) son objetos de la historia.
4. Corrección en dos fases: un verificador mecánico (Hunspell es_ES, caracteres prohibidos, variantes de nombre, vocabulario de mesa, patrones de estilo) y una lectura completa de corrector por tramos, con revisión de costuras entre capítulos.
5. Pase global final: puntuación de diálogos según la RAE (punto tras la comilla de cierre, también después de «?» y «!»), grafías únicas y plurales.

## Decisiones de canon

Además de la tabla de la guía:

- Byakko (no Biaco), Otakemaru, Sirth (no Shiri ni Shirz), Hakara (no Jakajara), Wel (no Well), Chilia (no Xyllya ni Tilia), Tiari (no Thiary), Víctor Frankenbolt, Mei (no Mai), Katari (también para Coratari/Khoratari), Calista Nautireida, Higeki (desde el 045; Hiki en 028-043), Jigoku no Mori, general Hati, Monasterio de las Sombras, Cuchillas Negras, Tang Sanzan o el monje Tang, Hayate (la ficha 148 lo transcribía «Jayate»).
- La dueña del burdel de Ukio es «la madame» hasta que se presenta como Madame Jone.
- El hermano de Danifae se llama Gelbreak desde su primera aparición (081), aunque las fichas usen Untuar.
- Vocabulario japonés en redonda e invariable en plural; «goliats» como plural de goliat; «rey dragón» en minúscula salvo al inicio de frase.

## Contradicciones de las fichas del repositorio

Se respetaron en el texto tal como vienen; conviene resolverlas en las fichas.

- Bebé del templo: niña en 019, 030, 032 y 049; niño en 033 y 077. El 033 lo convierte en hallazgo de trama.
- Sota: nombre del inugami de la base (020-021, que luego dice no tener nombre en 022 y 033) y del presentador de los torneos.
- Barco del pescador: usufructo en 010; propiedad con un diez por ciento en 012-013.
- Esfera fría: la recoge Shiru en 050 y la tiene Jin en 053, sin traspaso.
- Tiempo fuera de Ukio: diez meses (070), ocho (072), cinco (066).
- Permisos de oficio: valorados en quinientas monedas (042), cobrados a doscientas cincuenta (043).
- Collar de Gelbreak: lo deja en 144 y lo vuelve a tener en 147.
- Biblia: Gur la guarda en 121; Osuray se la ha dejado a Maroxi en 124.
- Cristal del portal: se raja en 117; en 123 «desde que Maroxi lo usó en un ritual».
- Aneco y Anko: dos fichas para la posadera de Hakara.
- Zogia y Zia: dos tabaxi de Ukio sin conciliar.
- Kael (Discord) y Cael (directos): sin conciliar. Cael es mediano psiónico en 049 y aasimar anciano en 082.
- Yiccardaria (166) e Icardaria (168): sin confirmar que sean la misma entidad.
- Erk: arquera según su ficha; una escena de Discord la trata en masculino.
- Ginoyama (112-128) y Hino Yama (006-088) se mantienen como personajes distintos, según el catálogo.

## Decisión pendiente

- Capítulo 132 («Miniyos»): los cazadores terminan convertidos en niños y en el 133 vuelven a ser adultos sin explicación, porque la partida trató ese directo como un especial fuera de la continuidad. La novela no inventa la vuelta. Recomendación: presentarlo en la web como interludio fuera de la línea principal (por ejemplo, un campo `interludio: true` en el índice).

## Verificación

- Verificado: los 181 capítulos pasan el verificador mecánico sin errores; cada capítulo ha recibido una lectura completa de corrección; las costuras entre capítulos se revisaron en todos los tramos.
- No verificado: no se ha cotejado cada frase con su ficha de forma exhaustiva. La fidelidad descansa en el método de escritura y en los cotejos puntuales de los correctores. Hunspell no detecta todos los errores gramaticales; la lectura humana completa sigue siendo la última garantía.
