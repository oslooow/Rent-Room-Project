const { verifyToken } = require("../helpers/jwt");
const { User, Customer } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Missing Token" };
    }

    let payload = verifyToken(access_token);
    let { id } = payload;

    let user = await User.findByPk(id);
    if (!user) {
      throw { name: "Invalid Token" };
    }
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function custAuthentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Missing Token" };
    }

    let payload = verifyToken(access_token);
    let { id } = payload;

    let customer = await Customer.findByPk(id);
    if (!customer) {
      throw { name: "Invalid Token" };
    }
    req.customer = {
      id: customer.id,
      email: customer.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication, custAuthentication };
