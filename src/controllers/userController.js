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

let handleCreateUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let message = await userService.editUser(req.body);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let message = await userService.deleteUser(req.body.id);

  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetUsers,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
};
