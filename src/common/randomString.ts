export const createRandomString = (len) => {
  let randomIndexs = [];
  randomIndexs.length = len;
  randomIndexs.fill(0);
  randomIndexs = randomIndexs.map(() => ((26*Math.random()^0)+97));
  return String.fromCharCode(...randomIndexs);
}