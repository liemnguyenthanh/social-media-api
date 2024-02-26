export default () => ({
  port: process.env.PORT,
  urlDB: process.env.MONGODB_URI,
  secretKey: process.env.SECRET_KEY,
});
