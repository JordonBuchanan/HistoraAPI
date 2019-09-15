require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI,
    masterDb: process.env.MASTER_DB,
    serverPort: process.env.SERVER_PORT,
    serverDb: process.env.SERVER_DB,
    JWTSecret: process.env.JWT_SECRET,
    TWITTER_CONFIG: process.env.TWITTER_CONFIG,
    GOOGLE_CONFIG: process.env.GOOGLE_CONFIG,
    HOST_EMAIL: process.env.HOST_EMAIL,
    HISTORA_EMAIL: process.env.HISTORA_EMAIL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN
}