# Contexto de estudio y especificación educativa: Parcial 2

## 1. Propósito y alcance

Este archivo reúne el contenido de ocho sesiones de **Aspectos Formales de Especificación y Verificación** y el análisis de un parcial de referencia de la UNSA, semestre **2025-B**. Está preparado para estudiar y para entregarlo como fuente a una IA que construya una página de práctica en español.

**Estudiante:** Diego Raul Yauli Merma. **Material docente:** Mg. Maribel Molina Barriga, sesiones de 2026.

El parcial anterior sirve para reconocer el estilo de preguntas. **No permite asegurar que el siguiente examen repetirá preguntas ni que excluirá los otros temas.** La prioridad de práctica debe considerar el parcial y cubrir también las sesiones 6 a 13.

### Convenciones de este documento

- **Fuente docente:** conceptos y casos presentes en las diapositivas.
- **Parcial anterior:** enunciados transcritos o resumidos del documento de 2025-B.
- **Explicación didáctica / ejercicio nuevo:** desarrollo preparado para entender y practicar; no es una pregunta oficial.
- Los resultados de ejercicios se han razonado; los fragmentos VDM++ de apoyo **no se han compilado en VDMTools**.
- No usar las respuestas manuscritas del estudiante del parcial como una clave oficial.
- Los ejemplos de código se presentan con caracteres simples y sintaxis VDM++. Una firma de función usa `->`; una de operación usa `==>`.

## 2. Fuentes y trazabilidad

Páginas contadas desde la primera página del PDF, incluyendo portada.

| ID | Archivo fuente | Contenido utilizado |
|---|---|---|
| S06 | Sesión 6.Clases invariantes pre y post condiciones - copia(1).pdf | Lógica, monitor de temperatura, conectores, cuantificadores, formulación de propiedades; especialmente pp. 5-26. |
| S07 | Sesión 7. Otros Tipos de datos(1).pdf | Estructura de clase, booleanos, números, token, char, quote, producto, registro, unión, opcional e invariantes; pp. 4-27. |
| S08 | Sesión 8.Tipo Set(1).pdf | Constructores, operadores de conjuntos y controlador de robot; pp. 4-12. |
| S09 | Sesión 9.Tipo Map(1).pdf | Secuencias, mapas, operadores, planta química y monedero; pp. 4-25. |
| S10 | Sesión 10. Análisis de Cobertura(1).pdf | Comandos de cobertura, monedero y sistema de detección de gases; pp. 5-13. |
| S11 | Sesión 11. Principios del Model Checking(1).pdf | Verificación formal, concurrencia, exploración de estados y herramientas; especialmente pp. 11-29 y 41-42. |
| S12 | Sesión 12. Modelamiento del Comportamiento del Código STE_(1).pdf | Cajero, máquina expendedora, estados, acciones, transiciones, estado terminal y ejecuciones; pp. 4-22. |
| S13 | Sesión 13. Modelamiento de programas dato dependientes_(1).pdf | Variables, guardas, asignaciones, grafo de programa y sistema de transición; pp. 5-29. |
| EX | examen_parcial_2_huayhua_yourdyy.pdf | P. 1: preguntas 1-3. P. 2: pregunta 4, clases Expert, Alarm y Plant. P. 3: desarrollo manuscrito y observaciones. |

Se revisaron tanto texto como imágenes: varias diapositivas contienen código y diagramas que no aparecen en la extracción textual. Este archivo es una síntesis de estudio, no una transcripción literal completa de cada diapositiva. Los enlaces a videos y las publicaciones mencionadas en las diapositivas no fueron consultados.

## 3. Qué exige el parcial anterior

Duración indicada: **40 minutos**. Total: **20 puntos**. Nota aprobatoria indicada: **10.5**.

| Bloque | Puntos | Tarea | Competencia que conviene practicar |
|---|---:|---|---|
| Pregunta 1 | 5 | Cinco preguntas de alternativa múltiple | Reconocer qué es verificación formal y model checking. |
| Pregunta 2 | 4 | Evaluar cuatro expresiones sobre estudiantes, mapas y conjuntos | Distinguir dominio, sobrescritura de mapas, subconjunto y cardinalidad. |
| Pregunta 3 | 4 | Describir el proceso de model checking | Explicar el procedimiento completo con palabras propias. |
| Pregunta 4 | 7 | Analizar código VDM++, explicarlo y elaborar diagrama de clases | Leer atributos, tipos, operaciones, invariantes, pre/postcondiciones y asociaciones. |

Distribución sugerida para practicar los 40 minutos: 5 para teoría, 7 para expresiones, 8 para proceso y 20 para código y diagrama. Esta distribución es una recomendación de estudio, no una instrucción del examen.

## 4. Sesión 6: lógica, invariantes, precondiciones y postcondiciones

### 4.1. Contratos de una operación

| Elemento | Pregunta que responde | Ejemplo |
|---|---|---|
| Tipo | ¿Qué clase de valor puedo guardar? | `saldo : nat` permite enteros desde 0. |
| Invariante | ¿Qué propiedad caracteriza los estados válidos? | El saldo no supera un límite. |
| Precondición | ¿Qué debe cumplirse antes de una llamada válida? | El retiro solicitado no supera el saldo. |
| Postcondición | ¿Qué garantiza la operación al terminar una llamada válida? | El nuevo saldo es el anterior menos el retiro. |

Una precondición no es automáticamente un mecanismo de manejo de errores: limita las llamadas para las que la especificación promete el comportamiento descrito. Después de una operación válida, debe conservarse la validez del estado.

**Ejemplo didáctico:**

```vdmpp
class Cuenta
instance variables
  saldo : nat := 0;
  inv saldo <= 1000;
operations
  public Depositar : nat ==> ()
  Depositar(monto) == saldo := saldo + monto
  pre saldo + monto <= 1000
  post saldo = saldo~ + monto;

  public Retirar : nat ==> ()
  Retirar(monto) == saldo := saldo - monto
  pre monto <= saldo
  post saldo = saldo~ - monto;
end Cuenta
```

`saldo~` representa el valor anterior de la variable en la postcondición. `()` indica ausencia de un resultado útil de la operación. El tipo `nat` ya impide representar un saldo negativo; el invariante añade el límite superior.

### 4.2. Proposición y predicado

- Proposición: afirmación con valor verdadero o falso, como `3 < 27`.
- Predicado con variable libre: expresión como `x < 27`, cuya verdad depende de `x`.
- Al asignar un valor o cuantificar la variable, se puede evaluar la afirmación correspondiente.

### 4.3. Conectores

| VDM++ | Significado | Cuándo es verdadero |
|---|---|---|
| `not P` | Negación | Cuando P es falso. |
| `P and Q` | Conjunción | Cuando ambos son verdaderos. |
| `P or Q` | Disyunción inclusiva | Cuando al menos uno es verdadero. |
| `P => Q` | Implicación | En todos los casos salvo P verdadero y Q falso. |
| `P <=> Q` | Equivalencia | Cuando ambos tienen el mismo valor lógico. |

| P | Q | P and Q | P or Q | P => Q | P <=> Q |
|---|---|---|---|---|---|
| false | false | false | false | true | true |
| false | true | false | true | true | false |
| true | false | false | true | false | false |
| true | true | true | true | true | true |

Precedencia presentada: `not`, `and`, `or`, `=>`, `<=>`. La implicación se agrupa hacia la derecha. Usar paréntesis para que la intención resulte clara.

### 4.4. Cuantificadores

```vdmpp
forall x in set S & P(x)
exists x in set S & P(x)
```

`forall` exige que todos cumplan; `exists` exige que al menos uno cumpla. También existen enlaces por tipo, como `forall n : nat & n >= 0`.

Sobre conjunto vacío: el universal es verdadero y el existencial es falso. Para practicar de forma ejecutable, preferir dominios finitos explícitos.

El orden de cuantificadores distintos cambia el significado:

- Para cada entero `y` existe un entero `x` mayor que `y`: verdadero.
- Existe un entero `x` mayor que todos los enteros `y`: falso.

### 4.5. Monitor de temperatura

La fuente usa cinco lecturas y un límite de 400. En este modelo:

```vdmpp
Monitor :: temps : seq of nat
           alarm : bool
inv m == len m.temps = 5;
```

Predicados didácticos coherentes con las definiciones:

```vdmpp
Rising(m) == m.temps(1) < m.temps(5)
OverLimit(m) == exists i in set inds m.temps & m.temps(i) > 400
COverLimit(m) == forall i in set inds m.temps & m.temps(i) > 400
Safe(m) == (m.temps(3) > 400 => m.temps(5) < 400)
```

`Rising` compara primera y última lectura; no exige que cada paso sea creciente. `Safe` es la regla particular de las diapositivas, no una regla general de seguridad industrial.

La alarma debe cumplir `m.alarm <=> not Safe(m)`. Si se integra en el invariante, debe mantenerse además la longitud 5.

**Fronteras:** superar 400 significa `> 400`; una lectura exactamente 400 no supera el límite. Sin embargo, si la tercera es 401 y la última es 400, `Safe` es falso porque exige que la última sea estrictamente menor que 400.

Formulaciones útiles:

```vdmpp
-- Todas estrictamente entre 50 y 400
forall i in set inds m.temps &
  m.temps(i) > 50 and m.temps(i) < 400

-- Cada lectura es exactamente 10 mayor que la anterior
forall i in set (inds m.temps \ {1}) &
  m.temps(i) = m.temps(i-1) + 10

-- Dos posiciones diferentes superan el límite
exists i,j in set inds m.temps &
  i <> j and m.temps(i) > 400 and m.temps(j) > 400

-- Valores distintos en posiciones distintas
forall i,j in set inds m.temps &
  i <> j => m.temps(i) <> m.temps(j)

-- Una lectura es estrictamente menor que todas las demás
exists i in set inds m.temps &
  forall j in set inds m.temps &
    i <> j => m.temps(i) < m.temps(j)
```

**Correcciones de lectura de S06:** en p. 24, el enunciado «mayor en 10 que su predecesor» no coincide con la desigualdad impresa en dirección contraria. Se usa aquí la igualdad anterior. En p. 19, el predicado debe referirse a `m.temps(i)`, no a `temps(i)` sin contexto. En la condición de alarma, si `Safe` recibe un `Monitor`, la llamada coherente es `Safe(m)`, no `Safe(m.temps)`.

## 5. Sesión 7: tipos básicos y compuestos

### 5.1. Tipos básicos

| Tipo | Valores o ejemplo | Idea |
|---|---|---|
| `bool` | `true`, `false` | Resultado lógico. |
| `nat` | `0,1,2,...` | Natural, incluye cero. |
| `nat1` | `1,2,3,...` | Natural positivo. |
| `int` | `...,-1,0,1,...` | Enteros. |
| `rat`, `real` | Racionales y reales | Valores numéricos más generales. |
| `char` | `'A'` | Un carácter. |
| `seq of char` | `"Ana"` | Texto como secuencia de caracteres. |
| `token` | `mk_token(5)` | Identificador opaco; se compara por igualdad/desigualdad. |
| Quote | `<Regular>` | Literal simbólico de un tipo enumerado. |

No confundir `'A'`, `"A"` y `<A>`: carácter, texto y quote son valores de tipos distintos.

Operadores numéricos presentes: `+`, `-`, `*`, `/`, `div`, `rem`, `mod`, `**`, `abs`, `floor`, y comparadores. Para ejercicios con naturales: `7 div 2 = 3`, `7 mod 2 = 1`, `2 ** 3 = 8`.

### 5.2. Producto y registro

**Producto:** agrupa valores por posición.

```vdmpp
Fecha = nat1 * nat1 * nat;
```

Un valor posible es `mk_(28,10,2026)`. Si `f` es ese valor, `f.#1 = 28`. El producto solo especifica componentes; no valida por sí solo calendarios reales.

**Registro:** agrupa campos con nombre.

```vdmpp
Student :: name : seq of char
           grades : seq of nat
           status : <Regular> | <Condicionado> | <Retirado>;
```

Valor: `mk_Student("Ana", [15,18,16], <Regular>)`. Acceso: `s.name`, `s.grades`, `s.status`. El constructor conserva el orden declarado de los campos. `is_Student(s)` comprueba pertenencia al tipo de registro.

### 5.3. Unión, opcional e invariantes de tipo

- Unión: `Estado = <Regular> | <Condicionado> | <Retirado>`.
- Opcional: `[nat]` admite un natural o `nil`.
- Un opcional no equivale a una secuencia: `[nat]` es un tipo; `[1,2]` es un valor de secuencia.
- Invariante: limita un tipo a los valores que satisfacen un predicado.

```vdmpp
Nota = nat
inv n == n <= 20;
```

Ejemplo del marcador deportivo de S07: `points = 3 * won + drawn`. Ganados y empatados determinan los puntos; un registro con valores inconsistentes viola el invariante.

### 5.4. Anatomía de una clase

`types` declara tipos; `instance variables`, estado; `values`, valores constantes; `functions`, funciones; `operations`, operaciones; `inv`, invariantes. El esquema docente también muestra `thread` y `sync`; no se desarrollan aquí como un tema adicional de concurrencia VDM++.

Una función expresa un cálculo sin modificar el estado del objeto. Una operación puede consultar o modificarlo; `pure` indica una operación sin efectos de modificación. Un constructor crea e inicializa un objeto. Referirse a un tipo de otra clase: `Expert\`Qualification`.

## 6. Sesión 8: conjuntos (`set`)

Un conjunto no tiene orden y no repite elementos.

```vdmpp
A = {1,2,3};
B = {3,4};
Vacio = {};
```

| Expresión | Resultado | Explicación |
|---|---|---|
| `2 in set A` | `true` | Pertenencia. |
| `5 not in set A` | `true` | Ausencia. |
| `A union B` | `{1,2,3,4}` | Reúne elementos. |
| `A inter B` | `{3}` | Elementos comunes. |
| `A \ B` | `{1,2}` | En A, pero no en B. |
| `{1,2} subset A` | `true` | Todos los de la izquierda están a la derecha. |
| `A subset A` | `true` | Un conjunto es subconjunto de sí mismo. |
| `A psubset A` | `false` | Subconjunto propio exige que sean diferentes. |
| `{} subset A` | `true` | El vacío es subconjunto de cualquier conjunto. |
| `card {1,1,2}` | `2` | Cuenta elementos distintos. |
| `{1,2} = {2,1}` | `true` | El orden no importa. |

Comprensión:

```vdmpp
{x * 3 | x in set {1,2,3} & x > 1}
-- Resultado: {6,9}
```

### Caso del robot

S08 modela puntos con coordenadas e índice, un conjunto `journeyPlan` y un controlador. Una propiedad del plan exige que los índices formen `{1,...,card journeyPlan}`. Otra propiedad exige que dos puntos con las mismas coordenadas sean el mismo punto:

```vdmpp
forall p1,p2 in set journeyPlan &
  p1.GetCoord() = p2.GetCoord() => p1 = p2
```

No asumir que un `set of Point` elimina automáticamente dos objetos distintos con las mismas coordenadas: la propiedad anterior añade esa exigencia sobre sus atributos. El orden de recorrido se representa mediante índices, no mediante el orden interno del conjunto.

## 7. Sesión 9: secuencias y mapas

### 7.1. Secuencias

Una secuencia conserva orden y repeticiones. Los índices VDM++ empiezan en **1**.

Sea `s = [3,1,3]`:

| Expresión | Resultado |
|---|---|
| `len s` | `3` |
| `hd s` | `3` |
| `tl s` | `[1,3]` |
| `s(2)` | `1` |
| `elems s` | `{1,3}` |
| `inds s` | `{1,2,3}` |
| `s ^ [5]` | `[3,1,3,5]` |
| `conc [[1,2],[3]]` | `[1,2,3]` |
| `s ++ {2 |-> 9}` | `[3,9,3]` |

`[]` es secuencia vacía; `seq1 of T` exige al menos un elemento. `hd` y `tl` requieren secuencia no vacía. `s(i)` exige `i in set inds s`; una modificación por `++` requiere índices válidos.

Diferencia clave: `len [1,1,2] = 3`, mientras `card (elems [1,1,2]) = 2`. `[1,2] <> [2,1]`.

### 7.2. Mapas

Un mapa relaciona claves con valores. Cada clave tiene un único valor; distintas claves pueden compartir el mismo valor.

```vdmpp
m = {"Ana" |-> 16, "Luis" |-> 11, "Marta" |-> 18};
```

| Expresión | Resultado o significado |
|---|---|
| `dom m` | `{"Ana","Luis","Marta"}` |
| `rng m` | `{16,11,18}` |
| `m("Ana")` | `16` |
| `"Marta" in set dom m` | `true` |
| `m ++ {"Ana" |-> 20}` | Reemplaza el valor de Ana por 20. |
| `m ++ {"Pedro" |-> 14}` | Añade Pedro, conservando las otras claves. |
| `{"Ana"} <: m` | Restringe a la clave Ana. |
| `{"Ana"} <-: m` | Elimina la clave Ana. |
| `m :> {16}` | Conserva pares con valor 16. |
| `m :-> {16}` | Elimina pares con valor 16. |

El mapa vacío es `{|->}`. Consultar una clave inexistente no devuelve automáticamente 0 o `nil`: la aplicación queda indefinida. Antes debe comprobarse pertenencia al dominio.

**Unión compatible y sobrescritura:**

- `m1 munion m2` requiere que las claves compartidas tengan el mismo valor.
- `m1 ++ m2` permite conflicto y usa el valor de la derecha.
- `{1 |-> 10} munion {1 |-> 20}` es incompatible.
- `{1 |-> 10} ++ {1 |-> 20}` resulta `{1 |-> 20}`.

**Mapa inyectivo:** `inmap A to B` no permite que dos claves diferentes compartan un valor. `{1 |-> 8,2 |-> 8}` puede ser un `map`, pero no un `inmap`.

Otros operadores de la tabla docente: `merge` combina un conjunto de mapas compatibles; `inverse m` requiere mapa inyectivo; `m1 comp m2` aplica primero `m2` y luego `m1`, con los valores intermedios dentro del dominio apropiado; `m ** n` representa iteración bajo las condiciones de tipos y dominio necesarias. Son contenidos de repaso; no aparecen directamente en el parcial adjunto.

Comprensión:

```vdmpp
{i |-> i*i | i in set {1,2,3}}
-- {1 |-> 1,2 |-> 4,3 |-> 9}
```

### 7.3. Comparación que conviene memorizar

| Estructura | Orden | Repeticiones | Consulta | Tamaño |
|---|---|---|---|---|
| Conjunto | No | No | `x in set S` | `card S` |
| Secuencia | Sí | Sí | `s(i)` | `len s` |
| Mapa | No | Claves únicas; valores pueden repetirse | `m(k)` | `card (dom m)` |

### 7.4. Caso monedero

S09 usa un monedero con saldo e identificador de tarjeta. Un sistema guarda un mapa de tarjetas a monederos y un registro de transferencias. Para transferir se comprueba que ambas tarjetas existan, sean diferentes y haya saldo suficiente en el origen. Se reduce el saldo del origen, se incrementa el del destino y se registra la operación.

Ejercicio didáctico: origen 50, destino 20, transferencia 15. Resultado: origen 35 y destino 35. La suma se conserva en 70 si no hay comisiones ni otros cambios.

## 8. Sesión 10: análisis de cobertura

La cobertura informa qué partes de una especificación fueron ejecutadas por las pruebas registradas. Permite encontrar partes pendientes de probar.

Secuencia de trabajo de los ejemplos de VDMTools:

```text
tcov reset
create md : new Monedero(100,[1,2,3,4])
print md.Retirar(50)
tcov write vdm.tc
rtinfo vdm.tc
```

Estos nombres pertenecen al caso Monedero; solo funcionan si la clase correspondiente está cargada y es válida.

| Comando | Función |
|---|---|
| `tcov reset` | Reinicia los contadores de cobertura. No elimina el código. |
| `create ...` | Crea un objeto con el que ejecutar pruebas. |
| `print ...` | Evalúa una expresión u operación y muestra el resultado. |
| `tcov write vdm.tc` | Guarda la información acumulada de cobertura. No genera pruebas nuevas. |
| `rtinfo vdm.tc` | Muestra el resumen de cobertura del archivo. |

Inicializar la especificación prepara su ejecución; no debe confundirse con reiniciar expresamente la cobertura. Para comenzar una medición limpia, usar `tcov reset`.

Interpretación: el ejemplo Monedero muestra constructor con 100%, retiro con 61%, una operación con 0% y cobertura total de 37%. El total depende de las unidades instrumentadas, no del promedio simple de porcentajes por operación. Otro ejemplo docente de gases muestra 100% tras su suite.

**100% de cobertura no demuestra corrección completa:** no garantiza todas las combinaciones, entradas, caminos ni propiedades. La página debe hablar de cobertura de sus ejercicios o de sus ramas simuladas, sin fingir que es un informe real de VDMTools.

Casos de prueba que conviene pensar: camino normal, valores frontera, alternativa de una condición y llamada que incumple una precondición. Una prueba inválida puede mostrar un incumplimiento de contrato; no prueba un resultado normal.

## 9. Sesión 11: principios de model checking

### 9.1. Idea principal

La verificación formal comprueba propiedades mediante modelos y razonamiento matemático. **Model checking** comprueba automáticamente si un modelo satisface una propiedad formal, explorando sistemáticamente los estados relevantes alcanzables, dentro del modelo y método usados.

No se limita a ejecutar unos pocos ejemplos. Si falla una propiedad, la herramienta puede producir un **contraejemplo**: una ejecución que muestra la violación. Si se verifica, el resultado se refiere al modelo y a la propiedad formalizados; su relación con el sistema real depende de que el modelado sea adecuado.

### 9.2. Proceso que se debe poder explicar

1. Entender el sistema y el requisito que se quiere revisar.
2. Construir un modelo con estados, estado inicial, acciones y transiciones; incluir variables cuando afecten al comportamiento.
3. Expresar el requisito como una propiedad formal.
4. Dar modelo y propiedad al verificador.
5. Ejecutar la exploración y comprobación.
6. Interpretar el resultado: satisfacción o contraejemplo, según la herramienta y propiedad.
7. Si hay fallo, revisar el sistema, el modelo o la formulación de la propiedad; corregir y volver a verificar.

**Respuesta breve practicable:** «Primero represento el sistema mediante estados y transiciones. Luego expreso formalmente la propiedad que quiero verificar. El model checker explora los estados alcanzables y comprueba si se cumple. Si encuentra una violación, entrega un contraejemplo que permite ubicar el problema. Después reviso y corrijo el modelo o el diseño y repito la verificación».

### 9.3. Conceptos de apoyo

- Estado alcanzable: existe una ejecución desde un estado inicial que llega a él.
- Seguridad: algo malo no ocurre; ejemplo, el stock nunca es negativo.
- Vivacidad: algo deseado termina ocurriendo; ejemplo, una solicitud acaba atendida, bajo los supuestos apropiados.
- Explosión de estados: muchas variables y procesos pueden producir un número muy grande de combinaciones.
- Abstracción: simplificar el modelo conservando lo necesario para la propiedad de interés.

Las distinciones seguridad/vivacidad y abstracción se incluyen como apoyo didáctico, sin exigir un curso completo de lógica temporal. S11 muestra notación como `AG safe`; puede leerse «en todos los caminos y siempre, se cumple safe». No convertir CTL/LTL avanzado en el centro de la práctica si no se solicita.

Las diapositivas mencionan NuSMV, SPIN, TLA+ y SCADE Suite. Para precisión: TLA+ es un lenguaje de especificación; TLC es un model checker de especificaciones TLA+.

### 9.4. Ejemplo concurrente de las diapositivas

Tres procesos comparten `x`: uno incrementa mientras `x < 200`, otro decrementa mientras `x > 0` y otro lo pone en 0 cuando `x = 200`.

Si comprobar una condición y actualizar son pasos separados, no basta observar cada proceso aislado para afirmar `0 <= x <= 200`.

**Contraejemplo didáctico con lecturas actuales en cada asignación:**

1. Con `x = 1`, el decrementador comprueba `x > 0` y queda preparado para decrementar.
2. Se intercalan incrementos hasta llegar a `x = 200`.
3. El tercer proceso comprueba `x = 200` y ejecuta `x := 0`.
4. El decrementador pendiente ejecuta `x := x - 1` y obtiene `-1`.

La intercalación viola el límite. La conclusión depende de la atomicidad definida: una condición y una actualización indivisibles representarían otro modelo.

## 10. Sesión 12: modelar comportamiento con sistemas de transición

Un sistema de transición representa estados y pasos posibles. En los diagramas: nodos = estados, flechas = transiciones, etiquetas = acciones y una flecha entrante sin origen señala el estado inicial.

Como formalización de apoyo puede usarse `TS = (S, Act, ->, I, AP, L)`: estados, acciones, relación de transición, estados iniciales, proposiciones atómicas y función de etiquetado. Las figuras de clase se concentran en estados, acciones, transiciones y estado inicial.

- Ejecución: recorrido válido siguiendo flechas y sus acciones.
- Estado terminal: sin transiciones salientes.
- Bucle: una transición vuelve al mismo estado o una ruta regresa a un estado anterior.
- Un estado terminal puede representar finalización esperada. Para llamarlo bloqueo debe evaluarse el requisito del sistema.

### 10.1. Máquina expendedora sin datos

| Origen | Acción | Destino |
|---|---|---|
| IDLE | coin | SELECT |
| SELECT | water | W |
| SELECT | cola | C |
| W | get_water | IDLE |
| C | get_cola | IDLE |

Traza válida: `IDLE --coin--> SELECT --water--> W --get_water--> IDLE`.
Traza inválida: elegir `water` directamente desde `IDLE`.

### 10.2. Cajero

S12 construye progresivamente estados `IDLE`, `PIN?`, `TRAN`, `BAL`, `MORE`, `DRAW` y `$$`. Acciones: insertar tarjeta, PIN correcto o incorrecto, consultar saldo, imprimir, elegir otra operación, introducir monto y entregar dinero.

Ejemplos: PIN incorrecto retorna a `IDLE`; desde `TRAN` se elige saldo o retiro; desde `MORE` se vuelve a `TRAN` con `yes` o a `IDLE` con `no`. Para practicar, hay que explicar una ruta y reconocer qué acción habilita cada cambio.

## 11. Sesión 13: programas dependientes de datos

El comportamiento depende de **variables + ramificaciones condicionales + asignaciones**.

### 11.1. Grafo de programa y sistema de transición

- Localización: punto de control del programa, por ejemplo antes de comprobar un `while`.
- Guarda: condición que debe ser verdadera para tomar una transición.
- Asignación: actualización de datos.
- Estado completo: combinación de localización y valores de variables.
- Dos estados pueden compartir localización y ser diferentes por sus datos.

El grafo de programa describe control y actualizaciones de forma compacta. El sistema de transición resultante desarrolla combinaciones concretas de localizaciones y valores, partiendo de las condiciones iniciales.

### 11.2. Expendedora con existencias

Variables de la fuente: `nwater`, `ncola`, `max`. Inicialmente `nwater = max` y `ncola = max`.

| Origen | Acción | Guarda | Actualización | Destino |
|---|---|---|---|---|
| IDLE | coin | true | Sin cambio de stock | SELECT |
| SELECT | water | `nwater > 0` | Sin cambio | W |
| SELECT | cola | `ncola > 0` | Sin cambio | C |
| W | get_water | true | `nwater := nwater - 1` | IDLE |
| C | get_cola | true | `ncola := ncola - 1` | IDLE |
| SELECT | ret_coin | `nwater = 0 and ncola = 0` | Sin cambio | IDLE |
| IDLE | refill | true | Ambos stocks vuelven a `max` | IDLE |

Se conservan las acciones del esquema docente: `ret_coin` devuelve de SELECT a IDLE cuando ambas existencias son cero; `refill` es un bucle en IDLE y la arista `coin` aparece sin guarda adicional. Con ambos stocks en cero puede alcanzarse SELECT: no hay bebida seleccionable, pero sí se puede devolver la moneda. No añadir silenciosamente una guarda nueva a `coin`; eso sería modificar el modelo.

Con `max = 1`, ejemplo:

```text
(IDLE,1,1) --coin--> (SELECT,1,1)
--water--> (W,1,1)
--get_water--> (IDLE,0,1)
--coin--> (SELECT,0,1)
--cola--> (C,0,1)
--get_cola--> (IDLE,0,0)
--refill--> (IDLE,1,1)
```

En `(SELECT,0,1)`, `water` no está habilitada y `cola` sí. El stock cambia al entregar, no al seleccionar, en este modelo. Los valores deben permanecer entre 0 y `max`.

Con `max = 1`, el producto bruto de 4 localizaciones y dos variables binarias da 16 combinaciones; no todas son alcanzables. En el modelo indicado son alcanzables 12: 4 IDLE, 4 SELECT, 2 W con agua disponible y 2 C con cola disponible. Hay que distinguir combinaciones posibles por tipo de estados efectivamente alcanzables.

### 11.3. Ciclo de la fuente

```text
while (x > 0)
    if (x mod 2 = 0)
        x := x - 2
    else
        x := x - 1
```

Localizaciones: `l1` comprueba el ciclo; `l2` ejecuta la rama correspondiente; `l3` representa la salida.

| Origen | Guarda | Actualización | Destino |
|---|---|---|---|
| l1 | `x > 0` | Ninguna | l2 |
| l1 | `x <= 0` | Ninguna | l3 |
| l2 | `x mod 2 = 0` | `x := x - 2` | l1 |
| l2 | `x mod 2 = 1` | `x := x - 1` | l1 |

El segundo caso corresponde al `else` para enteros positivos alcanzados desde el ciclo.

Con `x = 3` inicialmente:

```text
(l1,3) -> (l2,3) -> (l1,2) -> (l2,2)
       -> (l1,0) -> (l3,0)
```

Para `x = 4`: `4 -> 2 -> 0` si solo se muestran valores después de las asignaciones. Para `x = 0`, sale de inmediato sin ejecutar el cuerpo. Al dibujar todos los estados debe conservarse también la localización.

## 12. Parcial anterior: desarrollo revisado

### 12.1. Pregunta 1: cinco alternativas, 5 puntos

Resumen fiel de cada pregunta y respuesta correcta por contenido:

| N.º | Qué pregunta | Respuesta | Razón |
|---|---|---|---|
| 1 | Propósito principal de verificar sistemas según Baier y Katoen | **b)** Comprobar que un sistema cumple sus especificaciones formales. | El objetivo es el cumplimiento de propiedades especificadas. |
| 2 | Qué distingue a la verificación formal | **c)** Aplica razonamiento matemático y modelos formales. | No se basa solo en experiencia o experimentación. |
| 3 | Técnica que analiza el espacio de estados para verificar propiedades | **b)** Model checking. | Explora sistemáticamente el modelo. |
| 4 | Qué describe mejor el enfoque de model checking | **a)** Verifica propiedades sobre modelos mediante exploración automática del espacio de estados. | Es la definición central del método. |
| 5 | Estructuras usadas para representar comportamiento | **c)** Autómatas finitos y sistemas de transición etiquetados. | Representan estados y cambios posibles. |

Letras de referencia: **b, c, b, a, c**. Si la página mezcla alternativas, debe cambiar sus posiciones y conservar la respuesta por un identificador estable, sin memorizar estas letras como regla.

### 12.2. Pregunta 2: estudiantes, 4 puntos

Datos del examen, con comillas normalizadas:

```vdmpp
public Student ::
  name : seq of char
  grades : seq of nat
  status : <Regular> | <Condicionado> | <Retirado>;

S1 = mk_Student("Ana", [15,18,16], <Regular>);
S2 = mk_Student("Luis", [11,13,10], <Condicionado>);
S3 = mk_Student("Marta", [17,19,18], <Regular>);
S4 = mk_Student("Carlos", [8,9,7], <Retirado>);
Estudiantes = {S1,S2,S3,S4};
Promedios = {"Ana" |-> 16, "Luis" |-> 11,
             "Marta" |-> 18, "Carlos" |-> 8};
Aprobados = {<Regular>,<Condicionado>};
Estados = {s.status | s in set Estudiantes};
```

Estos son datos de un enunciado, no un archivo de clase completo listo para compilar. Los promedios se toman como dados: no reemplazar 16 por 49/3 ni recalcular el mapa.

**a)** `"Marta" in set dom Promedios` = **true**. El dominio contiene los nombres y Marta está registrada.

**b)** `Promedios ++ {"Pedro" |-> 14}` =

```vdmpp
{"Ana" |-> 16, "Luis" |-> 11, "Marta" |-> 18,
 "Carlos" |-> 8, "Pedro" |-> 14}
```

Como Pedro no estaba, se añade. Si la clave ya existiera, prevalecería el valor del mapa de la derecha.

**c)** `{<Retirado>} subset Estados` = **true**, porque Carlos tiene ese estado.

**d)** `card Estados` = **3**:

```vdmpp
Estados = {<Regular>,<Condicionado>,<Retirado>}
```

Ana y Marta comparten `<Regular>`, que solo aparece una vez en el conjunto. Hay cuatro estudiantes y tres estados diferentes. La respuesta manuscrita 4 no debe usarse como solución.

### 12.3. Pregunta 3: proceso de model checking, 4 puntos

Utilizar la secuencia de la sección 9.2. Una respuesta sólida debe incluir **modelo**, **propiedad formal**, **exploración automática**, **resultado o contraejemplo** y **revisión**. No basta escribir «revisar que el código funcione».

Rúbrica didáctica propuesta, no oficial: 1 punto por modelado, 1 por formalización de propiedad, 1 por comprobación automática y 1 por interpretar resultado y explicar corrección/reverificación.

### 12.4. Pregunta 4: planta química, 7 puntos

Se pide analizar y explicar el código en lenguaje natural y elaborar el diagrama de clases. El caso reaparece en S09, por lo que merece práctica especial.

#### Requisitos del caso

La planta registra alarmas; cada alarma requiere una especialidad. Los expertos pueden poseer varias especialidades. Para cada periodo asignado debe haber expertos de turno y, para cada alarma registrada, al menos un experto de turno capaz de atenderla. Se debe poder elegir un experto, contar cuántos están disponibles y consultar en qué periodos trabaja uno.

#### Tipos y estado

| Clase | Elemento | Tipo o significado |
|---|---|---|
| Expert | Qualification | `<Mech> | <Chem> | <Bio> | <Elec>`: mecánica, química, biológica, eléctrica. |
| Expert | quali | `set of Qualification`: especialidades del experto. |
| Alarm | String | `seq of char`: texto. |
| Alarm | descr | Descripción. |
| Alarm | reqQuali | `Expert\`Qualification`: especialidad exigida. |
| Plant | Period | `token`: identificador de periodo. |
| Plant | alarms | `set of Alarm`: alarmas registradas. |
| Plant | schedule | `map Period to set of Expert`: expertos de turno por periodo. |

#### Operaciones

| Clase | Operación | Explicación |
|---|---|---|
| Expert | `Expert(qs)` | Constructor: guarda las especialidades recibidas. |
| Expert | `GetQuali()` | Devuelve las especialidades sin modificarlas; aparece como operación pura. |
| Alarm | `Alarm(quali,str)` | Constructor: guarda la especialidad requerida y el texto. |
| Alarm | `GetReqQuali()` | Devuelve la especialidad requerida. |
| Plant | `Plant(als,sch)` | Constructor: recibe alarmas y turnos; exige que cumplan PlantInv. |
| Plant | `ExpertToPage(a,p)` | Selecciona un experto de turno en p con la especialidad exigida por a. |
| Plant | `NumberOfExperts(p)` | Devuelve `card schedule(p)` para un periodo registrado. |
| Plant | `ExpertIsOnDuty(ex)` | Devuelve los periodos cuyo conjunto de turno contiene a ex. |

#### Invariante PlantInv

Reconstrucción legible de la condición del examen:

```vdmpp
PlantInv(as,sch) ==
  (forall p in set dom sch & sch(p) <> {}) and
  (forall a in set as &
     forall p in set dom sch &
       exists expert in set sch(p) &
         a.GetReqQuali() in set expert.GetQuali());
```

Primera parte: cada periodo que aparece en el mapa tiene al menos un experto.
Segunda parte: para cada alarma y cada periodo registrado hay algún experto de ese turno que posee la especialidad requerida.

No exige que un mismo experto atienda todas las alarmas o trabaje en todos los periodos. Los cuantificadores permiten elegir un experto diferente para cada combinación de alarma y periodo.

**Fronteras:** si no hay periodos en el mapa, las cuantificaciones sobre periodos son verdaderas sobre el vacío. La condición no exige por sí sola que exista algún periodo. Si se desea exigir un calendario no vacío, hay que añadirlo explícitamente. Si no hay alarmas, la segunda parte se cumple, pero los turnos existentes deben seguir siendo no vacíos.

#### Selección de experto

```vdmpp
let expert in set schedule(p) be st
  a.GetReqQuali() in set expert.GetQuali()
in
  return expert
```

`let ... be st ...` elige un elemento que satisfaga la condición. No significa «el primero», «el mejor» o «el único». Puede haber varias respuestas válidas.

Precondición del examen:

```vdmpp
a in set alarms and p in set dom schedule
```

Garantía del resultado, expresada sin la variable local auxiliar del impreso:

```vdmpp
RESULT in set schedule(p) and
  a.GetReqQuali() in set RESULT.GetQuali()
```

`RESULT` representa el valor devuelto. El invariante y la precondición permiten justificar que existe un candidato adecuado.

`NumberOfExperts(p)` requiere `p in set dom schedule`. `ExpertIsOnDuty(ex)` devuelve un **conjunto de periodos**, no un número ni un booleano:

```vdmpp
{p | p in set dom schedule & ex in set schedule(p)}
```

#### Ejemplo nuevo para entender el caso

- `e1` posee `<Elec>`.
- `e2` posee `<Chem>` y `<Bio>`.
- Una alarma requiere `<Elec>` y otra `<Chem>`.
- `schedule = {mk_token("A") |-> {e1,e2}}`.

El turno cubre ambas alarmas y `NumberOfExperts(mk_token("A")) = 2`. Para la alarma eléctrica se puede elegir e1; para la química, e2. Si se elimina e2 sin otro experto químico, se viola la segunda parte del invariante. Un turno vacío viola la primera.

#### Diagrama de clases esperado

Mostrar tres clases con atributos y operaciones de la tabla anterior. `Plant` se asocia con una colección de `Alarm` y con conjuntos de `Expert` organizados por `Period`. La relación Plant-Expert debe indicar `schedule` y su clave Period; escribir solo una flecha genérica pierde información.

La fuente usa una asociación de alarmas con `0..*` y una asociación de expertos calificada por Period. La no vaciedad de cada turno y su cobertura de especialidades se explican mediante el invariante. No inventar herencia ni composición: el código almacena referencias y no define propiedad exclusiva ni ciclo de vida compartido.

**Explicación modelo:** «Expert representa a una persona y sus especialidades. Alarm guarda una descripción y la especialidad necesaria. Plant reúne las alarmas y un calendario que relaciona periodos con expertos. Su invariante impide turnos registrados vacíos y exige cobertura de las alarmas en cada periodo. ExpertToPage encuentra un experto capacitado; NumberOfExperts cuenta los del turno y ExpertIsOnDuty devuelve los periodos en los que trabaja un experto».

#### Lectura crítica del código impreso

En el constructor de Alarm se observan incongruencias de impresión: la firma aparece con el nombre `Plant`, el cuerpo se llama `Alarm` y hay una línea de retorno poco clara. No presentar ese fragmento como código compilable ni usarlo para enseñar que un constructor de Alarm deba llamarse Plant. La intención del modelo queda respaldada por los atributos y las otras operaciones. Para un ejercicio de depuración, distinguir el impreso de una versión normalizada.

La anotación de la hoja manuscrita señala que falta explicar: **un diagrama por sí solo no satisface toda la pregunta 4**.

Rúbrica didáctica propuesta, no oficial, sobre 7: clases y responsabilidades 1; tipos y estado 1; operaciones 1.5; invariante 1.5; pre/postcondiciones 1; asociaciones y diagrama 1.

## 13. Banco inicial de práctica con soluciones

Son ejercicios nuevos salvo cuando se indica relación con EX. La página debe ocultar la solución hasta el intento o la solicitud expresa.

| ID | Tema | Enunciado | Solución y explicación |
|---|---|---|---|
| LOG-01 | Implicación | P=false y Q=false. Evaluar P=>Q. | true: solo falla con antecedente verdadero y consecuente falso. |
| LOG-02 | Equivalencia | P=true y Q=false. Evaluar P<=>Q. | false: no coinciden. |
| LOG-03 | Cuantificadores | Evaluar `forall x in set {1,2,3} & x > 0`. | true: todos son positivos. |
| LOG-04 | Cuantificadores | Evaluar `exists x in set {1,2,3} & x > 3`. | false: no hay testigo. |
| LOG-05 | Vacío | Evaluar `forall x in set {} & x > 0`. | true: ningún elemento viola la propiedad. |
| LOG-06 | Temperaturas | En [10,500,20,30,40], ¿Rising y OverLimit? | Ambos true: 10<40 y existe 500. No es crecimiento paso a paso. |
| LOG-07 | Temperaturas | Tercera=450, última=400. ¿Safe? | false: 400 no es menor que 400. |
| LOG-08 | Traducción | Formalizar «existe una lectura mayor que 400». | `exists i in set inds m.temps & m.temps(i) > 400`. |
| TIP-01 | Tipos | Diferenciar `'A'`, `"A"` y `<A>`. | char, seq of char y quote. |
| TIP-02 | Producto | Si f=mk_(2,5,2026), hallar f.#2. | 5: segundo componente. |
| TIP-03 | Registro | s=mk_Student("Eva",[12,15],<Regular>). Hallar s.status. | <Regular>. |
| TIP-04 | Opcional | ¿`nil` pertenece a `[nat]`? | Sí: el opcional admite nil. |
| TIP-05 | Invariante | Nota=nat con invariante n<=20. ¿Admite 21? | No: pertenece a nat, pero viola el invariante. |
| SET-01 | Cardinalidad | `card {2,2,4,4,6}`. | 3: {2,4,6}. |
| SET-02 | Unión | `{1,3} union {3,5}`. | {1,3,5}. |
| SET-03 | Intersección | `{1,3} inter {3,5}`. | {3}. |
| SET-04 | Diferencia | `{1,2,3} \ {2,4}`. | {1,3}. |
| SET-05 | Subconjunto | `{1,2} psubset {1,2}`. | false: son iguales. |
| SET-06 | Comprensión | `{x+1 | x in set {1,2,3} & x mod 2 = 1}`. | {2,4}: se usan x=1 y x=3. |
| SEQ-01 | Índices | Si s=[8,8,2], hallar s(1). | 8: la primera posición es 1. |
| SEQ-02 | Tamaño | Para s=[8,8,2], hallar len s y card(elems s). | 3 y 2: posiciones frente a valores distintos. |
| SEQ-03 | Cola | `tl [4,5,6]`. | [5,6]. |
| SEQ-04 | Concatenación | `[1,2] ^ [2,3]`. | [1,2,2,3]: conserva repetición. |
| SEQ-05 | Actualización | `[4,5,6] ++ {2 |-> 9}`. | [4,9,6]. |
| MAP-01 | Dominio | m={1|->10,2|->10}. Hallar dom m y rng m. | {1,2} y {10}. |
| MAP-02 | Inyección | ¿El mapa anterior es inyectivo? | No: dos claves apuntan a 10. |
| MAP-03 | Sobrescritura | `{1|->10,2|->20} ++ {1|->99}`. | {1|->99,2|->20}. |
| MAP-04 | Unión incompatible | `{1|->10} munion {1|->99}`. | Indefinida/incompatible: conflicto de valores para la misma clave. |
| MAP-05 | Consulta inválida | Si dom m={1,2}, ¿puedo consultar m(3)? | No: 3 no pertenece al dominio. |
| MAP-06 | Restricción | `{2} <: {1|->10,2|->20}`. | {2|->20}. |
| COV-01 | Cobertura | ¿Qué hace tcov reset? | Reinicia contadores de cobertura. |
| COV-02 | Cobertura | ¿tcov write crea casos de prueba? | No: guarda cobertura acumulada. |
| COV-03 | Cobertura | ¿100% implica probar todas las entradas? | No: haber ejecutado lo instrumentado no cubre todas las combinaciones. |
| MC-01 | Concepto | ¿Qué recibe un model checker? | Un modelo y propiedades formalizadas. |
| MC-02 | Contraejemplo | ¿Qué muestra un contraejemplo? | Una ejecución del modelo que viola la propiedad. |
| MC-03 | Alcance | Si el modelo satisface una propiedad, ¿se ha demostrado todo sobre el programa real? | No: depende del modelo, la propiedad y su relación con el sistema. |
| TS-01 | Transiciones | ¿Qué es un estado terminal? | Uno sin transiciones salientes. |
| TS-02 | Traza | En la expendedora simple, ¿IDLE-water-W es válido? | No: antes debe coin llevar a SELECT. |
| DAT-01 | Guardas | En SELECT con nwater=0 y ncola=1, ¿water está habilitada? | No; cola sí. |
| DAT-02 | Actualización | En W con nwater=1, ejecutar get_water. | Llega a IDLE con nwater=0; ncola no cambia. |
| DAT-03 | Localización | ¿(l1,2) y (l2,2) son el mismo estado? | No: cambia la posición de control. |
| DAT-04 | Ciclo | Valores de x tras asignaciones desde x=5. | 5 -> 4 -> 2 -> 0. |
| DAT-05 | Ciclo | ¿Se ejecuta el cuerpo si x=0 inicialmente? | No: la guarda x>0 es falsa. |
| PLA-01 | Plant | Un turno registrado es {}. ¿Cumple PlantInv? | No: viola no vaciedad. |
| PLA-02 | Plant | Dos expertos califican. ¿ExpertToPage exige devolver el primero? | No: cualquiera que satisfaga condición y contrato. |
| PLA-03 | Plant | ¿Qué tipo devuelve ExpertIsOnDuty? | set of Period. |
| PLA-04 | Plant | ¿Qué comprueba NumberOfExperts antes de schedule(p)? | Que p pertenece a dom schedule. |
| PLA-05 | Plant | ¿PlantInv exige un mismo experto para todas las alarmas? | No: existe un experto por combinación alarma-periodo. |
| PLA-06 | Plant | Con alarms no vacío y schedule vacío, ¿la fórmula escrita es verdadera? | Sí por cuantificación vacía; no garantiza calendario no vacío. |

### Ejercicios de desarrollo

1. Explicar el proceso de model checking sin memorizar una definición. Revisar con la rúbrica de la sección 12.3.
2. A partir de las tablas de Plant, dibujar las tres clases y explicar cada relación. Revisar con la rúbrica de la sección 12.4.
3. Crear un caso que viole solo la cobertura de especialidades: turno no vacío con un experto eléctrico y una alarma química.
4. Dibujar el ciclo para x=3 con localización y valor. Solución en 11.3.
5. Explicar qué ocurre con ambas existencias en cero: desde IDLE puede aceptarse coin y pasar a SELECT; allí ret_coin devuelve a IDLE. Proponer como variante explícita impedir coin cuando no hay bebidas y explicar cómo cambia el modelo.

## 14. Requisitos para la página de práctica

### 14.1. Objetivo de aprendizaje

Que Diego pueda comprender, resolver y explicar ejercicios semejantes al parcial, con práctica breve, correcciones claras y dificultades progresivas. Español sencillo, sin perder precisión. Priorizar mapas/conjuntos, lectura de Plant y proceso de model checking; conservar acceso a las ocho sesiones.

### 14.2. Secciones y modos

1. **Inicio:** continuar práctica, elegir tema y ver progreso.
2. **Estudiar:** ocho módulos con explicación breve, ejemplo, errores frecuentes y ejercicio.
3. **Práctica por tema:** preguntas con dificultad básica, media y similar al parcial.
4. **Parcial anterior:** cuatro bloques de EX, con soluciones ocultas inicialmente.
5. **Simulacro:** 40 minutos, 20 puntos y reparto 5+4+4+7. Permitir entregar antes y confirmar antes de reiniciar. No mostrar correcciones durante el intento.
6. **Revisar errores:** repetir fallos con variantes y registrar comprensión.
7. **Glosario:** símbolos y tipos con ejemplos.

### 14.3. Actividades interactivas

- Alternativas, verdadero/falso con justificación, resultado de expresiones y completar predicados.
- Comparador de set, secuencia y mapa: visualizar elemento, posición, clave y valor.
- Constructor de turnos Plant: añadir expertos/especialidades/alarmas y ver qué condición cumple o falla.
- Simulador de expendedora: mostrar estado completo, guardas y actualizaciones; resaltar transiciones habilitadas.
- Trazador del ciclo: avanzar paso a paso con localización y x visibles.
- Respuestas abiertas y diagrama: autoevaluación guiada con rúbrica y solución de referencia.

Son simuladores didácticos de los casos definidos; no prometer un intérprete general de VDM++ ni un model checker completo.

### 14.4. Corrección justa

- Separar respuestas almacenadas del enunciado; ocultar soluciones en la interfaz hasta que corresponda.
- Aceptar cualquier orden en conjuntos y mapas, ignorar espacios irrelevantes y admitir `true/verdadero` y `false/falso`.
- Conservar el orden y repeticiones al corregir secuencias.
- Detectar claves duplicadas conflictivas en mapas y tipos diferentes; no convertir silenciosamente `<Regular>` en `"Regular"`.
- Aceptar distintos expertos si satisfacen el contrato de ExpertToPage.
- Para cuantificadores o código, aceptar varias formulaciones cuando exista una verificación semántica delimitada y fiable. Si no existe, mostrar referencia y autoevaluación; no calificar por coincidencia literal.
- Para desarrollo y diagramas, usar rúbricas. Sin evaluador semántico real, la puntuación debe ser autoasignada y estar identificada como tal.
- En simulacros, distinguir puntaje automático, autoevaluado y pendiente. No presentar una nota completa de 20 si quedan partes abiertas sin evaluar.
- Pistas progresivas: recordar concepto, orientar el procedimiento y finalmente mostrar solución razonada.
- Una respuesta equivocada debe indicar qué confundió y cómo resolver un ejemplo cercano.

### 14.5. Banco y variaciones

Incluir las cinco preguntas de teoría del parcial, sus cuatro expresiones, el desarrollo y Plant; sumar el banco inicial de la sección 13. Añadir variantes con nombres, stocks, valores y conjuntos diferentes, sin cambiar el significado de los operadores.

Cada pregunta debe tener: ID, tema, fuente (S06-S13/EX o «ejercicio nuevo»), dificultad, enunciado, datos, tipo de respuesta, solución, explicación, pistas, error frecuente y puntos cuando proceda. Para EX conservar los IDs y poder activar «enunciado de referencia» sin cambios.

No asignar respuestas al azar. Las variantes numéricas deben generarse con reglas y soluciones calculadas de forma determinista. La aleatoriedad puede elegir datos, nunca inventar la clave.

### 14.6. Experiencia y persistencia

- Diseño limpio y adaptable a computadora y celular; tipografía legible y código con desplazamiento horizontal.
- Navegación por teclado, foco visible, controles etiquetados y estados que no dependan solo del color.
- Progreso local con aciertos, intentos, temas y preguntas pendientes; aclarar que se conserva en ese navegador.
- Exportar/importar progreso en JSON y permitir reinicio confirmado.
- Guardar intento de simulacro, respuestas y tiempo límite para recuperar tras recargar.
- No requerir cuentas, claves API ni un servicio de IA para la práctica básica.
- Si se implementa una evaluación opcional con IA, describir su alcance y mantener alternativa de rúbrica; no fingir integración.

### 14.7. Comprobaciones mínimas de aceptación

1. El caso EX devuelve true, mapa con Pedro, true y **3**.
2. Barajar alternativas no modifica la clave por ID.
3. El corrector acepta `{3,1,2}` como `{1,2,3}`, pero distingue `[1,2]` y `[2,1]`.
4. Un mapa con misma clave y valores incompatibles no se acepta como mapa válido.
5. El simulador bloquea water con nwater=0, entrega reduce el stock una vez y ret_coin vuelve de SELECT a IDLE si ambos stocks son cero.
6. La expendedora distingue modelo docente y cualquier mejora propuesta.
7. El ciclo x=3 muestra las seis configuraciones de 11.3.
8. Plant detecta turnos vacíos y falta de especialidad; acepta distintos expertos válidos.
9. El reloj del simulacro no se reinicia al recargar y entrega al agotar tiempo.
10. Las soluciones permanecen ocultas durante el simulacro.
11. Se puede revisar errores y recuperar progreso sin conexión a una IA.
12. La nota final distingue las partes autoevaluadas y pendientes.

## 15. Ruta sugerida de estudio

1. Conectores y cuantificadores, sobre todo implicación y orden de cuantificadores.
2. Tipos y diferencias entre conjuntos, secuencias y mapas.
3. Resolver las cuatro expresiones del parcial y variantes con sobrescritura.
4. Explicar Plant en voz alta: qué guarda cada clase, qué exige PlantInv y qué devuelve cada operación.
5. Dibujar las asociaciones de Plant y justificar el mapa por periodos.
6. Escribir el proceso de model checking sin mirar.
7. Practicar sistemas de transición, guardas y estados completos.
8. Repasar cobertura y realizar un simulacro de 40 minutos.

Criterio personal de preparación: resolver expresiones explicando cada operador; explicar Plant sin leer una respuesta modelo; reconocer una traza válida y una guarda falsa; y describir model checking con sus entradas, proceso y salida.

## 16. Instrucción final para cualquier IA que consuma este archivo

Usa este contenido como fuente principal. Separa el material del curso, las preguntas del parcial anterior y los ejercicios nuevos. Conserva las correcciones y matices indicados. No asumas que el examen futuro será idéntico. No inventes resultados de herramientas ni presentes una simulación educativa como ejecución real de VDMTools. Al crear la página, construye las funciones de estudio y práctica; no te limites a mostrar este Markdown como una página de texto.
