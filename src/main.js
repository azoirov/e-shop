const express = require("express");
const CookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const { static } = require("express");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

const PORT = process.env.PORT;

// Middlewares -- Start
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());
// Middlewares -- End

// Settings -- Start
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`SERVER READY AT http://localhost:${PORT}`));
// Settings -- End

// Routes -- Start
const RoutesPath = path.join(__dirname, "routes");

fs.readdir(RoutesPath, (err, files) => {
  if (files) {
    files.forEach((file) => {
      const RoutePath = path.join(__dirname, "routes", file);
      const Route = require(RoutePath);
      if (Route.path && Route.router) app.use(Route.path, Route.router);
    });
  }
});
// Routes -- End
