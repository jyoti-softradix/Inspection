import userController from "./user.controller"
// import schemaValidator from "../helpers/schemaValidator"
// import {  } from "./auth.validator"
import Authorization from "../helpers/authorization";
// import { getAccessRoles } from '../helpers/common';

export default class User {
    constructor(router, db) {
        this.authorization = new Authorization();
        this.router = router;
        this.db = db;
        this.authInstance = new authController();
    }
    async routes() {
        await this.authInstance.init(this.db);
        await this.authorization.init(this.db);
        // let userAccess = await getAccessRoles(this.db);
    }
}