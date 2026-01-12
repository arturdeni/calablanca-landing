# Instrucciones para Claude Code

## Proyecto

Landing page estática para Calablanca Residences, una promoción inmobiliaria de lujo en Sitges (Barcelona) de la empresa AX Partners.

## Stack

- **Astro 4.x** - Framework
- **JavaScript** - No TypeScript
- **CSS vanilla** - No Tailwind, no SCSS
- **GSAP** - Animaciones (a definir más adelante)
- **Vercel** - Deploy

## Reglas

1. **JavaScript** - No TypeScript
2. **CSS vanilla** - No Tailwind, no SCSS
3. CSS con custom properties y nesting nativo
4. Mobile-first
5. No añadir dependencias sin confirmar antes

## Convenciones

- CSS: BEM (.block__element--modifier)
- Variables CSS en /src/styles/variables.css
- Componentes Astro: PascalCase (MiComponente.astro)
- Archivos: kebab-case (mi-archivo.js)

## Estructura componentes Astro
```astro
---
const { lang = 'es' } = Astro.props;
---

<div class="mi-componente">
  <slot />
</div>

<style>
  .mi-componente { }
</style>
```

## Idiomas

- Español (default): `/`
- Inglés: `/en/`
- Traducciones en `/src/i18n/es.json` y `/src/i18n/en.json`

## Secciones de la web

Según el diseño (ver /docs/design.pdf):

1. **Header** - Logo + navegación + selector idioma ES/EN
2. **Hero** - "A new way of luxury living" + imagen fondo + CTA
3. **Bienvenidos** - Intro + datos (precio, superficie, dormitorios) + galería
4. **Arquitectura** - Sección fondo oscuro + imagen complejo + texto
5. **Passivhaus** - Beneficios casa pasiva + imagen interior
6. **Ubicación** - Mapa Sitges + puntos de interés + distancias
7. **Elige tu casa** - Tabla con tipos de vivienda
8. **Estado obra** - Timeline del estado actual
9. **Formulario contacto** - Nombre, apellido, email, teléfono + checkboxes
10. **Simulador hipoteca** - Calculadora interactiva
11. **Footer** - Logos partners

## Diseño de referencia

Ver `/docs/design.pdf` para el diseño completo de la web.

## Comandos
```bash
pnpm dev      # Desarrollo
pnpm build    # Build
pnpm preview  # Preview build
```

## Package manager

Usar **pnpm** (no npm, no yarn)
```

## Siguiente paso

Ahora abre Claude Code en la carpeta del proyecto y pídele:
```
Lee el archivo CLAUDE.md y el diseño en docs/design.pdf. 
Luego crea la estructura base del proyecto:
- Layout principal con los estilos base
- Variables CSS
- Sistema de i18n básico (ES/EN)
- Componente Header
- Componente Footer
- Página index.astro con las secciones vacías marcadas con comentarios