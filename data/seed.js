const UserService = require('../lib/services/user-service');

module.exports = async({ userCount = 5 } = {}) => {
  await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email:`test${i}@tester.com`,
      password: `password${i}`,
      profilePhotoURL: 'https://www.placecage.com/200/300'
    });
  }));
};

