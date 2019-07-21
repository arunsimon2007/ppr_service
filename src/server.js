import express from "express";
import bodyParser from "body-parser";

const app = express();
const version = "v1.0.0";
const BASE_URL = `/api/ppr/${version}`;
const PORT_NUMBER = process.env.PORT || 8001;

app.use(bodyParser.json());

app.get(`${BASE_URL}/`, (req, res) => res.send("welcome to home..!!"));
app.get(`${BASE_URL}/painting/:id`, (req, res) =>
  res.send(`painting id is ${req.params.id}`)
);
app.post(`${BASE_URL}/painting/add/comment`, (req, res) =>
  res.send(`hello..${req.body.name}`)
);

app.listen(PORT_NUMBER, () =>
  console.log(`server is running at port number ${PORT_NUMBER}`)
);
