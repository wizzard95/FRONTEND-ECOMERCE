# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

1.- npm create vite@latest .
-> React ->npm install: yes -> npm run dev

<!-- ! --> npm install axios@1.11.0 react-hook-form@7.62.0 react-icons@5.5.0 react-hot-toast@2.6.0 react-router@7.7.1

Dependencias Front
axios: 1.11.0
sirve para hacer peticiones HTTP (como GET, POST, etc.) desde el navegador o Node.js de forma sencilla y con soporte para promesas.

# \*

react-hook-form: 7.62.0
sirve para manejar formularios en aplicaciones React de forma rápida, sencilla y eficiente.

# \*

react-icons: 5.5.0
sirve para usar íconos fácilmente en aplicaciones React.

# \*

react-hot-toast: 2.6.0
sirve para mostrar notificaciones (toasts) rápidas y bonitas en aplicaciones React.

# \*

react-router: 7.7.1
sirve para manejar la navegación entre diferentes páginas o vistas en una aplicación React de una sola página (SPA).

# \*

Dependencias de desarrollo

<!-- ! --> npm install -D daisyui@4.12.24 tailwindcss@3.4.17 autoprefixer@10.4.21 postcss@8.5.6

daisyui: 4.12.24
es un plugin de componentes para Tailwind CSS que te da componentes preconstruidos y estilizados (como botones, tarjetas, modales, etc.).

# \*

autoprefixer: 10.4.21
Sirve para añadir automáticamente los prefijos de los navegadores (como -webkit-, -moz-, etc.) en el CSS, asegurando compatibilidad entre distintos navegadores sin tener que escribirlos manualmente.

# \*

tailwindcss: 3.4.17
es un framework de CSS utilitario que te permite estilizar directamente en el HTML o JSX usando clases.

# \*

postcss: 8.5.6
es una herramienta que transforma CSS con plugins, permitiendo automatizar tareas como añadir prefijos, usar variables, minificar, o aplicar futuras características del
CSS.

2.- en las dependencias del package.json se le debe sacar el simbolo ^ a todas las dependencias para que no se anden actualizando solas

3.- crear archivo .prettierrc -> ir configuracion -> format -> marcar la primera casilla -> elegir prettier

4.- crear archivo postcss.config.js en la raiz del proyecto y luego el archivo tailwindcss.config.js

5.- crear dentro de src carpetas: layout, components, context, pages, services

Taza de Boku no Hero
Taza de Boku no Hero Academia con foto de varios personajes, edicion limitada
7000
40
https://res.cloudinary.com/dur3rpnbo/image/upload/v1778601284/tazonBokuNoHero_l3pqu8.webp

Taza de One Piece
Taza de One Piece con forma de barril, edicion limitada
5000
10
https://res.cloudinary.com/dur3rpnbo/image/upload/v1778281636/tazonOnePiece_ygvotu.webp
