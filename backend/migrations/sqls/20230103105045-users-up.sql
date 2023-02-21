/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id INTEGER NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    floor_number INTEGER NOT NULL,
    desk_number INTEGER NOT NULL,
    department VARCHAR(50) NOT NULL
);