import express from "express";
import bodyParser from "body-parser";
import data from "../../ppr-service/mock_data.json";

const app = express();
const version = "v1.0.0";
const BASE_URL = `/api/ppr/${version}`;
const PORT_NUMBER = process.env.PORT || 8002;

/* Middlewares */

app.use(bodyParser.json());
app.use(express.static("public"));

/* Basic routes */

app.get(`${BASE_URL}/`, (req, res) => {
  throw new Error();
  res.send("welcome to home..!!");
});

app.get(`${BASE_URL}/categories/`, (req, res) => {
  res.send(data["categories"]);
});

app.get(`${BASE_URL}/categories/:id`, (req, res) => {
  const categoryId = Number(req.params.id);
  const category = data["categories"][categoryId];
  res.send(category);
});

app.get(`${BASE_URL}/paintings/`, (req, res) => {
  res.send(data["paintings"]);
});

app.get(`${BASE_URL}/painting/:id`, (req, res) => {
  const paintingId = Number(req.params.id);
  const painting = data["paintings"][paintingId];
  res.send(painting);
});

app.post(`${BASE_URL}/painting/add/comment`, (req, res) => res.end());

/* error handling */

app.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(500).send(`Something went wrong!!`);
});

app.listen(PORT_NUMBER, () =>
  console.log(`server is running at port number ${PORT_NUMBER}`)
);
