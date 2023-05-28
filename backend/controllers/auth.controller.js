const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require(path.join(process.cwd(), "models/user.model.js"));
// validations for http requests
const loginValidate = require(path.join(
  process.cwd(),
  "validations/auth.validation.js"
));

const registrationValidate = require(path.join(
  process.cwd(),
  "validations/registration.validation.js"
));

class AuthController {
  static async login(req, res, next) {
    try {
      const { error, value } = loginValidate(req.body);

      if (error) {
        return res.status(400).json({
          error: error.details.at(0).message,
        });
      }

      // Check if user exists and password is correct
      const user = await User.find({ email: value.email });
      
      if (!user) {
        return res
          .status(400)
          .send({ error: "User not exists on our records." });
      }
      if (!bcrypt.compareSync(value.password, user.password)) {
        return res
          .status(400)
          .send({ error: "The provided password is incorrect." });
      }

      //   // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // Expires in 24 hours
      });

      //   // Send token to client
      res.status(200).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  // User registration function
  static async registration(req, res, next) {
    try {
      const { error, value } = registrationValidate(req.body);

      if (error) {
        return res.status(400).json({
          error: error.details.at(0).message,
        });
      }

      // Generate a salt for bcrypt
      const salt = await bcrypt.genSalt(10);

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(value.password, salt);
      value.password = hashedPassword;

      // Create a new user
      const user = await User.create(value);

      res.status(200).send({
        user: {
          ...user,
        },
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
