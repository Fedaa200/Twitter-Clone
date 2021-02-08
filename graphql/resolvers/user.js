const User = require("../../database/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
module.exports = {
  Mutation: {
    //regesterInput = args
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //Validate user data
      //Make sure user doesnt already exist
      //hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      // create new user by use form from User(module)
      //The data for the user
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      //toISOString : to convert the date for the string
      //to save the new user for the database
      const res = await newUser.save();
      //create token for every user
      const token = jwt.sign(
        {
          //the data we need in the token
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      //spred the data over the user
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
