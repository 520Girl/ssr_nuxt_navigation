const generateSitemap = require('../static/sitemap');

// 更新sitemap， DOMAIN/api/update-sitemap ；http://192.168.31.47:9000/api/update-sitemap
module.exports = async (req, res,next)=>{
    try{

      if(req.method === 'GET' && req.url === '/web/update-sitemap') {

        const sitemap = await generateSitemap;
        res.statusCode = 200;
        res.end(JSON.stringify({
          status: 'ok',
          code: 200,
          message: 'Sitemap updated',
          data: {}
        }));
      }else{
        next();
      }
    }catch(err){

      res.statusCode = 500;
      res.end(JSON.stringify({
        status: 'error',
        code: 404,
        message: err.message
      }));
    }
}
