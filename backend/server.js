require("dotenv").config();

require("./config/database").connect();
const User = require("./models/user");
// const auth = require("./middleware/auth");
const express = require("express");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/Login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(409).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/Register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // // Validate user input
    // if (!(email && password && first_name & last_name)) {
    //   res.status(400).send("All input is required");
    // }

    console.log("RESS", req.body);
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    console.log("oldUser oldUser", oldUser);

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    } else {
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(6969, () => {
  console.log("started");
});
