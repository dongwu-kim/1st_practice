var fs = require(`fs`);

fs.readFile(`text.txt`, `utf-8`, (err, data) => {
  console.log(data);
});
