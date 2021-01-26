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
    list = list + `<li><a href = "/?id=${fileList[i]}">${fileName[1]}</a></li>`;
  }

  list = list + `</ol>`;

  let data = {
    indexPage: { title: `Hi, Everybody`, description: `I'm node.js`, list }, // type your homepage element
    listPage: { title, description, list }, // using another function createPage() for filling description
    createPage: {
      title: `Writing your opnion`,
      description: `<form action="/crud_process" method="post">
    <p><input type="text" name="title" placeholder="Type framework or lang" /></p>
    <p>
      <textarea
        name="description"
        cols="25"
        rows="25"
        placeholder="사용후기 혹은 설명을 작성해주시겠어요?"
      ></textarea>
    </p>
    <input type="submit" />
  </form>
  <form action="/crud_process" method="post">
    <button type="submit" name="like">Like</button>
    <button type="submit" name="dislike">Dislike</button>
  </form>`,
      list,
    }, // type your crud element
  };

  return data;
}

function createTemplate(dataObj, inputTitle, inputDescription, fileName, page) {
  let title = ``,
    description = ``,
    list = dataObj.listPage.list,
    control = ``;
  if (page === `index`) {
    // using initTitle and initDesc
    title = dataObj.indexPage.title;
    description = dataObj.indexPage.description;
  } else if (page === `list`) {
    //using inputTitle and inputDesc
    title = inputTitle;
    description = inputDescription;
    control = `<a href = "/update?id=${fileName}">Update</a>
    <form action="/delete_process" method="post">
    <input type="hidden" name="id" value="${fileName}" />
    <input type="submit" value="delete" />
    </form>`;
  } else if (page === `crud`) {
    //using initTitle and initDesc
    title = dataObj.createPage.title;
    description = dataObj.createPage.description;
  } else if (page === `update`) {
    title = inputTitle;
    description = `<form action="/update_process" method="post">
    <input type="hidden" name="id" value="${fileName}"/>
    <p><input type="text" name="title" placeholder="Update title" value="${inputTitle}" /></p>
    <p>
      <textarea
        name="description"
        cols="25"
        rows="25"
        placeholder="설명을 작성해주시겠어요?"
      >${inputDescription}</textarea>
    </p>
    <input type="submit" />
  </form>`;
  } else {
    return `Sorry, you could not use this page yet.`;
  }
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
              ${control}
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

  function createPage(statusCode, endData) {
    response.writeHead(statusCode);
    response.end(endData);
  }

  fs.readdir(`./data`, (err, fileList) => {
    let template = ``;
    let title = queryData.id;

    fileList = fileList.sort((a, b) => {
      let c = parseInt(a, 10);
      let d = parseInt(b, 10);
      return c < d ? -1 : c == d ? 0 : 1;
    });

    let data = createInitData(fileList);
    fs.readFile(`./data/${title}`, `utf8`, (err, description) => {
      if (pathName === `/`) {
        if (title === undefined) {
          template = createTemplate(data, ``, ``, ``, `index`);
          createPage(200, template);
        } else {
          title = title.split(`_`);
          title = title[1];
          let fileName = queryData.id;
          template = createTemplate(data, title, description, fileName, `list`);
          createPage(200, template);
        }
      } else if (pathName === `/crud`) {
        template = createTemplate(data, ``, ``, ``, `crud`);
        createPage(200, template);
      } else if (pathName === `/crud_process`) {
        let body = ``;
        request.on(`data`, (data) => {
          body = body + data;
        });
        request.on(`end`, () => {
          let post = qs.parse(body);
          let title = post.title;
          let description = post.description;
          let date = Date.now();
          if (title === `` || description === ``) {
            response.writeHead(302, { Location: `/crud` });
            response.end();
          } else {
            let fileName = date + `_` + title;
            fs.writeFile(`./data/${fileName}`, description, `utf8`, (err) => {
              response.writeHead(302, { Location: `/?id=${qs.escape(fileName)}` });
              response.end();
            });
          }
        });
      } else if (pathName === `/update`) {
        title = title.split(`_`);
        title = title[1];
        let fileName = queryData.id;
        template = createTemplate(data, title, description, fileName, `update`);
        createPage(200, template);
      } else if (pathName === `/update_process`) {
        let body = ``;
        request.on(`data`, (data) => {
          body = body + data;
        });
        request.on(`end`, () => {
          let post = qs.parse(body);
          let id = post.id;
          let description = post.description;
          if (id === ``) {
            response.writeHead(302, { Location: `/update` });
            response.end();
          } else {
            fs.writeFile(`./data/${id}`, description, `utf8`, (err) => {
              response.writeHead(302, { Location: `/?id=${qs.escape(id)}` });
              response.end();
            });
          }
        });
      } else if (pathName === `/delete_process`) {
        let body = ``;
        request.on(`data`, (data) => {
          body = body + data;
        });
        request.on(`end`, () => {
          let post = qs.parse(body);
          let id = post.id;
          fs.unlink(`data/${id}`, (err) => {
            response.writeHead(302, { Location: `/` });
            response.end();
          });
        });
      } else {
        createPage(404, `Sorry, We could not found this site.`);
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
