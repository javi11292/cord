function passport(req, res, next) {
  if (req.session.logged) next()
  else res.sendStatus(401)
}

module.exports = passport