function bit() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let check3 = i * 4 * j;
      let check2 = 0x8000 >> (i * 4 * j);
      let check = 0x1111 & (0x8000 >> (i * 4 * j));
      console.log(check3);
      console.log(check2.toString(2));
      console.log(check.toString(2));
    }
  }
}

bit();
