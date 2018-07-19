## Jest + Puppeteer + Polly.js example

1. Start server with fake backend: `npm run jsonServer`
1. Start server with app: `npm start`
1. Run autotests: `cd autotests && npm test`

localhost:3000 – app

localhost:3001 – fake backend (via json-server) + serving "services.html" for iframe
