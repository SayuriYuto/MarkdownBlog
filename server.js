const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/articles");
const methodOverride = require('method-override')

mongoose.connect("mongodb://localhost/blog");
const app = express();
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find();
  res.render("articles/index", { articles: articles });
});

app.listen(5000);
