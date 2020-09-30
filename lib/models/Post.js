const pool = require('../utils/pool');

module.exports = class Post {
PostId;
userId;
photoURL;
caption;
tags;

constructor(row) {
  this.postId = row.post_id;
  this.userId = row.user_id;
  this.photoURL = row.photo_url;
  this.caption = row.caption;
  this.tags = row.tags;
}

static async insert(post)  {
  const { rows } = await pool.query(
    'INSERT INTO posts (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING  *',
    [post.userId, post.photoURL, post.caption, post.tags]
  );

  return new Post(rows[0]);
}

};