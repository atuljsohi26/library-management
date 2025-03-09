/** Buyer Login API Controller */
const login = async (req, res) => {
    console.log("** inside login controller **");
    console.log("req **", req.body);
    res.json({ message: 'Hello from Express!' });
    
  };

  module.exports = {
    login,
  };