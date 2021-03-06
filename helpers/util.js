// configure helpers
const helpers = {
    isLoggedIn: (req, res, next) => {
        if (req.session.users) {
            next();
        } else {
            res.redirect("/");
        }
    }
}

module.exports = helpers;