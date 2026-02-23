const authUserMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'No token Please Loged in First' });
  try {
    req.user = jwt.verify(token, JSON_SECRET_KEY); 
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token Please Logged in First' });
  }
};

export default authUserMiddleware;