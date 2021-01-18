const http = require("http"),
  fs = require("fs"),
  url = require("url");

class TemplateHTML {
  constructor(head, body) {
    this.head = head;
    this.body = body;
  }

  createTemplate(head, body) {
    this.head = head;
    this.body = body;

    let template =
      `<!DOCTYPE html>
        <html>` +
      this.head +
      this.body +
      `</html>`;

    return template;
  }
}

class CreateElement extends TemplateHTML {
  createHead(head) {
    this.head = head;

    head = `<head>` + head + `</head>`;

    return head;
  }

  createBody(body) {
    this.body = body;

    body = `<body>` + body + `</body>`;

    return body;
  }
}

function render(title, list, description) {
  let head = new Head(`
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8" />
    `);

  let body = new Body(`
    <h1><a href="/">WEB</a></h1>
    ${list}
    <h2>${title}</h2>
    <p style="margin-top: 45px">
      ${description}
    </p>
    `);

  createTemplate(head, body);
}
render();
app.listen(3002);

/*
function templateHTML(title, list, description) {
  return `
            <!DOCTYPE html>
            <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8" />
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
    fs.readdir(`./data`, (err, fileList) => {
      let list = `<ol>`;

      for (let i = 0; i < fileList.length; i++) {
        let splitfileList = fileList[i].split(`_`);
        splitfileList = splitfileList[1]; // 0 = id or sort num, 1 = file name
        list = list + `<li><a href = "?id=${fileList[i]}"/>${splitfileList}</a></li>`;
      }

      list = list + `</ol>`;

      if (queryData.id !== undefined) {
        /* let list = `<ol>
          <li><a href="?id=HTML">HTML</a></li>
          <li><a href="?id=CSS">CSS</a></li>
          <li><a href="?id=JS">JavaScript</a></li>
          </ol>`; */

/*
        fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {
          const title = queryData.id;
          const template = templateHTML();
          response.writeHead(200);
          response.end(template);
        });
      } else {
        const title = `Welcome`;
        const description = `Hi, Node.js`;
        const template = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8" />
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
        response.writeHead(200);
        response.end(template);
      }
    });
  } else {
    response.writeHead(404);
    response.end(`Not found`);
  }
});

*/
