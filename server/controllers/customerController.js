const { Accomodation, Type, User, Bookmark, Customer } = require("../models");
const { Op } = require("sequelize");
const { compare } = require("../helpers/hashing");
const { generateToken } = require("../helpers/jwt");
const axios = require("axios");

class CustController {
  static async register(req, res, next) {
    let { email, password } = req.body;
    try {
      let newCustomer = await Customer.create({ email, password });
      res.status(201).json({
        message: `Customer with email ${email} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "Bad Request" };
      }
      if (!password) {
        throw { name: "Bad Request" };
      }

      let customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        throw { name: "Unauthorized" };
      }

      let comparePw = compare(password, customer.password);

      if (!comparePw) {
        throw { name: "Unauthorized" };
      }

      let payload = { id: customer.id };
      let access_token = generateToken(payload);
      let role = customer.role;
      res.status(200).json({ access_token, email, role });
    } catch (error) {
      next(error);
    }
  }

  static async googleLoginCustomer(req, res, next) {
    try {
      let google_token = req.headers.access_token_google;
      // console.log(google_token);
      const client = new OAuth2Client(
        "835334906881-55ep79gfsoi0r6us3j2bcmf37ivqju9a.apps.googleusercontent.com"
      );
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience:
          "835334906881-55ep79gfsoi0r6us3j2bcmf37ivqju9a.apps.googleusercontent.com",
      });
      // console.log(client,ticket, '<<<<<<');
      const payload = ticket.getPayload();

      let { email, name } = payload;
      let role = "customer";

      let [newCustomer, created] = await Customer.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: "default",
          role,
        },
        hooks: false,
      });
      let access_token = generateToken({ id: newCustomer.id });
      res.status(created ? 201 : 200).json({
        access_token,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAccomCust(req, res, next) {
    let { filter, sort, page } = req.query;
    try {
      let query = {};
      let limit;
      let offset;
      let querySort;

      if (filter) {
        let queryPage = filter.category.split(",").map((ele) => {
          [Op.eq] = ele;
        });

        query.where = {
          typeId: { [Op.or]: queryPage },
        };
      }

      if (sort) {
        let sortValue = sort.split("-")[0];
        if (sort.endsWith("asc")) {
          querySort = [[sortValue, "ASC"]];
        } else {
          querySort = [[sortValue, "DESC"]];
        }
      }

      if (page) {
        if (page.size) {
          limit = page.size;
        }
        if (page.number) {
          offset = page.number * limit - limit;
        }
      } else {
        limit;
        offset = 0;
      }

      query.order = querySort;
      query.limit = limit;
      query.offset = offset;

      let accomodation = await Accomodation.findAll(query);
      res.status(200).json(accomodation);
    } catch (error) {
      next(error);
    }
  }

  static async getAccomDetail(req, res, next) {
    let { id } = req.params;
    try {
      let detail = await Accomodation.findOne({ where: { id } });
      if (!detail) {
        throw { name: "Not Found" };
      }
      let { data } = await axios({
        url: "https://api.qr-code-generator.com/v1/create?access-token=jNZLsIQEKRZa_WefJkcq1HN7OuNGz3WUFLj6Xqa9jLpjeLgzCbH1TkrwxAhwYxn9",
        method: "post",
        data: {
          frame_name: "no-frame",
          qr_code_text: "http://localhost:3001",
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        }
      });
      detail.dataValues.qrCode = data;
      res.status(200).json(detail);
    } catch (error) {
      next(error);
    }
  }

  static async getBookmarks(req, res, next) {
    let { id } = req.customer;
    try {
      let bookmarks = await Bookmark.findAll({
        where: { CustomerId:id },
        include: [{ model: Accomodation, include: [{ model: Type }] }],
      });
      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  }

  static async postBookmark(req, res, next) {
    let { id } = req.params;
    let customerId = req.customer.id;
    try {
      let toAdd = await Accomodation.findOne({ where: { id } });
      if (!toAdd) {
        throw { name: "Not Found" };
      }
      let bookmarkCheck = await Bookmark.findOne({
        where: { CustomerId: customerId, AccomodationId: id },
      });
      if (bookmarkCheck) {
        throw { name: "Duplicate" };
      }
      let newBookmark = await Bookmark.create({
        CustomerId: customerId,
        AccomodationId: id,
      });
      res.status(201).json(newBookmark);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustController;
