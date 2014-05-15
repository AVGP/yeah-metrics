
/*
 * GET users listing.
 */

exports.dashboard = function(config) {
  return function(req, res){
    if(req.user === undefined && config.PASSPORT_STRATEGY !== 'none') {
      res.redirect('/auth/' + config.PASSPORT_STRATEGY);
      return;
    }
    res.render('dashboard', { title: 'Dashboard', user: req.user, config: JSON.stringify(config.KEENIO) });
  };
};