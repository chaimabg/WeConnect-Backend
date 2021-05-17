var express = require("express");
var cors = require("cors");

var updateSpace = require("./routes/UpdateSpace");
var dotenv = require("dotenv");
var mongoose = require("mongoose");

var usersRouter = require("./routes/users");
var reservationsRouter = require("./routes/reservations");
var spacesRouter = require("./routes/spaces");
var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/user", usersRouter);
app.use("/spaces", spacesRouter);
app.use("/reservations", reservationsRouter);
app.use("/updateSpace", updateSpace);
app.use("/", require("./routes/auth"));

app.use("/uploads", express.static("uploads"));

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
