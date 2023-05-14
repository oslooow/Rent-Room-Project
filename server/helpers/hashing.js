const bcrypt = require('bcryptjs');

const hashedPw = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashed =  bcrypt.hash(password,salt)
  return hashed
}

const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password,hashedPassword)
}
module.exports = {hashedPw,compare}