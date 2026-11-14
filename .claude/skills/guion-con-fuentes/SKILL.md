---
name: guion-con-fuentes
description: Investiga un tema con fuentes verificables y escribe el guion del video en guion.json (frases para la voz y para subtítulos, 8 escenas, la última de fuentes), más publicar.md. Úsala para cada video nuevo.
---

# Guion con fuentes

## Investigación
1. Busca en la web 3 a 6 fuentes serias y recientes (medios reconocidos, documentos oficiales, informes de empresas). Anota fecha y medio de cada dato.
2. Cada cifra o hecho del guion debe tener fuente. Si dos fuentes no coinciden, dilo o usa la más conservadora.
3. Las acusaciones se presentan como acusaciones ("según X", "X lo niega"). Nada de afirmar delitos no probados.
4. Si el tema es de dinero o salud, no des consejos personalizados: explica, no recomiendes.

## guion.json
Lista de frases, en el idioma de la voz del canal (`canal.md`). Mira `ejemplo/guion.json`.
```json
[{"s": 1, "t": "texto para la voz, con los números en palabras", "c": "texto del subtítulo, con 12 cifras"}]
```
- `s`: escena 1 a 8. La 8 es "Sources" (fuentes en pantalla).
- 25 a 32 frases para 2 a 3 minutos. Frases de 8 a 20 palabras.
- Frase 1 = gancho: un dato o pregunta que sorprende. Frase 2 = "¿cómo es posible?". Un giro cada 30 s. Cierre con una pregunta al público.
- Usa los temas y el formato de la referencia, pero con frases y estructura propias.

## publicar.md
```
# Title
(máx. 70 caracteres, el gancho en las primeras palabras)

# Description
2 a 3 párrafos, una pregunta para comentarios, capítulos (0:00 ...) y "Sources: ...".

# Tags
palabra, palabra
```
Resume el guion a la persona en su idioma y espera su OK antes de producir.
