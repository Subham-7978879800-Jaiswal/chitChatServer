const {
  checkUserExistInDB,
  isPasswordMatching,
  createUserInDB,
  createJWTToken,
  getAllUserExceptCurrentUserDB,
} = require("../Model/user.model");

const httpLogin = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const { success, document: user } = await checkUserExistInDB(emailId,true);
    if (!success) {
      res
        .status(400)
        .send({ success: false, errorMessage: "User Does Not Exist" });
      return;
    }
    const isPasswordMatch = await isPasswordMatching(password, user.password);
    if (!isPasswordMatch) {
      res
        .status(400)
        .send({ success: false, errorMessage: "Incorrect Password" });
      return;
    }
    payload = { emailId: user.emailId };
    const token = await createJWTToken(payload);

    res.cookie(`jwt-token`, token, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).send({ success: true, token: token });
    return;
  } catch (err) {
    res.status(400).send({ success: false, errorMessage: err });
    return;
  }
};

const httpRegister = async (req, res) => {
  const { emailId, password, name } = req.body;

  try {
    const { success, document: user } = await checkUserExistInDB(emailId);

    if (success) {
      res
        .status(400)
        .send({ success: false, errorMessage: "User Already Exist" });
      return;
    }
    const { success: successFlag, errorMessage } = await createUserInDB(
      name,
      emailId,
      password
    );

    if (!successFlag) {
      res.status(400).send({ success: false, errorMessage: errorMessage });
      return;
    }

    res.status(201).send({ success: true, message: "User Created :) " });
    return;
  } catch (err) {
    res.status(400).send({ success: false, errorMessage: err });
    return;
  }
};

const httpGetUserFromEmailId = async (req, res) => {

  const { document: user, success,errorMessage } = await checkUserExistInDB(req.emailId,false);
  if (!success) {
    res.status(400).send({ success: false, errorMessage: errorMessage });
    return; 
  }
  res.status(200).send({ success: true, user: user });
  return;
};

const httpAllUserExceptCurrentUser = async (req,res) => {
    const {
      document: users,
      success,
      errorMessage,
    } = await getAllUserExceptCurrentUserDB(req.emailId);
  if (!success) {
    res.status(400).send({ success: false, errorMessage: errorMessage });
    return; 
  }
  res.status(200).send({ success: true, users: users });
  return;
};

module.exports = {
  httpLogin,
  httpRegister,
  httpGetUserFromEmailId,
  httpAllUserExceptCurrentUser,
};
