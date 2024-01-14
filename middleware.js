
const isLogined = (req, res, next) => {
    if (!req.isAuthenticated()) {
      // console.log(req.isAuthenticated())
      return res.status(400).json({ message: 'You must be logged in First.' })
    }
    // console.log(req.user)
    next();
    // If the user is authenticated, proceed to the next middleware or route handler
    
  };
  

module.exports = {isLogined}




