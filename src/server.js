import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
// CommonJS => require
// const http = requiere("http")

// ESModules => import / export, para que possamos usar isso precicamos incluir no package.json ["type": "module"]

// Cabeçalhos (Req/Res) => Metadados

const database = new Database();
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {

    const user = {
      id: "1",
      name: "John Doe",
      email: "johndoe@teste.com",
    };

    database.insert("users", user);

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
