# Sergio Ballesteros · Engineering Notebook

Sitio personal estático centrado en sistemas, decisiones y pruebas de trabajo de backend, datos e integración de IA. Stack principal: Java, Spring Boot, AWS y Kubernetes.

## Estructura

- `index.html`, `styles.css`: portada, fichas y diseño adaptable.
- `main.js`, `translations.js`: selección de sistemas e idioma ES/EN.
- `notes/`, `journal/`, `notes-lang.js`: expedientes y notas técnicas.
- `demo/energy-simulator/`: demo pública con datos sintéticos y extracción simulada; no es la plataforma privada de producción.
- `CONTENT.md`: inventario de contenido y posicionamiento.
- `tests/`: regresión de la persistencia del idioma.

Las fichas enlazan las notas y pruebas públicas disponibles. No se publican contadores ni versiones de sistemas privados sin un registro consultable.

## Ejecución local

Desde la raíz, con Python 3:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Abre http://127.0.0.1:4173/ (o `/?lang=es`). No se necesita framework, compilación ni dependencias para servir el sitio.

## Comprobaciones

Con Node 22+:

```sh
node --test tests/*.test.cjs
cd demo/energy-simulator
npm ci
npm test
npm run lint
npm run build
```

`build` incluye la comprobación de tipos y verifica los archivos estáticos de la demo. Más detalles en [su README](demo/energy-simulator/README.md).

## Publicación

`.github/workflows/pages.yml` valida el sitio y la demo antes de publicar en GitHub Pages. El artefacto contiene únicamente los recursos del sitio, sin `node_modules`, pruebas ni configuración de desarrollo. El código fuente se mantiene formateado para facilitar su revisión.
