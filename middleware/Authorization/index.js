const jwt = require("jsonwebtoken");
const { JWT_SECRET_STRING } = process.env;
const Authorization = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.cookie.split("=")[1];
    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, JWT_SECRET_STRING);
    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    request.emailId = user.emailId;
    request._id = user._id;
    // pass down functionality to the endpoint
    next();
  } catch (error) {
    response.status(401).json({ ErrorMessage: "Please Login :) " });
  }
};

module.exports = { Authorization };
