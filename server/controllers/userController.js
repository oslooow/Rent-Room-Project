const { OAuth2Client } = require('google-auth-library');
const { compare } = require('../helpers/hashing');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');

class userController {
  static async register(req, res, next) {
    let { username, email, password, phoneNumber, address } = req.body
    try {
      let newUser = await User.create({ username, email, password, phoneNumber, address })
      res.status(201).json({
        message: `User with username ${username} has been created`
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body
    try {
      if (!email) {
        throw { name: 'Bad Request' }
      }
      if (!password) {
        throw { name: 'Bad Request' }
      }

      let user = await User.findOne({ where: { email } })
      if (!user) {
        throw { name: 'Unauthorized', }
      }

      let comparePw = compare(password, user.password)
      if (!comparePw) {
        throw { name: 'Unauthorized', }
      }

      let payload = { id: user.id }
      let access_token = generateToken(payload)
      let role = user.role
      let username = user.username
      res.status(200).json({ access_token, email, role, username })
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let google_token = req.headers.access_token_google
      const client = new OAuth2Client('835334906881-55ep79gfsoi0r6us3j2bcmf37ivqju9a.apps.googleusercontent.com');
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: '835334906881-55ep79gfsoi0r6us3j2bcmf37ivqju9a.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();

      let { email, name, } = payload
      let role = "user"

      let [newUser, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: 'default',
          role
        },
        hooks: false
      })
      let access_token = generateToken({ id: newUser.id })
      res.status(created ? 201 : 200).json({
        access_token, email, role, username: name
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = userController