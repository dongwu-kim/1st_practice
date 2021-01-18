const http = require("http"),
  fs = require("fs"),
  url = require("url");

function createList(fileList) {
  let list = `<ol>`;

  for (let i = 0; i < fileList.length; i++) {
    let splitfileList = fileList[i].split(`_`);
    splitfileList = splitfileList[1]; // original file name ex): 1_HTML
    list = list + `<li><a href = "?id=${fileList[i]}"/>${splitfileList}</a></li>`;
  }

  list = list + `</ol>`;

  return list;
}

function templateHTML(title, list, description) {
  return `
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
                <h2>${title}</h2>
                <p style="margin-top: 45px">
                  ${description}
                </p>
              </body>
            </html>
            `;
}

const app = http.createServer((request, response) => {
  const _url = request.url,
    queryData = url.parse(_url, true).query,
    pathName = url.parse(_url, true).pathname;

  if (pathName === `/`) {
    let title,
      template,
      index_description = ``;

    fs.readdir(`./data`, (err, fileList) => {
      const list = createList(fileList);

      if (queryData.id !== undefined) {
        fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {
          title = queryData.id;
          template = templateHTML(title, list, description);
          response.writeHead(200);
          response.end(template);
        });
      } else {
        title = `Welcome`;
        index_description = `Hi, Node.js`;
        template = templateHTML(title, list, index_description);
        response.writeHead(200);
        response.end(template);
      }
    });
  } else {
    response.writeHead(404);
    response.end(`Sry, We can't found URI`);
  }
});

app.listen(3001);
