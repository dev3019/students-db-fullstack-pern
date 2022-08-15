CREATE DATABASE students;

CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    age INTEGER,
    dob DATE
);