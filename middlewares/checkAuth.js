export const verifyUser = (req, res, next) => {
    if(req.user) {
        next()
    }else {
        req.setHeader("Content-Type", "application/json")
        res.status(401).json({
            status: "Unauthorized"
        })
    }
}