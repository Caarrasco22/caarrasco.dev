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

- `/` - Pagina principal del portfolio.
- `/perfil-tecnico` - Perfil tecnico tipo CV/GitHub profile integrado en la web.

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
