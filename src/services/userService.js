import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExisted = await checkUserEmail(email);
      let userData = {};

      if (isExisted) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });

        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.passWord);

          if (checkPassword) {
            userData.errorCode = 0;
            userData.message = "OK";
            delete user["passWord"];
            delete user["phoneNumber"];
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.message = "Wrong password";
          }
        } else {
          userData.errorCode = 2;
          userData.message = "Can't found user!";
        }
      } else {
        userData.errorCode = 1;
        userData.message =
          "Your's email is not exist in your system. Please try other email!";
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });

      if (user) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

let getUsersAll = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["passWord"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["passWord"],
          },
        });
      }

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);

      if (check) {
        resolve({
          errorCode: 1,
          message: "Your email existed. Please use email another.",
        });
      } else {
        let passwordHashed = await handleUserPassword(data.password);
        await db.User.create({
          email: data.email,
          passWord: passwordHashed,
          firstName: data.firstname,
          lastName: data.lastname,
          address: data.address,
          gender: data.gender,
          roleId: data.role,
          phoneNumber: data.numberphone,
          positionId: data.position,
          image: data.file,
        });
      }

      resolve({
        errorCode: 0,
        message: "Create new user successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });

      if (!user) {
        resolve({
          errCode: 1,
          message: "User isn't exist",
        });
      }

      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Missing required parameter",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },

        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 3,
          message: "User not found",
        });
      } else {
        (user.firstName = data.firstName), (user.lastName = data.lastName);
        (user.address = data.address), (user.phoneNumber = data.phoneNumber);

        await user.save();

        resolve({
          errCode: 0,
          message: "User is updated",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
  getUsersAll,
  createNewUser,
  deleteUser,
  editUser,
};
