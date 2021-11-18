
const requestParse = require('./request-parse');
const routes = {
  GET: {},
  POST:{}
}

const router = module.exports = {};

router.get = (pathname, callback)=> {
  routes.GET[pathname] = callback;
};

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};


router.route = (req, res) => {
  requestParse(req, (error) => {
    if (error){
      res.writeHead(400);
      res.end()
      return;
    }
    let routeHandler = routes[req.method][req.url.pathname];  
    if (routeHandler) {
      routeHandler(req, res);
      res.end();
      return;
    }
  })
}