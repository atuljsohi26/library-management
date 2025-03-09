
import jwt from 'jsonwebtoken';
export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      console.log("key",process.env.JWT_PUBLIC_KEY);
      
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_PUBLIC_KEY); // Remove 'Bearer ' if included in the header

      // Attach the decoded payload to the request object for further use
      req.user = decoded;

      next();
  } catch (err) {
      // Handle invalid or expired tokens
      return res.status(403).json({ message: 'Forbidden' });
  }
  
    // Simulate token validation (extend for JWT or custom logic)
    // if (token !== 'valid-token') {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }
  
    // next();
  };
  