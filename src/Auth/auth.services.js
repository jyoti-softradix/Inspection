export default class Auth {
    async init(db) {
      this.Models = db.models;
      this.sql = db.sqlClient
    }


  /* find User by email  */
  getByEmail = async (email) => {
    return this.Models.Users.findOne({ where: { email: email } });
  };

  /* find User by phone_number  */
  getByPhone = async (phone) => {
    return this.Models.Users.findOne({ where: { phone: phone } });
  };

  /* create user  */
  createUser = async (data) => {
    return this.Models.Users.create(data);
  };

  /* create login time */
  createLoginTime = async (data) => {
      return this.Models.UserLoginTime.create(data);
  };
  

}