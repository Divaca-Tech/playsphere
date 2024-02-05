const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./controllers/middleware/errorhandler");
const { companyLogoUrl } = require("./utils/helpers");
const ejs = require("ejs");
dotenv.config();
const DB = require("./models");
const fse = require("fs-extra");
const router = require("./routes/routes");
// const userRouters = require("./routes/user.auth.route")
// const routers = require("./routes/user.auth.route");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// app.get("/getmail", (req, res, next) => {
//   const template = fse.readFileSync(
//     path.join(__dirname, "./views/otp-mail.ejs"),
//     "utf-8"
//   );

//   const html = ejs.render(template, {
//     logoUrl: companyLogoUrl,
//     title: "hello chile",
//     token: "56474",
//     message: "confirm your email",
//   });
//   console.log(html);

//   res.send(html);
// });

// this is where the router will come in
app.use("/api/v1", router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening on port 3000");
});
