CREATE DATABASE pesca;
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    session_date TIMESTAMP,
    session_length TIME
);