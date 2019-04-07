import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  db : process.env.DATABASE,
  PORT : process.env.PORT
}