const { create } = require("domain");
const http = require("http"),
  fs = require("fs"),
  url = require("url"),
  qs = require("querystring");

const app = http.createServer((request, response) => {
  const _url = request.url,
    queryData = url.parse(_url, true).query,
    pathName = url.parse(_url, true).pathname;

  let template = `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <a href = "/crud">Create sth</a>
                    <h2>${title}</h2>
                    <div style="margin-top: 45px">
                        ${description}
                    </div>
                </body>
            </html>     
            `;

  if (pathName === `/`) {
    fs.readdir(`./data`, (err, fileList) => {
      fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {
        response.writeHead(200);
        response.end(template);
      });
    });
  } else {
    response.writeHead(404);
    response.end(`Sry, We can't found URI`);
  }
});

app.listen(3002);
