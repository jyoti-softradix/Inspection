import { RESPONSE_CODES, ROLES } from "../../config/constants";
import { CustomMessages } from "../../config/customMessage";
import { verifyToken } from "./jwt";

export default class Authorization {
  async init(db) {
    this.Models = db.models;
  }

  async authorize(roles = []) {
    return [
      async (req, res, next) => {
        /** Decode JWT Token */
        const decoded = verifyToken(req.headers.authorization);
        req.decoded = decoded;
        if (decoded === "jwt expired" || !req.headers.authorization) {
          console.log("1")
          return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
            status: 0,
            code: RESPONSE_CODES.UNAUTHORIZED,
            message: CustomMessages.UNAUTHORIZED_USER,
            data: null,
          });
        }
        /** Check user authorization */
        if(decoded == "invalid jwt"){
          console.log("2")
          return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
            status: 0,
            code: RESPONSE_CODES.UNAUTHORIZED,
            message: CustomMessages.UNAUTHORIZED_USER,
            data: null,
          });
        }
        if (decoded != "invalid signature") {
          console.log("3")
          /** check user exist or not */
          const user = await this.Models.Users.findOne({
            where: { email: decoded.email },
            raw: true,
          });
          const checkUserDevices = await this.Models.UserLoginTime.findOne({
            where: {
              login_time: decoded.login_time,
            },
            raw: true,
          });
          if (!user || !checkUserDevices) {
          // if (!user) {
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
              status: 0,
              code: RESPONSE_CODES.UNAUTHORIZED,
              message: CustomMessages.UNAUTHORIZED_USER,
              data: null,
            });
          }
        
        /** Check user authorization */
        if (roles.includes(decoded.role_id)) {
          /** check user exist or not */
          const user = await this.Models.Users.findOne({ where: { email: decoded.email, role_id: decoded.role_id }, raw: true });
          if (!user) {
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
              status: 0,
              code: RESPONSE_CODES.UNAUTHORIZED,
              message: CustomMessages.UNAUTHORIZED_USER,
              data: null,
            });
          }
          req.user = user;
          /** return user */
         return next();
          } else {
          return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
            status: 0,
            code: RESPONSE_CODES.UNAUTHORIZED,
            message: CustomMessages.UNAUTHORIZED_USER,
            data: null,
          });
        }
        }
      },
    ];
  }
}
