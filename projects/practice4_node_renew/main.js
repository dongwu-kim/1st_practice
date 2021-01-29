const http = require(`http`),
  fs = require(`fs`),
  { URL } = require(`url`);

const app = http.createServer((request, response) => {
  const _url = new URL(`https://localhost:3003${request.url}`);
  let title = _url.search;
  console.log(title);
});

app.listen(3003);
