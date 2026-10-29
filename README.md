# AF · Laboratorio de práctica

Aplicación en español para las sesiones 6–13 de Aspectos Formales de Especificación y Verificación. Construida desde `contexto_parcial_2.md` y `prompt_pagina_practica.md`.

URL de GitHub Pages prevista: https://dieguitobot.github.io/PreparacionParciAFEV2/

## Ejecutar

Requiere Python 3 y, para las pruebas, Node.js 20 o superior. La aplicación no necesita dependencias en producción.

```sh
npm run build
npm test
npm start
```

Abre http://localhost:4173. También sirve cualquier servidor de archivos estáticos; no abras `index.html` con `file://`, porque utiliza módulos JavaScript.

## Contenido

- Ocho módulos completos con ejemplos, errores frecuentes y ejercicio inmediato.
- 49 ejercicios del banco, cinco desarrollos, 16 variantes calculadas y 11 preguntas del parcial (81 en total).
- Práctica por sesión y dificultad, pistas, corrección de valores y autoevaluación mediante rúbricas.
- Parcial revisado: `card Estados = 3`. Las alternativas distractoras son didácticas; las fuentes solo conservan el resumen de las preguntas y sus claves.
- Simulacro de 40 minutos: 5 + 4 + 4 + 7 puntos. Guarda respuestas, dibujo y fecha límite; entrega al vencer el plazo, también al volver después del cierre.
- Laboratorio Plant configurable en JSON, expendedora docente y ciclo con localización/valor.
- Glosario, comparador, revisión de errores e importación/exportación JSON.

El progreso se almacena en localStorage del navegador. No hay cuentas, API ni servidor de evaluación. La corrección automática reconoce valores delimitados; no interpreta código VDM++ general. Los desarrollos y diagramas usan rúbricas didácticas no oficiales. La nota diferencia puntos automáticos, autoevaluados y pendientes.

## Publicación

El workflow `.github/workflows/pages.yml` verifica y publica los archivos estáticos al actualizar `main`. GitHub Pages debe estar habilitado con origen **GitHub Actions** en Settings → Pages. El workflow intenta habilitarlo; si GitHub requiere permisos de administración adicionales, el propietario debe seleccionar ese origen una vez.

## Pruebas

`npm test` verifica los doce criterios de aceptación a nivel de los modelos cuando corresponde: estudiantes, opciones por ID, comparación de tipos, mapas conflictivos, guardas y stocks, modelo docente, traza, Plant, persistencia del plazo y separación de notas. La interacción del navegador se comprueba por separado en `tests/browser.spec.js`, si Playwright está instalado.

```sh
npm install
npx playwright install chromium
npx playwright test
```

El material docente completo y los matices de transcripción permanecen en el documento fuente. Los simuladores no ejecutan VDMTools ni realizan model checking general. El simulacro es una práctica local, no un sistema antifraude.
