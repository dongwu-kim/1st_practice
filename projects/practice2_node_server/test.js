const { create } = require("domain");
const http = require("http"),
  fs = require("fs"),
  url = require("url"),
  qs = require("querystring");

function createInitData(fileList) {
  let title = ``,
    description = ``, // Textfile description
    list = `<ol>`;

  for (let i = 0; i < fileList.length; i++) {
    let fileName = fileList[i].split(`_`); // fileList[i] = string, fileName = array
    list = list + `<li><a href = "?id=${fileList[i]}">${fileName[1]}</a></li>`;
  }

  list = list + `</ol>`;

  let data = {
    indexPage: { title: `Hi, Everybody`, description: `I'm node.js`, list }, // type your homepage element
    listPage: { title, description, list }, // using another function createPage() for filling description
    createPage: {
      title: `Writing your opnion`,
      description: `<form action="http://localhost:3001/process_crud" method="post">
    <p><input type="text" name="userName" placeholder="Type your name" /></p>
    <p>
      <textarea
        name="description"
        cols="25"
        rows="50"
        placeholder="감상평을 작성해주시겠어요?"
      ></textarea>
    </p>
    <input type="submit" />
  </form>
  <form action="http://localhost:3001/process_crud" method="post">
    <button type="submit">Like</button>
    <button type="submit">Dislike</button>
  </form>`,
      list,
    }, // type your crud element
  }; // [0] means init of page, [last num] means

  return data;
}

function createTemplate(dataObj, title, description, page) {
  if (page === `index`) {
    return `
  <!DOCTYPE html>
      <html>
          <head>
              <title>WEB1 - ${dataObj.indexPage.title}</title>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
              <h1><a href="/">WEB</a></h1>
              ${dataObj.indexPage.list}
              <a href = "/crud">Create sth</a>
              <h2>${dataObj.indexPage.title}</h2>
              <div style="margin-top: 45px">
                  ${dataObj.indexPage.description}
              </div>
          </body>
      </html>     
      `;
  } else if (page === `list`) {
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
                ${dataObj.listPage.list}
                <a href = "/crud">Create sth</a>
                <h2>${title}</h2>
                <div style="margin-top: 45px">
                    ${description}
                </div>
            </body>
        </html>     
        `;
  } else {
    return `
  <!DOCTYPE html>
      <html>
          <head>
              <title>WEB1 - ${dataObj.createPage.title}</title>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
              <h1><a href="/">WEB</a></h1>
              ${dataObj.createPage.list}
              <a href = "/crud">Create sth</a>
              <h2>${dataObj.createPage.title}</h2>
              <div style="margin-top: 45px">
                  ${dataObj.createPage.description}
              </div>
          </body>
      </html>     
      `;
  }
}

const app = http.createServer((request, response) => {
  const _url = request.url,
    queryData = url.parse(_url, true).query,
    pathName = url.parse(_url, true).pathname;
  let template = ``,
    title = queryData.id;

  /*let title = `hi`; // page element -> index : welcome, list page : title - filename(dir read), create : static
  let description = `desc`; // file read -> file text
  let list = `list`; // (array === queryString)*/

  fs.readdir(`./data`, (err, fileList) => {
    fs.readFile(`./data/${title}`, `utf8`, (err, description) => {
      let data = createInitData(fileList);
      if (pathName === `/`) {
        if (title === undefined) {
          template = createTemplate(data, title, description, `index`);
          response.writeHead(200);
          response.end(template);
        } else {
          template = createTemplate(data, title, description, `list`);
          response.writeHead(200);
          response.end(template);
          console.log(title);
        }
      } else if (pathName === `/crud`) {
        template = createTemplate(data, title, description, `crud`);
        response.writeHead(200);
        response.end(template);
      }
    });
  });

  /* if (pathName === `/`) {
    fs.readdir(`./data`, (err, fileList) => {
      fs.readFile(`./data/${queryData.id}`, `utf8`, (err, description) => {});
    });
  } else {
    response.writeHead(404);
    response.end(`Sry, We can't found URI`);
  } */
});

app.listen(3002);
