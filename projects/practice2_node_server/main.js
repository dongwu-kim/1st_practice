const { create } = require("domain");
const http = require("http"),
  fs = require("fs"),
  url = require("url"),
  qs = require("querystring");

function createObj(arr, fileList, description) {
  let obj = [{ listPage: [] }];
  for (let i = 0; i < fileList.length; i++) {
    let fileName = fileList[i].split(`_`);
    fileName = fileName[1];
    obj.listPage.push({ id: i, title: fileName, desc: description, origin: fileList[i] });
  }
  arr.concat(obj);
  return arr;
}

function createHTMLList(arr) {
  let list = `<ol>`;

  for (let i = 0; i < arr.listPage.length; i++) {
    let title = arr.listPage[i].title;
    let id = arr.listPage[i].origin;
    list = list + `<li><a href = "?id=${id}"/>${title}</a></li>`;
  }

  list = list + `</ol>`;

  return list;
}

function templateHTML(title, description, list) {
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
                <a href = "/crud">Create sth</a>
                <h2>${title}</h2>
                <div style="margin-top: 45px">
                  ${description}
                </div>
              </body>
            </html>
            `;
}

const app = http.createServer((request, response) => {
  const _url = request.url,
    queryData = url.parse(_url, true).query,
    pathName = url.parse(_url, true).pathname;

  let dataObj = [
    {
      initPage: [
        {
          id: 0,
          title: `Welcome`,
          description: `Hi, Node Js`,
          origin: `none`,
        },
      ],
    },
  ];
  let list = ``;
  let template = ``;

  if (pathName === `/`) {
    fs.readdir(`./data`, (err, fileList) => {
      fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {
        dataObj = createObj(dataObj, fileList, description);
        list = createHTMLList(dataObj);
        console.log(dataObj.listPage[0].title);
        console.log(list);

        if (queryData.id !== undefined) {
          template = templateHTML(dataObj.listPage[0].title, description, list);
          response.writeHead(200);
          response.end(template);
        } else {
          let title = dataObj.initPage.title;
          let description = dataObj.initPage.description;
          template = templateHTML(title, description, list);
          response.writeHead(200);
          response.end(template);
        }
      });
    });
  } else if (pathName === `/crud`) {
    fs.readdir(`./data`, (err, fileList) => {
      fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {
        let dataObj = createObj(fileList, description);
        let list = createHTMLList(dataObj);
        let crudObj = [
          {
            id: 0,
            title: `Welcome`,
            description: `
      <form action="http://localhost:3001/process_crud" method="post">
        <p><input type="text" name="title" placeholder="Lang" /></p>
        <p>
          <textarea
            name="description"
            cols="50"
            rows="10"
            placeholder="사용평을 작성해주시겠어요?"
          ></textarea>
        </p>
        <input type="submit" />
      </form>
      <form action="http://localhost:3001/process_crud" method="post">
        <button type="submit">Like</button>
        <button type="submit">Dislike</button>
      </form>
    `,
            origin: `none`,
          },
        ];
        template = templateHTML(crudObj, list);
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathName === `/process_crud`) {
    let body = ``;
    request.on(`data`, (data) => {
      body = body + data;
    });
    request.on(`end`, () => {
      let post = qs.parse(body);
      title = post.title;
      description = post.description;
      // let date = Date.now();

      if (title === undefined) {
        response.writeHead(302, { Location: `/crud}` });
        response.end();
      } else {
        fs.readdir(`./data`, (err, fileList) => {
          let num = fileList.length + 1;

          let fileName = num + `_` + title;

          fs.writeFile(`./data/${fileName}`, description, `utf8`, (err) => {
            response.writeHead(302, { Location: `/?id=${qs.escape(fileName)}` });
            response.end();
          });
        });
      }
    });
  } else {
    response.writeHead(404);
    response.end(`Sry, We can't found URI`);
  }
});

app.listen(3001);
