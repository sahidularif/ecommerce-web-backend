const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require('dotenv').config();
const authHandler = {};

authHandler.defaultRoot = (req, res, next) => {
  res.json({ message: "welcome to auth route" });
};

authHandler.register = async (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });


      // save the new user
      newUser
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            data: newUser,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
      console.log(e);
    });
};


// User Login & Jwt token
authHandler.login = (req, res, next) => {
  User.findOne({ email: req.body.email })

    .then((data) => {
      // compare the password entered and the hashed password found

      console.log("bcrypt email", data.email);
      bcrypt
        .compare(req.body.password, data.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              data: null,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              user: {
                id: data._id,
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin,
              },
            },
            `${process.env.JWT_SECRET}`,
            { expiresIn: "1h" }
          );

          //   return success response
          res.status(200).send({
            message: "Login Successful",
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
      console.log(e);
    });
};

authHandler.verifyToken = (req, res, next) => {
  const token = req.body.jwt;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid auth token...");
    res.status(200).json({ decoded });
  })
}
module.exports = authHandler;
