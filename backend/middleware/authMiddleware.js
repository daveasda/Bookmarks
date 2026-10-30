import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    const token = req.cookies?.auth_token;

    if (!token) {
        return res.status(401).json({
            message:"Please log in first."
        });
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.accountId = payload.accountId;
        next();
    } catch {
        return res.status(401).json({
            message: "Your session has expired. Please login again."
        });
    }
};


export const optionalAuth = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    req.accountId = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.accountId = payload.accountId;
    next();
  } catch {
    return res.status(401).json({
      message: "Your session has expired. Please log in again or log out to continue as a guest.",
    });
  }
};
