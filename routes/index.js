
/*
 * GET home page.
 */

exports.index = function(req, res){
    if(req.user) {
        res.redirect("/dashboard");
        return;
    }
  res.render('index', { title: 'Yeah, Metrics!', user: req.user });
};