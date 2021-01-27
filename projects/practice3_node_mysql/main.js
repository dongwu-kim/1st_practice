const { create } = require("domain");
const http = require("http"),
  fs = require("fs"),
  url = require("url"),
  qs = require("querystring"),
  path = require("path"),
  initialize = require("./init"),
  sanitize = require("sanitize-html"),
  sort = require("./sort"),
  mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kimk7797",
  database: "movieapp",
});

db.connect();

const app = http.createServer((request, response) => {
  const _url = request.url,
    queryData = url.parse(_url, true).query,
    pathName = url.parse(_url, true).pathname;

  function createPage(statusCode, endData) {
    response.writeHead(statusCode);
    response.end(endData);
  }

  let template = ``;
  let title = queryData.id;
  test SpeechRecognition;

  if (pathName === `/`) {
    if (title === undefined) {
      /*fs.readdir(`./data`, (err, fileList) => {
        fileList = sort.sortString(fileList);
        console.log(fileList);
        let data = initialize.createInitData(fileList);

        template = initialize.createTemplate(data, ``, ``, ``, `index`);
        createPage(200, template);
      });*/
      db.query(`SELECT * FROM comments`, (error, comments) => {
        console.log(comments);
        createPage(200, `Sucess`);
      });
    } else {
      fs.readdir(`./data`, (err, fileList) => {
        fileList = sort.sortString(fileList);
        console.log(fileList);
        let data = initialize.createInitData(fileList);

        let filteredTitle = path.parse(queryData.id).base;
        fs.readFile(`./data/${filteredTitle}`, `utf8`, (err, description) => {
          title = title.split(`_`);
          title = title[1];
          let fileName = queryData.id;
          template = initialize.createTemplate(data, title, description, fileName, `list`);
          createPage(200, template);
        });
      });
    }
  } else if (pathName === `/crud`) {
    fs.readdir(`./data`, (err, fileList) => {
      fileList = sort.sortString(fileList);
      let data = initialize.createInitData(fileList);
      template = initialize.createTemplate(data, ``, ``, ``, `crud`);
      createPage(200, template);
    });
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
    fs.readdir(`./data`, (err, fileList) => {
      fileList = sort.sortString(fileList);
      let data = initialize.createInitData(fileList);
      template = initialize.createTemplate(data, ``, ``, ``, `crud`);
      let filteredTitle = path.parse(queryData.id).base;
      fs.readFile(`./data/${filteredTitle}`, `utf8`, (err, description) => {
        title = title.split(`_`);
        title = title[1];
        let fileName = queryData.id;
        let sanitizedTitle = sanitize(title);
        let sanitizedDescription = sanitize(description, { allowedTags: ["h1"] });
        let sanitizedFileName = sanitize(fileName);
        template = initialize.createTemplate(
          data,
          sanitizedTitle,
          sanitizedDescription,
          sanitizedFileName,
          `update`
        );
        createPage(200, template);
      });
    });
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
