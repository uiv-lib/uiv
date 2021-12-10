export function request(url, method = 'GET') {
  return fetch(url, { method }).then((res) => res.json());
}
