export function pad(value, num) {
  let res = value.toString();
  for (let i = num - res.length; i > 0; i--) {
    res = '0' + res;
  }
  return res;
}
