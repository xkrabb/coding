const fn = (x) => 10 * Math.sin(x / 10);
const COUNT = 100;

const getData = (start, end) => {
  const step = Math.max((end - start) / COUNT, 0.001);
  const res = [];
  let x = start;
  do {
    res.push({ ts: x, value: fn(x) })
    x += step
  } while (x < end)
  return res;
}


