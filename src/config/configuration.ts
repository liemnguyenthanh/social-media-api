export default () => ({
  port: process.env.PORT,
  urlDB: process.env.MONGODB_URI,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
});
