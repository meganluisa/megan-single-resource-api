const url = require('url');
const querystring = require('query-string');
const formidable = require('formidable');


module.exports = (req, callback) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query)

  if (req.method === 'POST'){
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(err){
        req.body = {};
        req.text = '';
        callback(err);
      }
      req.text = fields;
      req.body = fields;
      callback(null);

    })
    // let text = '';
    // req.on('data', (data)=> {
    //   text += data.toString();
    // });
    // req.on('end', (error)=>{
    //   req.text = text;
    //   console.log('request text', req.text);
    //   console.log('path query: ', req.url.query);
    //   try {
    //     req.body = JSON.parse(text);
    //     console.log('request body',req.body);
    //     callback(null);
    //   } catch (error) {callback(error)}
    // });
    // req.on('error', (error) => {
    //   req.body = {};
    //   req.text = '';
    //   callback(error);
    // });
  } else {
  req.text = '';
  req.body = {};
  callback(null);
  }
}