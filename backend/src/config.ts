import dotenv from 'dotenv'
dotenv.config() 

const {
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
    REACT_APP_CAPTCHA_SECRET_KEY
}=process.env

export default {
    port: PORT,
    host:POSTGRES_HOST,
    dbport: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    token:TOKEN_SECRET,
    captcha_secret_key:REACT_APP_CAPTCHA_SECRET_KEY


}