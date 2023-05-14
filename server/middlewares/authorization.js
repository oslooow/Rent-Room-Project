const { Accomodation, Type } = require("../models");

async function authorization(req, res, next) {
  let { id } = req.params;
  let { role } = req.user;
  let userId = req.user.id;
  try {
    // res.json(req.user)
    let accomodation = await Accomodation.findOne({ where: { id } });
    if (!accomodation) {
      throw { name: "Not Found" };
    }
    if (role !== "admin") {
      if (accomodation.authorId !== userId) {
        throw { name: "Forbidden" };
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function typeAuthorization(req, res, next) {
  let { id } = req.params;
  let { role } = req.user;
  let userId = req.user.id;
  try {
    // res.json(req.user)
    let type = await Type.findOne({ where: { id } });
    if (!type) {
      throw { name: "Not Found" };
    }
    if (role !== "admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authorization, typeAuthorization };
