# Prompt para crear mi página de práctica del Parcial 2

Copia el siguiente texto en una conversación con una IA capaz de crear páginas web y adjunta **contexto_parcial_2.md**. El Markdown contiene las fuentes sintetizadas, el parcial revisado, soluciones y requisitos; no hace falta adjuntar de nuevo los PDF para una primera versión basada en esta síntesis.

---

Crea una página web interactiva en español para que yo, Diego, estudie y practique para el Parcial 2 de Aspectos Formales de Especificación y Verificación de la UNSA.

Usa el archivo adjunto `contexto_parcial_2.md` como fuente principal. Léelo completo antes de construir. Quiero una página funcional con ejercicios y retroalimentación, no solo un resumen ni una propuesta. Implementa una primera versión completa y verifica sus funciones principales. Si tu entorno permite publicar páginas, crea una versión privada accesible para mí y entrégame su enlace; de lo contrario, entrega el proyecto ejecutable con instrucciones breves.

## Contenido y prioridades

Cubre las sesiones 6 a 13: contratos e invariantes, lógica y cuantificadores, tipos VDM++, conjuntos, secuencias, mapas, cobertura, model checking, sistemas de transición y programas dependientes de datos.

Prioriza el estilo del parcial anterior: teoría de model checking; evaluación de expresiones; explicación del proceso; lectura y explicación de Expert, Alarm y Plant con diagrama de clases. No supongas que el siguiente examen será igual.

Distingue claramente «material del curso», «parcial anterior» y «ejercicio nuevo». Conserva las correcciones y límites de la sección 12 del Markdown: en particular, `card Estados = 3`, no 4. Las anotaciones manuscritas no son una clave oficial.

## Qué debe tener

1. Inicio con continuar práctica, elegir tema y progreso.
2. Ocho módulos de estudio con explicación sencilla, ejemplo, símbolos, errores comunes y ejercicio inmediato.
3. Práctica por temas con dificultad básica, media y similar al parcial.
4. El parcial anterior con los cuatro bloques y sus soluciones explicadas, ocultas hasta responder o pedirlas.
5. Simulacro de 40 minutos y 20 puntos, distribuido en 5 + 4 + 4 + 7. Sin pistas ni respuestas durante el intento. Guardar respuestas y tiempo límite para continuar al recargar; entregar automáticamente al agotarse el tiempo.
6. Revisión de errores con nuevas variantes y una explicación de la confusión.
7. Glosario VDM++ y comparación visual entre conjunto, secuencia y mapa.
8. Simulador de Plant para configurar expertos, especialidades, alarmas y turnos; mostrar si cumplen el invariante y por qué.
9. Simulador de la expendedora con localización, stocks, guardas y actualizaciones visibles. Respetar el modelo docente; cualquier mejora debe aparecer como variante explícita.
10. Ejecución paso a paso del ciclo con x, distinguiendo localización y valor.

Incluye todo el banco inicial de la sección 13 y las preguntas de EX. Añade variantes de expresiones con soluciones calculadas correctamente. Cada pregunta debe tener un ID estable, tema, origen, dificultad, datos, respuesta, explicación y pistas. No inventes respuestas mediante azar.

## Cómo enseñar y corregir

Usa español claro, como una explicación de un compañero que conoce el tema. Explica qué representa cada dato, qué operador se aplica y por qué da ese resultado. En errores, explica cómo corregir el razonamiento; no respondas solo «incorrecto».

Acepta diferentes órdenes en conjuntos y mapas; conserva orden y repetición en secuencias. Distingue quote, texto y carácter. Detecta mapas incompatibles y consultas fuera del dominio. Barajar alternativas no debe cambiar la respuesta correcta asociada al ID.

Para respuestas abiertas y diagramas, muestra rúbrica, respuesta de referencia y autoevaluación. No simules una evaluación semántica fiable con coincidencia de palabras. Distingue puntos automáticos, autoevaluados y pendientes; no presentes una nota completa sobre 20 sin evaluar los cuatro bloques. Las rúbricas propuestas son didácticas, no oficiales.

En ExpertToPage acepta cualquier experto que satisfaga el contrato. No exijas un experto único o el primero. En Plant respeta el alcance de los cuantificadores y el caso de calendario vacío.

La página debe funcionar sin cuenta ni claves API para la práctica básica. No afirmes que ejecuta VDMTools, compila VDM++ o hace model checking general si solo implementaste los simuladores delimitados del material.

## Diseño y persistencia

Diseño cuidado, limpio y adaptable a computadora y celular. Usa tarjetas de tema, texto legible, bloques de código y diagramas claros. Mantén visibles el avance y las acciones principales. Navegación por teclado, foco visible, etiquetas y retroalimentación que no dependa solo del color.

Guarda progreso e intentos en el navegador, permite exportarlos e importarlos como JSON y reiniciarlos con confirmación. Explica brevemente dónde se conserva el progreso. Al reabrir, ofrece continuar el intento guardado.

## Validación antes de entregar

Revisa las doce comprobaciones de aceptación de la sección 14.7 del Markdown. Como mínimo, verifica: respuestas del caso de estudiantes; comparación de conjuntos y secuencias; sobrescritura e incompatibilidad de mapas; claves al barajar opciones; stocks y guardas; traza de x=3; invariante de Plant; reloj tras recarga; y separación entre puntos automáticos y autoevaluados.

Entrega la página funcionando, resume qué implementaste y comunica cualquier limitación real. No te detengas en una lista de ideas ni me pidas decisiones rutinarias: usa estas instrucciones para construir una versión útil y completa.
