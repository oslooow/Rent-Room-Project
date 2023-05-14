const { Accomodation, Type, User, History } = require("../models");

class Controller {
  //all read below
  static async readAccomodationById(req, res, next) {
    let { id } = req.params;
    // console.log(req.params);
    try {
      let listAccomodations = await Accomodation.findOne({
        where: { id },
      });
      if (!listAccomodations) {
        throw { name: "Not Found" };
      }
      res.status(200).json(listAccomodations);
    } catch (error) {
      next(error);
    }
  }

  static async readAccomodation(req, res, next) {
    try {
      let listAccomodations = await Accomodation.findAll();
      res.status(200).json(listAccomodations);
    } catch (error) {
      next(error);
    }
  }

  static async readTypes(req, res, next) {
    try {
      let listType = await Type.findAll();
      res.status(200).json(listType);
    } catch (error) {
      next(error);
    }
  }

  static async readAccomodationDetail(req, res, next) {
    try {
      let listAccomodations = await Accomodation.findAll({
        include: [{ model: User, attributes: ["username"] }, { model: Type }],
      });
      res.status(200).json(listAccomodations);
    } catch (error) {
      next(error);
    }
  }

  static async readUsers(req, res, next) {
    try {
      let listUsers = await User.findAll({
        include: [{ model: Accomodation, include: [{ model: Type }] }],
      });
      res.status(200).json(listUsers);
    } catch (error) {
      next(error);
    }
  }

  static async history(req, res, next) {
    try {
      let log = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(log);
    } catch (error) {
      next(error);
    }
  }

  //post all below
  static async postAccomodation(req, res, next) {
    let { name, facility, roomCapacity, imgUrl, location, price, typeId } =
      req.body;
    let authorId = req.user.id;

    try {
      let toPost = await Accomodation.create({
        name,
        facility,
        roomCapacity,
        imgUrl,
        authorId,
        location,
        price,
        typeId,
      });
      let logName = "POST";
      let description = `New entity ${toPost.id} has been created`;
      let updatedBy = req.user.username;
      let log = await History.create({ name: logName, description, updatedBy });
      res.status(201).json(toPost);
    } catch (error) {
      console.log(error.errors[0].message);
      next(error);
    }
  }

  static async postTypes(req, res, next) {
    let { name } = req.body;
    try {
      let toPost = await Type.create({ name });
      res.status(201).json(toPost);
    } catch (error) {
      console.log(error.errors[0].message);
      next(error);
    }
  }

  //delete all below
  static async deleteAccomodation(req, res, next) {
    let { id } = req.params;
    try {
      let toDelete = await Accomodation.findOne({ where: { id } });
      if (!toDelete) {
        throw { name: "Not Found" };
      }
      let toDestroy = await Accomodation.destroy({
        where: { id },
      });
      res.status(200).json({ message: `${toDelete.name} has been removed` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTypes(req, res, next) {
    let { id } = req.params;
    try {
      let toDelete = await Type.findOne({ where: { id } });
      if (!toDelete) {
        throw { name: "Not Found" };
      }
      let toDestroy = await Type.destroy({
        where: { id },
      });
      res.status(200).json({ message: `${toDelete.name} has been removed` });
    } catch (error) {
      next(error);
    }
  }

  //Put Below

  static async putAccomodation(req, res, next) {
    let { id } = req.params;
    let { name, facility, roomCapacity, imgUrl, location, price, typeId } =
      req.body;

    let toUpdate = {
      name,
      facility,
      roomCapacity,
      imgUrl,
      location,
      price,
      typeId,
    };
    // console.log(toUpdate.name + '<<<<');
    try {
      let accomodation = await Accomodation.findOne({
        where: { id },
      });
      if (!accomodation) {
        throw { name: "Not Found" };
      }
      let put = await Accomodation.update(toUpdate, { where: { id } });

      let name = "PUT";
      let description = `Entity status with ${id} has been updated`;
      let updatedBy = req.user.username;
      let log = await History.create({ name, description, updatedBy });
      res.status(201).json(accomodation);
    } catch (error) {
      next(error);
    }
  }

  static async patchStatus(req, res, next) {
    let { id } = req.params;
    let { status } = req.body;
    console.log(req.params);
    try {
      let accomodation = await Accomodation.findOne({
        where: { id },
      });

      if (!accomodation) {
        throw { name: "Not Found" };
      }
      let statusBefore = accomodation.status;
      let update = await Accomodation.update({ status }, { where: { id } });
      console.log(update);
      let name = "PATCH";
      let description = `Entity status with ${id} has been updated from '${statusBefore}' to '${status}'`;
      let updatedBy = req.user.username;
      let log = await History.create({ name, description, updatedBy });
      res.status(201).json(update);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
