## Jest + Puppeteer + Polly.js example

1. Start server with fake backend: `npm run jsonServer`
1. Start server with app: `npm start`
1. Run autotests: `cd autotests && npm test`

## Hosts / ports

3000 – app & dev-server

3001 – fake backend (via json-server) serving data & "services.html" for iframe

3002 – polly.js server (writing & replaying requests). Starts automatically with tests
