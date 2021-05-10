var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");

var dotenv = require("dotenv");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var spacesRouter = require("./routes/spaces");
var reviewsRouter = require("./routes/reviews");
var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/user", usersRouter);
app.use("/spaces", spacesRouter);
app.use("/", require("./routes/auth"));
app.use("/review",reviewsRouter);
app.use("/uploads", express.static("uploads"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Sever running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);

module.exports = app;
