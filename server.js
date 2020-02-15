require("dotenv").config({ path: ".env" });
const { check, validationResult } = require("express-validator");
const request = require("request");
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");
const router = express.Router();
const User = require("./models/User");
const Profile = require("./models/Profile");
const Post = require("./models/Post");
const auth = require("./middleware/auth");

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY
});

//Connect Database

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html");
  });
}
router.get("/message", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    req.status(500).send("Server Error");
  }
});

app.post("/users", (req, res) => {
  const { userId } = req.body;

  chatkit
    .createUser({
      id: userId,
      name: userId
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === "services/chatkit/user_already_exists") {
        console.log(`User already exists: ${userId}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  res.status(authData.status).send(authData.body);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
