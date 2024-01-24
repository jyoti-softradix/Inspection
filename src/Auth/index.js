import authController from "./auth.controller"
import schemaValidator from "../helpers/schemaValidator"
import { loginValidator, signupValidator } from "./auth.validator"
import Authorization from "../helpers/authorization";
import { getAccessRoles } from '../helpers/common';


export default class Auth {
    constructor(router, db) {
        this.authorization = new Authorization();
        this.router = router;
        this.db = db;
        this.authInstance = new authController();
    }
    async routes() {
        await this.authInstance.init(this.db);
        await this.authorization.init(this.db);
        let userAccess = await getAccessRoles(this.db);


        /** user login */
        this.router.post('/auth/login', schemaValidator(loginValidator), (req, res) => {
            this.authInstance.login(req, res)
        });

         /** user signup */
         this.router.post('/auth/signup',(req, res) => {this.authInstance.signup(req, res)
        });

         /** otp verify */
         this.router.post('/auth/verify-otp',(req, res) => {this.authInstance.verifyOTP(req, res)
         });
    }
}