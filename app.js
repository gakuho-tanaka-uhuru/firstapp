const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

const routers = require("./routes");
app.use(routers);

app.use((req, res, next) => {
  res.redirect(302, '/non-existent-page');
});

module.exports = app;