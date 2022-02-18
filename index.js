const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const questionRoute = require("./routes/question");
const respondentRoute = require("./routes/respondent");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("POLLS DB Connection Successful"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/respondents", respondentRoute);

// DEPLOYMENT
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
