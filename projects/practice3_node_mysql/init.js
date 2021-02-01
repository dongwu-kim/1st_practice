const initialize = {
  createInitData: (dbTable) => {
    let title = ``,
      description = ``, // Textfile description
      list = `<ol>`;

    for (let i = 0; i < dbTable.length; i++) {
      // table[i] = string, id = array
      list = list + `<li><a href = "/?id=${dbTable[i].id}">${dbTable[i].user}</a></li>`;
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
  },

  createTemplate: (dataObj, inputTitle, inputDescription, id, page) => {
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
      control = `<a href = "/update?id=${id}">Update</a>
            <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${id}" />
            <input type="submit" value="delete" />
            </form>`;
    } else if (page === `crud`) {
      //using initTitle and initDesc
      title = dataObj.createPage.title;
      description = dataObj.createPage.description;
    } else if (page === `update`) {
      title = inputTitle;
      description = `<form action="/update_process" method="post">
            <input type="hidden" name="id" value="${id}"/>
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
  },
};

module.exports = initialize;
