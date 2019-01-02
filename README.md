# Komodo SSR

> Komodo SSR adalah sebuah template projek untuk para programmer yang ingin menerapkan fitur Server Side Rendering pada React.Js.

## Mulai

- Klon atau download projek ini
- Install dependensi
- Ketikkan command `yarn start:dev`
- Buka browser `http://localhost:3000`

## Struktur Folder

Ini adalah struktur folder projek Komodo SSR 

```
-komodo-ssr
 |_config/
 |   |_webpack.common.js
 |   |_dev/
 |   |   |_webpack.client.js
 |   |   |_webpack.server.js
 |   |_prod/
 |   |   |_webpack.client.js
 |   |   |_webpack.server.js
 |_server/
 |   |_development.js
 |   |_production.js
 |   |_index.js
 |_src/
 |   |_general
 |   |   |_components
 |   |   |_css
 |   |_reducers
 |   |_static
 |   |_appServer.js
 |   |_appClient.js
 |   |_routes.js
 |_.babelrc
 |_.gitignore
 |_package.json
 |_yarn.lock
 ```
 
## Fitur

1. Routing
2. State Management
3. Server Side Rendering
4. Read CSS
5. Read Image
6. Hot Module Replacement (HMR)
7. Bundle Splitting
8. Code Splitting

## Teknologi

1. React
2. React Redux
3. React Router
4. Babel
5. Webpack
6. Express
7. Axios
