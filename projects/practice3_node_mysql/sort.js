const sort = {
  sortString: (array) => {
    array.sort((a, b) => {
      let c = parseInt(a, 10);
      let d = parseInt(b, 10);

      return c < d ? -1 : c == d ? 0 : 1;
    });
    return array;
  },
};

module.exports = sort;
