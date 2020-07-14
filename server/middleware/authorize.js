//Granting access to special roles
exports.authorize = (...role) => {
    return (req,res,next) => {
        if(!role.includes(req.user.role)) {
            res.status(403).json({
                error : "You are not allowed to access this resource"
            })
        }
        next();
    }
}