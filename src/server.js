import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { CategoryModel, PaintingModel } from "./models";

const app = express();
mongoose
  .connect("mongodb://localhost/PPR", { useNewUrlParser: true })
  .then(() => console.log("DB is connected successfully..!!"))
  .catch(error => console.log(`DB connection attempt failed:${error}`));

const version = "v1.0.0";
const BASE_URL = `/api/ppr/${version}`;
const PORT_NUMBER = process.env.PORT || 8000;

/* Middlewares */

app.use(bodyParser.json());
app.use(express.static("public"));

/* Basic routes */

app.get(`${BASE_URL}/`, (req, res) => {
  res.send("PPR services..!");
});

app.get(`${BASE_URL}/categories/`, (req, res) => {
  const query = CategoryModel.find();
  const promise = query.exec();
  promise
    .then(categoryDocs => res.send(categoryDocs))
    .catch(error => console.log(`Categories fetching failed ${error}`));
});

app.get(`${BASE_URL}/category/:id`, (req, res) => {
  const categoryId = Number(req.params.id);
  const query = CategoryModel.findOne({ id: categoryId });
  const promise = query.exec();
  promise
    .then(category => res.send(category))
    .catch(error => console.log(`Category fetching failed ${error}`));
});

app.get(`${BASE_URL}/paintings/`, (req, res) => {
  const query = PaintingModel.find();
  const promise = query.exec();
  promise
    .then(paintingDocs => res.send(paintingDocs))
    .catch(error => console.log(`Paintings fetching failed ${error}`));
});

app.get(`${BASE_URL}/painting/:id`, (req, res) => {
  const paintingId = Number(req.params.id);
  const query = PaintingModel.findOne({ id: paintingId });
  const promise = query.exec();
  promise
    .then(painting => res.send(painting))
    .catch(error => console.log(`Painting fetching failed ${error}`));
});

app.post(`${BASE_URL}/painting/add/comment`, (req, res) => res.end());

/* error handling */

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(`Something went wrong!!`);
});

app.listen(PORT_NUMBER, () =>
  console.log(`server is running at port number ${PORT_NUMBER}.`)
);
