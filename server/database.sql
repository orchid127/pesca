CREATE DATABASE pesca;
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    session_date TIMESTAMP,
    session_length TIME
);
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(30),
    password VARCHAR(20)
);