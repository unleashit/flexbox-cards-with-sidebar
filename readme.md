# Flexbox Cards with Sidebar
Simple responsive flexbox card layout with the ability to subscribe. Data is fetched via ajax from locally running api (Json Server). Uses plain javascript (ES6 with Babel), webpack, html and sass.

### Using it

First run `npm install` to download dependencies. Available npm scripts:

`npm start` concurrently launches the project in development mode on port 3100 and an api server (json server) on port 3000. Launches Chrome (if available) with browser-sync at http://localhost:3100.

`npm run api` launches just the api server on port 3000. You can then run the production app by loading dist/index.html in a browser.

`npm run build` runs the build process and updates/creates the dist folder.

`npm run seed` seeds the "database" in data/db.json with random data.