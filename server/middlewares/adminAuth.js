export const adminAuth = (req, res, next) => {
    if (req.query.key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized: Invalid admin key" });
    }
    next();
  };
  