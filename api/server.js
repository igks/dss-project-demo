const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;

const server = http.createServer(app);
server.listen(PORT, HOST, () =>
  console.log(`Server running at ${HOST}:${PORT}`)
);
