"use strict";
const bcrypt = require("bcrypt");
async function hash(password) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: 1,
            role_id: 1,
            first_name: "Admin",
            last_name: "Jyoti",
            email: "jyoti845@yopmail.com",
            password: await hash("123456"),
            country_code: "+91",
            phone: "8872113845",
            image: null,
            otp: null,
            is_active: true,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { truncate: true }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
