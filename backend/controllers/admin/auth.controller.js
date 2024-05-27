var { User } = require("../../models");
const authService = require("../../services/auth.service");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const bcrypt_p = require('bcrypt-promise');
const CONFIG = require("../../config/config.json");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
  const body = req.body;
  let checkUser = await User.findOne({
    where: {
      email: body.email
    }
  });

  if (!checkUser) return ReE(res, { message: "Please enter the registered email address." }, 400);

  const result = await bcrypt_p.compare(body.password, checkUser.password)
  if (!result) return ReE(res, { message: "Invalid password." }, 400);
  const token = jwt.sign({ id: checkUser.id, email: checkUser.email }, CONFIG.jwt_encryption, { expiresIn: '365d' });
  return ReS(res, { user: checkUser, token: token});
};
const Register = async function (req, res) {
  try {
    let body = req.body;
    await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
    }).then(function (result) {
        if (!result.id) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
        return ReS(res, { message: "User Register successfully." }, 200);
    }).catch(function (err) {
      console.log(err,'testserror')
        return ReE(res, { message: "Somthing Went Wrong", err: err }, 200);
    });

} catch (error) {
  console.log('testserrorcatch',error)
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
}
};
module.exports = {
  login,
  Register
};
