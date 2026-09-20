# caarrasco.dev

[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/built%20with-Astro-FF5D01.svg)](https://astro.build)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)]()

Sitio web personal de Pablo Carrasco.

Este proyecto funciona como portfolio tecnico y punto central para mostrar proyectos, aprendizaje, documentacion y trabajo practico relacionado con homelab, Linux, redes, self-hosting, bots de Discord, seguridad defensiva, PCs, impresion 3D y tecnologia aplicada.

## Stack

- Astro
- HTML, CSS y JavaScript
- Componentes estaticos
- Despliegue pensado para Cloudflare Pages

## Paginas principales

- `/` - Portfolio unificado: proyectos con escenas ligadas al scroll, archivo visual, perfil y contacto.
- `/perfil-tecnico` - Perfil tecnico tipo CV/GitHub profile integrado en la web.
- `/portfolio` - Redirige a `/#visual`; el archivo visual se reproduce en la pagina principal.

## Experiencia visual

- `src/components/ScrollPortfolio.astro` contiene las secciones de la pagina principal.
- `src/data/portfolio.js` sigue siendo la fuente de proyectos, enlaces y tecnologias.
- `src/styles/experience.css` y `src/scripts/experience.ts` controlan el aspecto y las transiciones.
- En escritorio, el visual fijo cambia entre ContextDock, ProxBot y Driftwatch con el scroll nativo. En movil, cada proyecto presenta su imagen junto al texto. SubTrack permanece en el indice de proyectos.
- El reel de portada se pausa fuera de pantalla. No se reproduce automaticamente en movil, con ahorro de datos o con movimiento reducido.
- El videoclip completo carga solo al reproducirlo. Sin JavaScript conserva los controles nativos.
- Las capturas de ProxBot y Driftwatch son de los proyectos originales. El poster se ha extraido del reel existente; los iconos proceden de Lucide (licencia en `public/media/lucide-LICENSE.txt`).
- El anterior export visual se conserva en `public/portfolio/legacy.html`, junto con sus recursos.

## Instalacion local

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor local suele estar disponible en:

```text
http://localhost:4321/
```

## Build de produccion

```bash
npm run build
```

Astro generara la web estatica en:

```text
dist/
```

## Vista previa del build

```bash
npm run preview
```

## Despliegue en Cloudflare Pages

Configuracion recomendada:

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
```

## Notas

- No subir `node_modules/`.
- No subir `.env` si en el futuro se anaden variables privadas.
- El contenido de `dist/` se genera automaticamente durante el build.
