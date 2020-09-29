const pool = require('../utils/pool');

module.exports = class User {
userId;
email;
passwordHash;
profilePhotoURL;

constructor(row) {
  this.userId = row.user_id;
  this.email = row.email;
  this.passwordHash = row.password_hash;
  this.profilePhotoURL = row.profile_photo_url;
}

static async insert(user) {
  const { rows } = await pool.query(
    'INSERT INTO users (email, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING  *',
    [user.email, user.passwordHash, user.profilePhotoURL]
  );

  return new User(rows[0]);
}

};
