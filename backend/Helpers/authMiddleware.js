/** @format */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.USER_SECRET, (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err);
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        console.log("Decoded JWT:", decoded);
        req.userId = decoded.id;
        req.userType = decoded.role; 
        console.log(`User ID: ${req.userId}, User Type: ${req.userType}`);
        next();
      }
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).send({
      success: false,
      message: "ERROR in API",
      error,
    });
  }
};

// admin authentication

export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ADMIN_SECRET, (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err);
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        console.log("Decoded JWT:", decoded);
        req.userId = decoded.id;
        req.userType = decoded.role; 
        console.log(`User ID: ${req.userId}, User Type: ${req.userType}`);

        next();
      }
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).send({
      success: false,
      message: "ERROR in API",
      error,
    });
  }
};
