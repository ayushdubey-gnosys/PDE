const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./generateToken");

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = generateAccessToken(decoded.id);

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};
module.exports = refreshAccessToken;