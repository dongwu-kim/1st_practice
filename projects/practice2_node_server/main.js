const http = require("http"),
  fs = require("fs"),
  url = require("url"),
  app = http.createServer((request, response) => {
    const _url = request.url,
      queryData = url.parse(_url, true).query,
      pathName = url.parse(_url, true).pathname;

    console.log(url.parse(_url, true));

    if (pathName === `/`) {
      fs.readdir(`./data`, (err, fileList) => {
        let list = `<ol>`;

        for (let i = 0; i < fileList.length; i++) {
          let splitfileList = fileList[i].split(`_`);
          splitfileList = splitfileList[1]; // 0 = id or sort num, 1 = file name
          console.log(fileList[i]);
          console.log(splitfileList);
          list = list + `<li><a href = "?id=${fileList[i]}"/>${splitfileList}</a></li>`;
        }

        list = list + `</ol>`;

        if (queryData.id !== undefined) {
          /* let list = `<ol>
          <li><a href="?id=HTML">HTML</a></li>
          <li><a href="?id=CSS">CSS</a></li>
          <li><a href="?id=JS">JavaScript</a></li>
          </ol>`; */

          fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {
            const title = queryData.id;
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

app.listen(3002);
