/****  get user roles  ****/
export const getAccessRoles = async (db) => {
    const userAccess = {};
    const userRoles = await db.models.Roles.findAll({ raw: true });
    for (const ele of userRoles) {
      if (ele.name == "Admin") {
        userAccess.Admin = ele.id;
      }
      if (ele.name == "User") {
        userAccess.User = ele.id;
      }
    }
    return userAccess;
};


/****  generate otp ****/
export const generateOTP = async () => {
  return Math.floor(1000 + Math.random() * 9000);
};