exports.get = function(req, res, next) {
    res.render('frontpage', { title: 'Express' });
};