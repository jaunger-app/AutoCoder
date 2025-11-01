const http = require('http);
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Backend Service
');
});
server.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
