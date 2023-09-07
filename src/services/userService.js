import db from "../models/index";
import bcrypt from "bcryptjs";

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

module.exports = { handleUserLogin };
