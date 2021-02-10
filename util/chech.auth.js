const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const AnthenticationError = require("apollo-server");
module.exports = (context) => {
  //context = {... headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AnthenticationError("Invalid/Expired token");
      }
    }
    //Error if we did not have a token
    throw new AnthenticationError(
      "Anthentication token must be 'Bearer [token"
    );
  }
  //Error if we did not get auth header
  throw new AnthenticationError("Autharaization header must be provider");
};
