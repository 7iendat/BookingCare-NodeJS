import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 0,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errorCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

let handleGetUsers = async (req, res) => {
  let id = req.query.id;

  let users = await userService.getUsersAll(id);

  if (!users) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters",
      usersList: [],
    });
  }

  return res.status(200).json({
    errCode: 0,
    message: "Successful",
    usersList: users,
  });
};

module.exports = {
  handleLogin,
  handleGetUsers,
};
