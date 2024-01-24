import { CustomMessages } from "../../config/customMessage";
import { RESPONSE_CODES } from "../../config/constants";
import { refreshToken } from "../helpers/jwt";
import { successResponse, errorResponse } from "../../config/responseHelper";
import bcrypt from "bcrypt";
import moment from "moment";
import Services from "./auth.services";
import { generateOTP } from "../helpers/common";
import { sendMail } from "../service/sendgrid";
import { otpVerification } from "../EmailTemplates/verification-code";
export default class Auth {
  async init(db) {
    this.services = new Services();
    this.Models = db.models;
    await this.services.init(db);
  }

  async login(req, res) {
    const { body } = req;
    try {
      /** check user email */
      const checkEmail = await this.services.getByEmail(body.email);
      if (!checkEmail) {
        return res.status(400).send(errorResponse(CustomMessages.INVALID_EMAIL, null, RESPONSE_CODES.BAD_REQUEST));
      }
      /** check user password */
      const checkPassword = await bcrypt.compare(body.password, checkEmail.password);
      if (!checkPassword) {
        return res.status(400).send(errorResponse(CustomMessages.INVALID_PASSWORD, null, RESPONSE_CODES.BAD_REQUEST));
      }
      /** create login time */
      const loginTime = moment(new Date()).unix();
      const createData = { user_id: checkEmail.id, login_time: loginTime };
      await this.services.createLoginTime(createData);
      const getUser = await this.services.getByEmail(checkEmail.email);
      /** generate token */
      const token = refreshToken(getUser.dataValues);
      return res.status(201).send(successResponse(CustomMessages.LOGIN, token, RESPONSE_CODES.POST));
    } catch (error) {
      console.log(error, "===============")
      return res.status(500).send(errorResponse(error.message, null, RESPONSE_CODES.SERVER_ERROR));
    }
  };

  async signup(req, res) {
    const { body } = req;
    try {
      /** check user email */
      const checkEmail = await this.services.getByEmail(body.email);
      if (checkEmail) {
        return res.status(400).send(errorResponse(CustomMessages.EMAIL_EXIST, null, RESPONSE_CODES.BAD_REQUEST));
      }
      /** check phone number */
      const checkPhone = await this.services.getByPhone(body.phone);
      if (checkPhone) {
        return res.status(400).send(errorResponse(CustomMessages.PHONE_EXIST, null, RESPONSE_CODES.BAD_REQUEST));
      }

      /** sent otp on mail */
      const otp = await generateOTP()
     
    const user = await this.services.createUser({...body, otp:otp});
    if(user){
      const to = user.email
      const subject =  "OTP Verification"
      const htmlContent = await otpVerification(otp)
      await sendMail(to,subject,htmlContent)
    }
      return res.status(201).send(successResponse(CustomMessages.SIGNUP_SCCESS, {}, RESPONSE_CODES.POST));
    } catch (error) {
      console.log(error, "===============")
      return res.status(500).send(errorResponse(error.message, null, RESPONSE_CODES.SERVER_ERROR));
    }
  };

//   async verifyOTP(req,res) {
//     const {body} = req;
//     try{
// const user = await this.services.getByEmail(body.email);
//     }catch(error){
//       console.log(error, "===============")
//       return res.status(500).send(errorResponse(error.message, null, RESPONSE_CODES.SERVER_ERROR));
//     }
//   }  
}