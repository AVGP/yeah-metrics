
/*
 * GET users listing.
 */

exports.list = function(config) {
  return function(req, res){
    if(req.user === undefined) {
      res.redirect("/auth/google");
      return;
    }
    res.render('dashboard', { title: 'Dashboard', user: req.user, config: JSON.stringify(config) });
  };
};