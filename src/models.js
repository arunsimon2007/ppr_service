import mongoose from "mongoose";

const Schema = mongoose.Schema;

/* Category */

const CategorySchema = new Schema({
  id: String,
  category_name: String
});

const CategoryModel = mongoose.model("categories", CategorySchema);

const PaintingSchema = new Schema({
  id: String,
  name: String,
  created: String
});

const PaintingModel = mongoose.model("paintings", PaintingSchema);

export { CategoryModel, PaintingModel };
