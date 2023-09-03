import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFormBscrypt = await handleUserPassword(data.password);

      await db.User.create({
        email: data.email,
        passWord: hashPasswordFormBscrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        gender: data.gender,
        roleId: data.role,
        phoneNumber: data.numberphone,
        positionId: data.position,
        image: data.file,
      });

      resolve("Create new User successfully!!!");
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

module.exports = { createNewUser };
