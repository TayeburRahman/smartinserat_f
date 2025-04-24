// Get all user list Complete By Antareep

const Packages = require("./packages.model");

const queryPackages = async (filter, options) => {
    // const users = await User.paginate(filter, options);
    const users = await Packages.paginate(
      filter,
      {
        ...options,
      }
    );
  
    return users;
  };


const PackageService = {
    queryPackages
};

module.exports = { PackageService };
