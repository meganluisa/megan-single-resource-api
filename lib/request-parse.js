const url = require('url');
const querystring = require('query-string');

module.exports = (req, callback) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query)

  req.text = '';
  req.body = {};
  callback(null);
}