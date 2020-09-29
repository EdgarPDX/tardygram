DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
  user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT NOT NULL
);

CREATE TABLE posts (
    post_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),
    photo_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    tags 
);

CREATE TABLE comments (
    comment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_by BIGINT REFERENCES users(user_id),
    post_id BIGINT REFERENCES posts(post_id),
    comment TEXT NOT NULL 
);