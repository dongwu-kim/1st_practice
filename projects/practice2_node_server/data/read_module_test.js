var fs = require(`fs`);

fs.readFile(`text.txt`, `utf8`, (err, data) => {
  console.log(data);
});
